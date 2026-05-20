import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import type { AIAction, Priority } from "@/types/dashboard.types";

// Per-priority color config matching exact design tokens
const PRIORITY_CONFIG: Record<
  Priority,
  {
    titleColor: string;
    badgeBg: string;
    badgeText: string;
    numColor: string;
    label: string;
  }
> = {
  Critical: {
    titleColor: "text-[#BA1A1A]",
    badgeBg: "bg-[#FFE7E7]",
    badgeText: "text-[#BA1A1A]",
    numColor: "text-[#BA1A1A]",
    label: "Critical",
  },
  High: {
    titleColor: "text-[#DD6414]",
    badgeBg: "bg-[#FFE0C9]",
    badgeText: "text-[#DD6414]",
    numColor: "text-[#DD6414]",
    label: "High",
  },
  Medium: {
    titleColor: "text-[#C68A00]",
    badgeBg: "bg-[#FFFBF1]",
    badgeText: "text-[#C68A00]",
    numColor: "text-[#C68A00]",
    label: "Medium",
  },
  Low: {
    titleColor: "text-[#0D6837]",
    badgeBg: "bg-[#E6F4EA]",
    badgeText: "text-[#0D6837]",
    numColor: "text-[#0D6837]",
    label: "Low",
  },
};

interface AISecurityAssistantProps {
  actions: AIAction[];
}

function ActionCard({ action, index }: { action: AIAction; index: number }) {
  const config = PRIORITY_CONFIG[action.priority];

  return (
    <div className="bg-white rounded-[5px] border border-[#E5E7EB] p-4 flex flex-col gap-2 w-full">
      {/* Row 1: number + title + badge */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* Index number — same color as title */}
          <span className={`font-geist font-semibold text-[16px] leading-[24px] tracking-[2%] shrink-0 ${config.numColor}`}>
            {index + 1}
          </span>
          {/* Title */}
          <p className={`font-geist font-semibold text-[16px] leading-[24px] tracking-[2%] truncate ${config.titleColor}`}>
            {action.title}
          </p>
        </div>
        {/* Priority badge */}
        <span
          className={`inline-flex items-center font-geist font-normal text-[12px] leading-[16px] tracking-[2%] px-2 py-0.5 rounded-[5px] shrink-0 ${config.badgeBg} ${config.badgeText}`}
        >
          {config.label}
        </span>
      </div>

      {/* Row 2: description */}
      <p className="font-geist font-normal text-[16px] leading-[24px] tracking-[2%] text-[#5C5C5C] pl-6">
        {action.description}
      </p>
    </div>
  );
}

export function AISecurityAssistant({ actions }: AISecurityAssistantProps) {
  return (
    <div className="bg-[#FFFFFF] rounded-lg border border-[#E5E7EB] p-5">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-[#111827] flex items-center justify-center shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-[#A0E870]" />
          </div>
          <h3 className="font-geist font-medium text-[20px] leading-[24px] tracking-[2%] text-[#2B2B2B]">
            AI Security Assistant
          </h3>
        </div>
        <Link
          href="/report"
          className="font-geist font-normal text-[16px] leading-[16px] tracking-[2%] text-[#072E28] hover:opacity-70 transition-opacity flex items-center gap-1"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Subtitle */}
      <p className="font-geist font-normal text-[16px] leading-[24px] tracking-[2%] text-[#5C5C5C] mb-5">
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