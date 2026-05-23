"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Globe, RefreshCcw, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { scanService } from "@/features/scans/services/scan.service";

type ScanStatus = "verified" | "unverified" | "pending" | "queued" | "";

const ViewFindingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.6116 9.47734L10.7147 8.04062L9.2749 4.14062C9.16479 3.84201 8.96579 3.58434 8.7047 3.40234C8.44361 3.22034 8.133 3.12276 7.81474 3.12276C7.49648 3.12276 7.18587 3.22034 6.92478 3.40234C6.6637 3.58434 6.46469 3.84201 6.35458 4.14062L4.91787 8.04062L1.01787 9.47734C0.719255 9.58745 0.461581 9.78645 0.27958 10.0475C0.097578 10.3086 0 10.6192 0 10.9375C0 11.2558 0.097578 11.5664 0.27958 11.8275C0.461581 12.0885 0.719255 12.2876 1.01787 12.3977L4.91474 13.8344L6.35458 17.7344C6.46469 18.033 6.6637 18.2907 6.92478 18.4727C7.18587 18.6547 7.49648 18.7522 7.81474 18.7522C8.133 18.7522 8.44361 18.6547 8.7047 18.4727C8.96579 18.2907 9.16479 18.033 9.2749 17.7344L10.7116 13.8375L14.6116 12.3977C14.9102 12.2876 15.1679 12.0885 15.3499 11.8275C15.5319 11.5664 15.6295 11.2558 15.6295 10.9375C15.6295 10.6192 15.5319 10.3086 15.3499 10.0475C15.1679 9.78645 14.9102 9.58745 14.6116 9.47734ZM9.66005 12.2242C9.5328 12.2711 9.41723 12.3451 9.32133 12.441C9.22543 12.5369 9.15148 12.6524 9.10458 12.7797L7.81474 16.2719L6.52802 12.7797C6.48112 12.6524 6.40717 12.5369 6.31127 12.441C6.21537 12.3451 6.09981 12.2711 5.97255 12.2242L2.48037 10.9375L5.97255 9.65078C6.09981 9.60388 6.21537 9.52993 6.31127 9.43403C6.40717 9.33813 6.48112 9.22257 6.52802 9.09531L7.81474 5.60313L9.10146 9.09531C9.14836 9.22257 9.22231 9.33813 9.31821 9.43403C9.41411 9.52993 9.52967 9.60388 9.65693 9.65078L13.1491 10.9375L9.66005 12.2242ZM10.0022 2.8125C10.0022 2.56386 10.101 2.3254 10.2768 2.14959C10.4526 1.97377 10.6911 1.875 10.9397 1.875H11.8772V0.9375C11.8772 0.68886 11.976 0.450403 12.1518 0.274587C12.3276 0.098772 12.5661 0 12.8147 0C13.0634 0 13.3018 0.098772 13.4777 0.274587C13.6535 0.450403 13.7522 0.68886 13.7522 0.9375V1.875H14.6897C14.9384 1.875 15.1768 1.97377 15.3527 2.14959C15.5285 2.3254 15.6272 2.56386 15.6272 2.8125C15.6272 3.06114 15.5285 3.2996 15.3527 3.47541C15.1768 3.65123 14.9384 3.75 14.6897 3.75H13.7522V4.6875C13.7522 4.93614 13.6535 5.1746 13.4777 5.35041C13.3018 5.52623 13.0634 5.625 12.8147 5.625C12.5661 5.625 12.3276 5.52623 12.1518 5.35041C11.976 5.1746 11.8772 4.93614 11.8772 4.6875V3.75H10.9397C10.6911 3.75 10.4526 3.65123 10.2768 3.47541C10.101 3.2996 10.0022 3.06114 10.0022 2.8125ZM18.7522 6.5625C18.7522 6.81114 18.6535 7.0496 18.4777 7.22541C18.3018 7.40123 18.0634 7.5 17.8147 7.5H17.5022V7.8125C17.5022 8.06114 17.4035 8.2996 17.2277 8.47541C17.0518 8.65123 16.8134 8.75 16.5647 8.75C16.3161 8.75 16.0776 8.65123 15.9018 8.47541C15.726 8.2996 15.6272 8.06114 15.6272 7.8125V7.5H15.3147C15.0661 7.5 14.8276 7.40123 14.6518 7.22541C14.476 7.0496 14.3772 6.81114 14.3772 6.5625C14.3772 6.31386 14.476 6.0754 14.6518 5.89959C14.8276 5.72377 15.0661 5.625 15.3147 5.625H15.6272V5.3125C15.6272 5.06386 15.726 4.8254 15.9018 4.64959C16.0776 4.47377 16.3161 4.375 16.5647 4.375C16.8134 4.375 17.0518 4.47377 17.2277 4.64959C17.4035 4.8254 17.5022 5.06386 17.5022 5.3125V5.625H17.8147C18.0634 5.625 18.3018 5.72377 18.4777 5.89959C18.6535 6.0754 18.7522 6.31386 18.7522 6.5625Z" fill="currentColor"/>
  </svg>
);

