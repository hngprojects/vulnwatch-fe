import { useEffect, useState, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { getUserIdFromToken } from "@/lib/jwt";
import { scanService, ScanReport } from "../../services/scan.service";

const SCAN_DURATION_MS = 90_000; // Simulated duration of 90 seconds (95% cap)

export interface ScanResult {
  scanId: string;
  duration: string;
  passedCount: number;
  failedCount: number;
  securityScore: number;
}

export function useScanProgress(scanId?: string, initiatedAtParam?: string) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  
  // Steps status array for the progress items list
  const [stepStatuses, setStepStatuses] = useState<("completed" | "current" | "pending")[]>([
    "current",
    "pending",
    "pending",
    "pending",
    "pending",
  ]);

  const hubConnectionRef = useRef<signalR.HubConnection | null>(null);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const fastForwardingRef = useRef(false);
  const currentProgressRef = useRef(0);

  // Helper to compute duration string
  const calculateDuration = (startIso: string, endIso: string): string => {
    try {
      const start = new Date(startIso).getTime();
      const end = new Date(endIso).getTime();
      if (!Number.isFinite(start) || !Number.isFinite(end)) return "0s";
      const diffMs = Math.max(0, end - start);
      const totalSeconds = Math.floor(diffMs / 1000);
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    } catch {
      return "0s";
    }
  };

  // Helper to compile scan result card stats
  const compileScanResult = (report: ScanReport): ScanResult => {
    const scores = report.subScores;
    let passedCount = 0;
    
    if (scores.exposure?.status === "Pass") passedCount++;
    if (scores.ssl?.status === "Pass") passedCount++;
    if (scores.dns?.status === "Pass") passedCount++;
    
    const durationStr = report.completedAt && report.initiatedAt
      ? calculateDuration(report.initiatedAt, report.completedAt)
      : initiatedAtParam
        ? calculateDuration(initiatedAtParam, new Date().toISOString())
        : "1m 15s";

    return {
      scanId: report.scanId,
      duration: durationStr,
      passedCount,
      failedCount: 3 - passedCount,
      securityScore: report.securityScore,
    };
  };

  // Keep ref in sync with state for easy access in intervals
  useEffect(() => {
    currentProgressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    if (!scanId) return;

    let isMounted = true;

    const updateStepStatuses = (prog: number) => {
      const currentStepIdx = Math.min(4, Math.floor(prog / 20));
      setStepStatuses((prev) => {
        const next = [...prev];
        for (let i = 0; i < 5; i++) {
          if (i < currentStepIdx) next[i] = "completed";
          else if (i === currentStepIdx) next[i] = "current";
          else next[i] = "pending";
        }
        return next;
      });
    };

    // Trigger the 5-second fast forward sequence
    const triggerFastForward = (report: ScanReport) => {
      if (fastForwardingRef.current || !isMounted) return;
      fastForwardingRef.current = true;

      // Clear the standard simulation timer
      if (timerIdRef.current) clearInterval(timerIdRef.current);

      const FAST_FORWARD_DURATION_MS = 5000;
      const UPDATE_INTERVAL_MS = 100;
      const totalSteps = FAST_FORWARD_DURATION_MS / UPDATE_INTERVAL_MS;
      const startProgress = currentProgressRef.current;
      const increment = (100 - startProgress) / totalSteps;

      timerIdRef.current = setInterval(() => {
        if (!isMounted) return;

        setProgress((prev) => {
          const nextVal = prev + increment;
          if (nextVal >= 100) {
            if (timerIdRef.current) clearInterval(timerIdRef.current);
            setStepStatuses(["completed", "completed", "completed", "completed", "completed"]);
            setScanResult(compileScanResult(report));
            setIsCompleted(true);
            return 100;
          }
          updateStepStatuses(nextVal);
          return nextVal;
        });
      }, UPDATE_INTERVAL_MS);
    };

    const startProgressSimulation = () => {
      let startTime = initiatedAtParam ? new Date(initiatedAtParam).getTime() : Date.now();
      if (!Number.isFinite(startTime)) startTime = Date.now();

      timerIdRef.current = setInterval(() => {
        if (!isMounted || fastForwardingRef.current) return;

        const elapsed = Date.now() - startTime;
        let computedProgress = Math.min(95, Math.floor((elapsed / SCAN_DURATION_MS) * 100));
        if (!Number.isFinite(computedProgress) || computedProgress < 0) {
          computedProgress = 0;
        }
        
        setProgress((prev) => {
          const nextVal = Math.min(100, Math.max(prev, computedProgress));
          updateStepStatuses(nextVal);
          return nextVal;
        });
      }, 500);
    };

    // Main initialization flow
    const init = async () => {
      // 1. Start simulation immediately so UI feels responsive
      startProgressSimulation();

      // 2. Check if already completed on the backend
      try {
        const res = await scanService.getScanReport(scanId);
        if (isMounted && res.isSuccess && res.value && res.value.status === "Completed") {
          // If already complete, we still fast-forward from 0 to 100 over 5 seconds
          triggerFastForward(res.value);
          return;
        }
      } catch (err) {
        console.warn("Failed checking initial scan status, continuing with simulation...", err);
      }

      // 3. Connect to SignalR channel for realtime events
      const userId = getUserIdFromToken();
      if (!userId) {
        console.warn("Cannot subscribe to SignalR: User ID not found in token");
        return;
      }

      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const hubUrl = `${apiBaseUrl}/hubs/scans`;

      const connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl, {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect()
        .build();

      hubConnectionRef.current = connection;

      connection.on("ScanCompleted", async (event: { scanId: string }) => {
        if (event?.scanId === scanId) {
          try {
            const reportRes = await scanService.getScanReport(scanId);
            if (isMounted && reportRes.isSuccess && reportRes.value) {
              triggerFastForward(reportRes.value);
            }
          } catch (err) {
            console.error("Error fetching completed scan report:", err);
            // Fallback complete state with fast forward
            triggerFastForward({ scanId, status: "Completed", securityScore: 0, subScores: {} } as unknown as ScanReport);
          }
        }
      });

      try {
        await connection.start();
        await connection.invoke("JoinUserGroup", userId);
        console.log(`Connected to SignalR scan hub. Joined user group: ${userId}`);
      } catch (err) {
        console.error("SignalR connection failed, waiting for poll or timeout...", err);
      }
    };

    init();

    return () => {
      isMounted = false;
      if (timerIdRef.current) clearInterval(timerIdRef.current);
      if (hubConnectionRef.current) {
        hubConnectionRef.current.stop().catch((e) => console.log("Error stopping connection:", e));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanId, initiatedAtParam]);

  return {
    progress,
    stepStatuses,
    scanResult,
    isCompleted,
  };
}
