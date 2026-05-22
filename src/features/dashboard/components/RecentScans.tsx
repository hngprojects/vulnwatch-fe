import type { Scan, RiskLevel } from "@/types/dashboard.types";
import { ScanLine, Target, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";



const RISK_DOTS: Record<RiskLevel, string> = {
  Critical: "bg-red-500",
  High: "bg-orange-400",
  Medium: "bg-amber-400",
  Low: "bg-green-500",
};



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
  scans: Scan[];
}

export function RecentScans({ scans }: RecentScansProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Header — plain text above the table, no background */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Recent Scans</h3>
        <button
          type="button"
          className="text-xs font-bold text-primary hover:opacity-70 transition-opacity flex items-center gap-1"
        >
          View all <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

      {/* Table — desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-border">
              <th className="text-left px-5 py-5 text-[14px] font-medium text-brand-dark whitespace-nowrap">
                Scan Date & Time
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
            {scans.map((scan, index) => (
              <tr
                key={scan.id}
                className={cn(
                  "hover:bg-gray-50",
                  index < scans.length - 1 ? "border-b border-gray-200" : ""
                )}
              >
                <td className="px-5 py-4">
                  <div className="text-[14px] font-medium text-brand-dark leading-tight">{formatDate(scan.date)}</div>
                  <div className="text-xs text-brand-muted mt-0.5 font-medium">
                    {formatTime(scan.date)}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 text-[14px] font-medium text-brand-dark">
                    {scan.scanType === "Quick Scan" ? (
                      <ScanLine className="h-3.5 w-3.5 text-brand-dark" />
                    ) : (
                      <Target className="h-3.5 w-3.5 text-brand-dark" />
                    )}
                    <span>{scan.scanType}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 text-[14px] font-medium text-brand-dark">
                    <span className={`h-1.5 w-1.5 rounded-full ${RISK_DOTS[scan.riskLevel]}`} />
                    <span>{scan.riskLevel}</span>
                  </div>
                </td>
               
                <td className="px-5 py-4">
                  <button
                    type="button"
                    className="text-[14px] font-medium text-brand-dark hover:text-primary transition-colors flex items-center gap-1"
                  >
                    View Details <ChevronRight className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: condensed table */}
      <div className="md:hidden">
        <div className="grid grid-cols-[1.2fr_1fr_1fr_auto] gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Scan Date & Time</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase text-center">Scan Type</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase text-center">Risk Level</span>
          <span className="text-[10px] font-bold text-gray-500 uppercase text-right">Actions</span>
        </div>
        <div className="divide-y divide-gray-100">
          {scans.map((scan) => (
            <div key={scan.id} className="grid grid-cols-[1.2fr_1fr_1fr_auto] gap-2 px-4 py-4 items-center">
              <div>
                <p className="text-[10px] font-bold text-gray-900">{formatDate(scan.date)}</p>
                <p className="text-[9px] text-gray-400 mt-0.5">{formatTime(scan.date)}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                {scan.scanType === "Quick Scan" ? (
                  <ScanLine className="h-3.5 w-3.5 text-gray-500" />
                ) : (
                  <Target className="h-3.5 w-3.5 text-gray-500" />
                )}
                <span className="text-[10px] font-bold text-gray-900">{scan.scanType}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${RISK_DOTS[scan.riskLevel]}`} />
                  <span className="text-[10px] font-bold text-gray-900">{scan.riskLevel}</span>
                </div>
                <span className="text-[9px] text-gray-400 mt-0.5 font-medium">
                  {scan.status === "Complete" ? "Good" : "Action Needed"}
                </span>
              </div>
              <div>
                <button
                  type="button"
                  className="flex items-center gap-1 text-[10px] font-bold text-gray-700"
                >
                  <span>View Details</span>
                  <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
