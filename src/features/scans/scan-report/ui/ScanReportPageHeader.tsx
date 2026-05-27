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
      <div className="flex lg:hidden items-center justify-between pb-2 gap-3">
        <Button variant="ghost" className="text-[#667085] p-0 hover:bg-transparent h-auto w-auto shrink-0" onClick={() => router.back()}>
          <ArrowLeft size={24} />
        </Button>
        <span className="font-medium text-[#667085] flex-1 min-w-0 truncate text-center">{domain}</span>
        {/* Ask AI on mobile */}
        {onAskAi ? (
          <Button
            variant="outline"
            type="button"
            onClick={onAskAi}
            className="border-[1.5px] border-primary text-primary flex items-center gap-1.5 font-medium text-sm h-8 px-3 hover:bg-primary/10 shrink-0"
          >
            <svg width="18" height="17" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="shrink-0">
              <path d="M12.9197 19.1404C17.1037 18.8634 20.4357 15.4834 20.7097 11.2404C20.7627 10.4104 20.7627 9.55042 20.7097 8.72042C20.4357 4.47842 17.1037 1.10042 12.9197 0.821424C11.4746 0.726192 10.0248 0.726192 8.57973 0.821424C4.39573 1.09942 1.06373 4.47842 0.789729 8.72142C0.736757 9.56059 0.736757 10.4023 0.789729 11.2414C0.889729 12.7864 1.57273 14.2174 2.37773 15.4254C2.84473 16.2704 2.53673 17.3254 2.04973 18.2484C1.69973 18.9134 1.52373 19.2454 1.66473 19.4854C1.80473 19.7254 2.11973 19.7334 2.74873 19.7484C3.99373 19.7784 4.83273 19.4264 5.49873 18.9354C5.87573 18.6564 6.06473 18.5174 6.19473 18.5014C6.32473 18.4854 6.58173 18.5914 7.09373 18.8014C7.55373 18.9914 8.08873 19.1084 8.57873 19.1414C10.0037 19.2354 11.4927 19.2354 12.9207 19.1414L12.9197 19.1404Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M6.25 13.25L8.092 7.724C8.13824 7.58609 8.22664 7.4662 8.34471 7.38126C8.46278 7.29632 8.60455 7.25062 8.75 7.25062C8.89545 7.25062 9.03722 7.29632 9.15529 7.38126C9.27336 7.4662 9.36176 7.58609 9.408 7.724L11.25 13.25M14.25 7.25V13.25M7.25 11.25H10.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Ask AI
          </Button>
        ) : (
          <div className="w-[96px] shrink-0" />
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
