import { CheckCircle, Clock, Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function ProgressItem({
  icon,
  title,
  description,
  status,
  isFirst = false,
  isLast = false,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  isFirst?: boolean;
  isLast?: boolean;
}) {
  const isActive = status === "completed" || status === "current";

  return (
    <div className="flex items-stretch gap-4">
      {/* Timeline column */}
      <div className="flex flex-col items-center w-4 shrink-0">
        {/* Line above dot */}
        <div
          className={cn(
            "w-px flex-1 mb-1",
            isFirst
              ? "opacity-0"
              : isActive
                ? "bg-neutral-800"
                : "bg-neutral-300",
          )}
        />

        {/* Dot */}
        <div
          className={cn(
            "w-2.5 h-2.5 rounded-full shrink-0",
            isActive ? "bg-neutral-800" : "border border-neutral-300 bg-white",
          )}
        />

        {/* Line below dot */}
        <div
          className={cn(
            "w-px flex-1 mt-1",
            isLast ? "opacity-0" : "bg-neutral-300",
          )}
        />
      </div>

      {/* Content row */}
      <div className="flex items-center justify-between flex-1 py-3">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h4 className="font-semibold text-sm text-neutral-800">{title}</h4>
            <p className="text-xs text-neutral-500 mt-0.5">{description}</p>
          </div>
        </div>

        <div className="ml-4 shrink-0">
          {status === "pending" && (
            <Clock size={22} strokeWidth={1.5} className="text-neutral-400" />
          )}
          {status === "current" && (
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-spin"
            >
              <circle cx="18" cy="4" r="4" fill="#3051D4" />
              <circle cx="18" cy="4" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="4" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="4" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="4" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="4" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="4" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="4" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="4" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="8" r="4" fill="#3051D4" />
              <circle cx="8" cy="8" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="8" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="8" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="8" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="8" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="8" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="8" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="8" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="4" cy="18" r="4" fill="#3051D4" />
              <circle cx="4" cy="18" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="4" cy="18" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="4" cy="18" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="4" cy="18" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="4" cy="18" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="4" cy="18" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="4" cy="18" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="4" cy="18" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="28" r="4" fill="#3051D4" />
              <circle cx="8" cy="28" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="28" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="28" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="28" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="28" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="28" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="28" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="8" cy="28" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="32" r="4" fill="#3051D4" />
              <circle cx="18" cy="32" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="32" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="32" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="32" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="32" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="32" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="32" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="18" cy="32" r="4" fill="black" fillOpacity="0.2" />
              <circle cx="28" cy="28" r="4" fill="#4338CA" fillOpacity="0.1" />
              <circle cx="32" cy="18" r="4" fill="#4338CA" fillOpacity="0.1" />
              <circle cx="28" cy="8" r="4" fill="#4338CA" fillOpacity="0.1" />
            </svg>
          )}
          {status === "completed" && (
            <CheckCircle
              size={18}
              strokeWidth={1.5}
              className="text-scan-green-400"
            />
          )}
        </div>
      </div>
    </div>
  );
}
