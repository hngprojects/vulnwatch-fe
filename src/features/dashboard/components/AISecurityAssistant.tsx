import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import type { AIAction, Priority } from "@/types/dashboard.types";

const PRIORITY_CONFIG: Record<
  Priority,
  { badge: string; dot: string; label: string }
> = {
  Critical: {
    badge: "bg-red-50 text-red-700 border border-red-200",
    dot: "bg-red-500",
    label: "Critical",
  },
  High: {
    badge: "bg-orange-50 text-orange-700 border border-orange-200",
    dot: "bg-orange-500",
    label: "High",
  },
  Medium: {
    badge: "bg-amber-50 text-amber-700 border border-amber-200",
    dot: "bg-amber-400",
    label: "Medium",
  },
  Low: {
    badge: "bg-green-50 text-green-700 border border-green-200",
    dot: "bg-green-500",
    label: "Low",
  },
};

interface AISecurityAssistantProps {
  actions: AIAction[];
}

function ActionCard({ action, index }: { action: AIAction; index: number }) {
  const config = PRIORITY_CONFIG[action.priority];
  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-3.5 flex flex-col gap-2.5 hover:border-[#A0E870] transition-colors w-full">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="h-5 w-5 rounded-full border border-[#E5E7EB] flex items-center justify-center text-[10px] font-bold text-[#6B7280] shrink-0">
            {index + 1}
          </div>
          <p className="text-[13px] font-bold text-[#111827] leading-snug truncate">
            {action.title}
          </p>
        </div>
        <span
          className={`inline-flex items-center text-[9px] font-bold px-2 py-0.5 rounded-md shrink-0 ${config.badge}`}
        >
          {config.label}
        </span>
      </div>

      <div className="pl-7">
        <p className="text-[11px] text-[#4B5563] leading-relaxed">
          {action.description}
        </p>
      </div>
    </div>
  );
}

export function AISecurityAssistant({ actions }: AISecurityAssistantProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-[#111827] flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 text-[#A0E870]" />
          </div>
          <h3 className="text-sm font-bold text-[#111827]">AI Security Assistant</h3>
        </div>
        <Link
          href="/report"
          className="text-xs font-bold text-primary hover:opacity-70 transition-opacity flex items-center gap-1"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <p className="text-xs text-[#6B7280] mb-4">
        Based on your latest scan, here are the top actions to improve your security
      </p>

      {/* Action cards grid */}
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.slice(0, 3).map((action, index) => (
          <ActionCard key={action.id} action={action} index={index} />
        ))}
      </div>
    </div>
  );
}