interface ScanReportPageHeaderProps {
  domain: string;
  scanId?: string;
  domainStatus?: string;
}

export default function ScanReportPageHeader({
  domain,
  scanId,
  domainStatus = "verified",
}: ScanReportPageHeaderProps) {
  const router = useRouter();
  const [isRescanning, setIsRescanning] = useState(false);
  const status = domainStatus.toLowerCase() as ScanStatus;

  const handleRescan = async () => {
    if (isRescanning) return;
    try {
      setIsRescanning(true);
      const response = await scanService.createScan({
        domain: domain,
        scanType: "QUICK_SCAN",
      });

      if (response.isSuccess && response.value) {
        if (
          response.value.message === "A scan is already in progress for this domain." ||
          response.value.message === "Scan already initiated."
        ) {
          toast.info(response.value.message);
        }
        
        const { scanId: newScanId, initiatedAt } = response.value;
        const activeInitiatedAt = initiatedAt || new Date().toISOString();

        router.push(
          `/scan/progress?scanId=${encodeURIComponent(newScanId)}&domain=${encodeURIComponent(domain)}&initiatedAt=${encodeURIComponent(activeInitiatedAt)}`
        );
      } else {
        toast.error(response.error?.message || "Failed to start scan. Please try again.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      toast.error(msg);
    } finally {
      setIsRescanning(false);
    }
  };

  const handleViewAllFindings = () => {
    router.push(`/scan/report/findings?scanId=${encodeURIComponent(scanId || "")}`);
  };

  return (
    <div className="space-y-6">
      {/* Mobile Top Navigation */}
      <div className="flex lg:hidden items-center justify-between pb-2">
        <Button variant="ghost" className="text-[#667085] p-0 hover:bg-transparent h-auto w-auto" onClick={() => router.back()}>
          <ArrowLeft size={24} />
        </Button>
        <span className="font-medium text-[#667085]">{domain}</span>
        <Button 
          variant="ghost" 
          disabled={isRescanning}
          className="p-0 flex items-center gap-1.5 text-primary hover:bg-transparent h-auto font-medium text-[16px] disabled:opacity-60"
          onClick={handleRescan}
        >
          {isRescanning ? (
            <Loader2 size={18} className="animate-spin text-primary" />
          ) : (
            <RefreshCcw size={18} strokeWidth={2.2} />
          )}
          <span>{isRescanning ? "Starting..." : "Rescan"}</span>
        </Button>
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
        <div className="items-center gap-4 hidden lg:flex">
          <Button
            variant="outline"
            disabled={isRescanning}
            className="border-[1.5px] border-primary text-primary flex items-center gap-2 disabled:opacity-60"
            onClick={handleRescan}
          >
            {isRescanning ? (
              <Loader2 size={20} className="animate-spin text-primary" />
            ) : (
              <RefreshCcw strokeWidth={2.2} size={20} />
            )}
            <span>{isRescanning ? "Rescanning..." : "Rescan"}</span>
          </Button>
          <Button 
            className="flex items-center gap-2 text-[#FFFFFF] font-inter font-semibold text-[16px]"
            onClick={handleViewAllFindings}
          >
            <ViewFindingsIcon />
            <span>View all findings</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
