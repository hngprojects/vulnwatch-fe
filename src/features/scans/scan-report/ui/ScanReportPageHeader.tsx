"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AskAiButton } from "@/features/ai-chat/components/AskAiButton";

type ScanStatus = "verified" | "unverified" | "pending" | "queued" | "";

interface ScanReportPageHeaderProps {
  domain: string;
  domainStatus?: string;
  onAskAi?: () => void;
}

export default function ScanReportPageHeader({
  domain,
  domainStatus = "verified",
  onAskAi,
}: ScanReportPageHeaderProps) {
  const router = useRouter();
  const status = domainStatus.toLowerCase() as ScanStatus;

  // Removed global expose hack which was causing ESLint immutability errors

  return (
    <div className="space-y-6">
      {/* Mobile Top Navigation */}
      <div className="flex lg:hidden items-center justify-between pb-2">
        <Button variant="ghost" className="text-[#667085] p-0 hover:bg-transparent h-auto w-auto" onClick={() => router.back()}>
          <ArrowLeft size={24} />
        </Button>
        <span className="font-medium text-[#667085]">{domain}</span>
        {/* Ask AI on mobile */}
        {onAskAi && (
          <button
            type="button"
            onClick={onAskAi}
            className="flex items-center gap-1.5 text-primary font-medium text-sm"
          >
            Ask AI
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 gap-y-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-globe-bg flex items-center justify-center shrink-0">
              <Globe size={16} className="text-primary" />
            </div>
            <span className="font-semibold text-brand-dark">{domain}</span>
          </div>
          <div
            className={cn(
              "px-3 py-1 leading-none text-sm font-medium rounded-lg capitalize",
              {
                "bg-[#E8F7EF] text-[#1DAF61]": status === "verified",
                "bg-[#FDEBEC] text-[#D00416]": status === "unverified",
                "bg-[#FFFBF0] text-[#B27F06]": status === "pending" || status === "queued",
              },
            )}
          >
            {status}
          </div>
        </div>
        {/* Desktop right actions — Ask AI only (Rescan moved to bottom action bar) */}
        <div className="items-center gap-4 hidden lg:flex">
          {onAskAi && (
            <AskAiButton onClick={onAskAi} />
          )}
        </div>
      </div>
    </div>
  );
}
