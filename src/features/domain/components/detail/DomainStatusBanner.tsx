"use client";

import { Clock, Activity } from "lucide-react";

interface DomainStatusBannerProps {
  isLive: boolean;
  nextScanIn: string | null;
  lastMonitoredAt: string | null;
}

export function DomainStatusBanner({
  isLive,
  nextScanIn,
  lastMonitoredAt,
}: DomainStatusBannerProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 bg-white border border-gray-200 rounded-xl px-6 py-4">
      {/* Live indicator */}
      <div className="flex items-center gap-2">
        <div
          className={[
            "h-2.5 w-2.5 rounded-full",
            isLive ? "bg-green-500 animate-pulse" : "bg-slate-300",
          ].join(" ")}
        />
        <span className="text-sm font-medium text-slate-700">
          {isLive ? "Live" : "Paused"}
        </span>
      </div>

      <div className="h-5 w-px bg-gray-200 hidden sm:block" />

      {/* Next scan */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Clock className="h-4 w-4 text-slate-400" />
        <span>
          Next Scan:{" "}
          <span className="font-semibold text-slate-900">
            {nextScanIn ?? "—"}
          </span>
        </span>
      </div>

      <div className="h-5 w-px bg-gray-200 hidden sm:block" />

      {/* Last monitored */}
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Activity className="h-4 w-4 text-slate-400" />
        <span>
          Last Monitored:{" "}
          <span className="font-semibold text-slate-900">
            {lastMonitoredAt ?? "Never"}
          </span>
        </span>
      </div>
    </div>
  );
}
