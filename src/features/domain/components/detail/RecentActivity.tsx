"use client";

import {
  ScanLine,
  Lock,
  Settings,
  RefreshCw,
  Activity,
  Globe,
} from "lucide-react";
import type { ActivityEvent, ActivityIconType } from "./domain-detail.types";

const ICON_MAP: Record<ActivityIconType, React.ElementType> = {
  scan: ScanLine,
  ssl: Lock,
  settings: Settings,
  refresh: RefreshCw,
  activity: Activity,
  domain: Globe,
};

const COLOR_MAP = {
  green:  { text: "text-green-600",  bg: "bg-green-50",  dot: "bg-green-500" },
  blue:   { text: "text-blue-600",   bg: "bg-blue-50",   dot: "bg-blue-500" },
  purple: { text: "text-purple-600", bg: "bg-purple-50", dot: "bg-purple-500" },
  amber:  { text: "text-amber-600",  bg: "bg-amber-50",  dot: "bg-amber-500" },
  slate:  { text: "text-slate-600",  bg: "bg-slate-100", dot: "bg-slate-400" },
  red:    { text: "text-red-600",    bg: "bg-red-50",    dot: "bg-red-500" },
} as const;



interface RecentActivityProps {
  events: ActivityEvent[];
}

export function RecentActivity({ events }: RecentActivityProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="h-4 w-4 text-slate-400" />
        <h3 className="font-semibold text-slate-900 font-geist">Recent Activity</h3>
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[17px] top-4 bottom-4 w-px bg-gray-200" />

        <div className="space-y-6">
          {events.map((event) => {
            const Icon = ICON_MAP[event.iconType];
            const colors = COLOR_MAP[event.colorVariant];

            return (
              <div key={event.id} className="flex gap-4 relative">
                <div
                  className={[
                    "flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center z-10",
                    colors.bg,
                  ].join(" ")}
                >
                  <Icon className={`h-4 w-4 ${colors.text}`} />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-semibold text-slate-900 font-geist">
                    {event.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    {event.detail}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{event.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
