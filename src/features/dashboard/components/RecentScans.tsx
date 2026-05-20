import type { Scan, RiskLevel } from "@/types/dashboard.types";
import { ScanLine, Target, ChevronRight } from "lucide-react";



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
    <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6]">
        <h3 className="text-sm font-semibold text-[#111827]">Recent Scans</h3>
        <button
          type="button"
          className="text-xs font-bold text-primary hover:opacity-70 transition-opacity flex items-center gap-1"
        >
          View all <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Table — desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#F3F4F6]">
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                Scan Date & Time
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                Scan Type
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                Risk Level
              </th>
              
              <th className="text-left px-5 py-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan, index) => (
              <tr
                key={scan.id}
                className={
                  index < scans.length - 1 ? "border-b border-[#F9FAFB]" : ""
                }
              >
                <td className="px-5 py-4 text-[#374151]">
                  <div className="text-xs font-bold">{formatDate(scan.date)}</div>
                  <div className="text-[10px] text-[#9CA3AF] mt-1 font-medium">
                    {formatTime(scan.date)}
                  </div>
                </td>
                <td className="px-5 py-4 text-[#374151]">
                  <div className="flex items-center gap-2">
                    {scan.scanType === "Quick Scan" ? (
                      <ScanLine className="h-3.5 w-3.5 text-[#6B7280]" />
                    ) : (
                      <Target className="h-3.5 w-3.5 text-[#6B7280]" />
                    )}
                    <span className="text-xs font-bold">{scan.scanType}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${RISK_DOTS[scan.riskLevel]}`} />
                    <span className="text-xs font-bold text-[#111827]">{scan.riskLevel}</span>
                  </div>
                </td>
               
                <td className="px-5 py-4">
                  <button
                    type="button"
                    className="text-xs font-bold text-[#374151] hover:text-primary transition-colors flex items-center gap-1"
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
        <div className="grid grid-cols-[1.2fr_1fr_1fr_auto] gap-2 px-4 py-3 border-b border-[#F3F4F6] bg-[#F9FAFB]">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase">Scan Date & Time</span>
          <span className="text-[10px] font-bold text-[#6B7280] uppercase text-center">Scan Type</span>
          <span className="text-[10px] font-bold text-[#6B7280] uppercase text-center">Risk Level</span>
          <span className="text-[10px] font-bold text-[#6B7280] uppercase text-right">Actions</span>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
          {scans.map((scan) => (
            <div key={scan.id} className="grid grid-cols-[1.2fr_1fr_1fr_auto] gap-2 px-4 py-4 items-center">
              <div>
                <p className="text-[10px] font-bold text-[#111827]">{formatDate(scan.date)}</p>
                <p className="text-[9px] text-[#9CA3AF] mt-0.5">{formatTime(scan.date)}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                {scan.scanType === "Quick Scan" ? (
                  <ScanLine className="h-3.5 w-3.5 text-[#6B7280]" />
                ) : (
                  <Target className="h-3.5 w-3.5 text-[#6B7280]" />
                )}
                <span className="text-[10px] font-bold text-[#111827]">{scan.scanType}</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${RISK_DOTS[scan.riskLevel]}`} />
                  <span className="text-[10px] font-bold text-[#111827]">{scan.riskLevel}</span>
                </div>
                <span className="text-[9px] text-[#9CA3AF] mt-0.5 font-medium">
                  {scan.status === "Complete" ? "Good" : "Action Needed"}
                </span>
              </div>
              <div>
                <button
                  type="button"
                  className="flex items-center gap-1 text-[10px] font-bold text-[#374151]"
                >
                  <span>View Details</span>
                  <ChevronRight className="h-3.5 w-3.5 text-[#9CA3AF]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
