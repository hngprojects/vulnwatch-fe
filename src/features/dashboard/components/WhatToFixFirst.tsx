import { AlertTriangle } from "lucide-react";
import type { SecurityIssue, Priority } from "@/types/dashboard.types";

const PRIORITY_STYLES: Record<Priority, { badge: string; border: string }> = {
  Critical: { badge: "bg-red-100 text-red-700", border: "border-red-200" },
  High: { badge: "bg-orange-100 text-orange-700", border: "border-orange-200" },
  Medium: { badge: "bg-amber-100 text-amber-700", border: "border-amber-200" },
  Low: { badge: "bg-green-100 text-green-700", border: "border-green-200" },
};

interface WhatToFixFirstProps {
  issue: SecurityIssue;
}

export function WhatToFixFirst({ issue }: WhatToFixFirstProps) {
  const styles = PRIORITY_STYLES[issue.priority];

  return (
    <div className="bg-[#FEF2F2] rounded-2xl p-5 flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[#111827]">What to fix first</h3>
        <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
          {issue.priority} Priority
        </span>
      </div>

      {/* Alert content */}
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-full bg-red-200 flex items-center justify-center shrink-0">
          <AlertTriangle className="h-7 w-7 text-red-600" fill="currentColor" />
        </div>
        <div>
          <p className="text-base font-bold text-[#111827] leading-tight">{issue.title}</p>
          <p className="text-sm text-[#4B5563] mt-2 leading-relaxed">{issue.description}</p>
        </div>
      </div>

      {/* Fix now button */}
      <div className="mt-auto flex justify-end">
        <button
          type="button"
          className="inline-flex items-center gap-2 h-10 px-6 bg-[#C22020] text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          Fix Now
          <span className="text-lg leading-none">→</span>
        </button>
      </div>
    </div>
  );
}