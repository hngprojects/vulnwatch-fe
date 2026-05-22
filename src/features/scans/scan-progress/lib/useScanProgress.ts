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
  
  // Steps status array for the progress items list: Checking DNS, Analyzing SSL, Scanning subdomains, etc.
  const [stepStatuses, setStepStatuses] = useState<("completed" | "current" | "pending")[]>([
    "current",
    "pending",
    "pending",
    "pending",
    "pending",
  ]);

  const hubConnectionRef = useRef<signalR.HubConnection | null>(null);

  // Helper to compute duration string like "1m 32s" or "45s"
  const calculateDuration = (startIso: string, endIso: string): string => {
    try {
      const start = new Date(startIso).getTime();
      const end = new Date(endIso).getTime();
      const diffMs = Math.max(0, end - start);
      const totalSeconds = Math.floor(diffMs / 1000);
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    } catch {
      return "0s";
    }
  };

  // Helper to compile scan result card stats from the API report
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

  // Force snap the UI to 100% complete
  const handleCompletedState = (report: ScanReport) => {
    setProgress(100);
    setStepStatuses(["completed", "completed", "completed", "completed", "completed"]);
    setScanResult(compileScanResult(report));
    setIsCompleted(true);
  };

  useEffect(() => {
    if (!scanId) return;

    let isMounted = true;
    let timerId: NodeJS.Timeout;

    // Check if the scan is already finished on the backend (e.g. page refresh)
    const checkCurrentStatus = async () => {
      try {
        const res = await scanService.getScanReport(scanId);
        if (isMounted && res.isSuccess && res.value && res.value.status === "Completed") {
          handleCompletedState(res.value);
          return true; // Already complete
        }
      } catch (err) {
        console.warn("Failed checking initial scan status, continuing with simulation...", err);
      }
      return false;
    };

    const startProgressSimulation = (alreadyFinished: boolean) => {
      if (alreadyFinished) return;

      const startTime = initiatedAtParam ? new Date(initiatedAtParam).getTime() : Date.now();

      timerId = setInterval(() => {
        if (!isMounted) return;

        const elapsed = Date.now() - startTime;
        const computedProgress = Math.min(95, Math.floor((elapsed / SCAN_DURATION_MS) * 100));
        
        setProgress((prev) => {
          // Keep advancing but don't go backwards
          return Math.max(prev, computedProgress);
        });

        // Determine step index based on progress value (5 steps: 0-19, 20-39, 40-59, 60-79, 80+)
        const currentStepIdx = Math.min(4, Math.floor(computedProgress / 20));
        
        setStepStatuses((prev) => {
          const next = [...prev];
          for (let i = 0; i < 5; i++) {
            if (i < currentStepIdx) {
              next[i] = "completed";
            } else if (i === currentStepIdx) {
              next[i] = "current";
            } else {
              next[i] = "pending";
            }
          }
          return next;
        });
      }, 500);
    };

    // Main initialization flow
    const init = async () => {
      const alreadyDone = await checkCurrentStatus();
      if (alreadyDone) return;

      startProgressSimulation(false);

      // Connect to SignalR channel for realtime scan completion events
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
          if (timerId) clearInterval(timerId);
          
          // Fetch final results from the report endpoint
          try {
            const reportRes = await scanService.getScanReport(scanId);
            if (isMounted && reportRes.isSuccess && reportRes.value) {
              handleCompletedState(reportRes.value);
            }
          } catch (err) {
            console.error("Error fetching completed scan report:", err);
            // Fallback complete state
            if (isMounted) {
              setProgress(100);
              setStepStatuses(["completed", "completed", "completed", "completed", "completed"]);
              setIsCompleted(true);
            }
          }
        }
      });

      try {
        await connection.start();
        await connection.invoke("JoinUserGroup", userId);
        console.log(`Connected to SignalR scan hub. Joined user group: ${userId}`);
      } catch (err) {
        console.error("SignalR connection failed:", err);
      }
    };

    init();

    return () => {
      isMounted = false;
      if (timerId) clearInterval(timerId);
      if (hubConnectionRef.current) {
        hubConnectionRef.current.stop().catch((e) => console.log("Error stopping connection:", e));
      }
    };
  }, [scanId, initiatedAtParam]);

  return {
    progress,
    stepStatuses,
    scanResult,
    isCompleted,
  };
}
