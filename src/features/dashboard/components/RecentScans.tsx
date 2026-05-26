import Link from "next/link";
import type { ScanHistoryItem } from "@/features/scans/services/scan.service";
import { ScanLine, Target, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type RiskLevel = "Low" | "Medium" | "High" | "Critical";

const RISK_DOTS: Record<RiskLevel, string> = {
  Critical: "bg-red-500",
  High: "bg-orange-400",
  Medium: "bg-amber-400",
  Low: "bg-green-500",
};

function getRiskDotClass(riskLevel: string | null): string {
  if (!riskLevel) return RISK_DOTS.Low;
  const key = riskLevel as RiskLevel;
  return RISK_DOTS[key] ?? RISK_DOTS.Low;
}

function formatScanType(coverage: string): string {
  if (coverage === "Quick" || coverage === "Full") {
    return `${coverage} Scan`;
  }
  return coverage;
}

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  const date = new Date(iso);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface RecentScansProps {
  scans: ScanHistoryItem[];
  domainName?: string;
}

export function RecentScans({ scans, domainName }: RecentScansProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Header — plain text above the table, no background */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Recent Scans</h3>
        {scans.length > 0 && (
          <Link
            href={`/scan/history?domainId=${encodeURIComponent(scans[0].domainId)}&domainName=${encodeURIComponent(domainName || scans[0].domainName)}`}
            className="text-xs font-bold text-primary hover:opacity-70 transition-opacity flex items-center gap-1"
          >
            View all <ChevronRight className="h-3 w-3" />
          </Link>
        )}
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

      {/* Table — desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-border">
              <th className="text-left px-5 py-5 text-[14px] font-medium text-brand-dark whitespace-nowrap">
                Scan Date &amp; Time
              </th>
              <th className="text-left px-5 py-5 text-[14px] font-medium text-brand-dark whitespace-nowrap">
                Scan Type
              </th>
              <th className="text-left px-5 py-5 text-[14px] font-medium text-brand-dark whitespace-nowrap">
                Risk Level
              </th>
              <th className="text-left px-5 py-5 text-[14px] font-medium text-brand-dark whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan, index) => {
              const isCompleted = scan.status.toLowerCase() === "completed";
              const scanType = formatScanType(scan.coverage);
              return (
                <tr
                  key={scan.scanId}
                  className={cn(
                    "hover:bg-gray-50",
                    index < scans.length - 1 ? "border-b border-gray-200" : ""
                  )}
                >
                  <td className="px-5 py-4">
                    <div className="text-[14px] font-medium text-brand-dark leading-tight">{formatDate(scan.createdAt)}</div>
                    <div className="text-xs text-brand-muted mt-0.5 font-medium">
                      {formatTime(scan.createdAt)}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-[14px] font-medium text-brand-dark">
                      {scanType === "Quick Scan" ? (
                        <ScanLine className="h-3.5 w-3.5 text-brand-dark" />
                      ) : (
                        <Target className="h-3.5 w-3.5 text-brand-dark" />
                      )}
                      <span>{scanType}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-[14px] font-medium text-brand-dark">
                      <span className={`h-1.5 w-1.5 rounded-full ${getRiskDotClass(scan.riskLevel)}`} />
                      <span>{scan.riskLevel || "Low"}</span>
                    </div>
                  </td>
               
                  <td className="px-5 py-4">
                    {isCompleted ? (
                      <Link
                        href={`/scan/report?scanId=${encodeURIComponent(scan.scanId)}`}
                        className="text-[14px] font-medium text-brand-dark hover:text-primary transition-colors flex items-center gap-1"
                      >
                        View Details <ChevronRight className="h-3 w-3" />
                      </Link>
                    ) : (
                      <Link
                        href={`/scan/progress?scanId=${encodeURIComponent(scan.scanId)}&domain=${encodeURIComponent(scan.domainName)}&initiatedAt=${encodeURIComponent(scan.createdAt)}`}
                        className="text-[14px] font-medium text-brand-pending-text hover:opacity-70 transition-colors flex items-center gap-1"
                      >
                        Track Progress <ChevronRight className="h-3 w-3" />
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: condensed table */}
      <div className="md:hidden">
        <div className="grid grid-cols-[1.2fr_1fr_1fr_auto] gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Scan Date &amp; Time</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase text-center">Scan Type</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase text-center">Risk Level</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase text-right">Actions</span>
        </div>
        <div className="divide-y divide-gray-100">
          {scans.map((scan) => {
            const isCompleted = scan.status.toLowerCase() === "completed";
            const scanType = formatScanType(scan.coverage);
            return (
              <div key={scan.scanId} className="grid grid-cols-[1.2fr_1fr_1fr_auto] gap-2 px-4 py-4 items-center">
                <div>
                  <p className="text-[10px] font-bold text-gray-900">{formatDate(scan.createdAt)}</p>
                  <p className="text-[9px] text-gray-400 mt-0.5">{formatTime(scan.createdAt)}</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  {scanType === "Quick Scan" ? (
                    <ScanLine className="h-3.5 w-3.5 text-gray-500" />
                  ) : (
                    <Target className="h-3.5 w-3.5 text-gray-500" />
                  )}
                  <span className="text-[10px] font-bold text-gray-900">{scanType}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <span className={`h-1.5 w-1.5 rounded-full ${getRiskDotClass(scan.riskLevel)}`} />
                    <span className="text-[10px] font-bold text-gray-900">{scan.riskLevel || "Low"}</span>
                  </div>
                  <span className="text-[9px] text-gray-400 mt-0.5 font-medium">
                    {isCompleted ? "Good" : "Action Needed"}
                  </span>
                </div>
                <div>
                  {isCompleted ? (
                    <Link
                      href={`/scan/report?scanId=${encodeURIComponent(scan.scanId)}`}
                      className="flex items-center gap-1 text-[10px] font-bold text-gray-700"
                    >
                      <span>View Details</span>
                      <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                    </Link>
                  ) : (
                    <Link
                      href={`/scan/progress?scanId=${encodeURIComponent(scan.scanId)}&domain=${encodeURIComponent(scan.domainName)}&initiatedAt=${encodeURIComponent(scan.createdAt)}`}
                      className="flex items-center gap-1 text-[10px] font-bold text-brand-pending-text"
                    >
                      <span>Track Progress</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}
