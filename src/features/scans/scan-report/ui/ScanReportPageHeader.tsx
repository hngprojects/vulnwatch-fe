"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, Globe, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

type ScanStatus = "verified" | "unverified" | "";

const ViewFindingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.6116 9.47734L10.7147 8.04062L9.2749 4.14062C9.16479 3.84201 8.96579 3.58434 8.7047 3.40234C8.44361 3.22034 8.133 3.12276 7.81474 3.12276C7.49648 3.12276 7.18587 3.22034 6.92478 3.4023
  </svg>
);

export default function ScanReportPageHeader() {
  const router = useRouter();
  const status = "verified" as ScanStatus;

  const handleRescan = () => {
    router.push("/scan");
  };
  const handleViewAllFindings = () => {
    router.push("/scan/report/all");
  };

  return (
    <div className="space-y-6">
      {/* Mobile Top Navigation */}
      <div className="flex lg:hidden items-center justify-between pb-2">
        <Button variant="ghost" className="text-[#667085] p-0 hover:bg-transparent h-auto w-auto" onClick={() => router.back()}>
          <ArrowLeft size={24} />
        </Button>
        <span className="font-medium text-[#667085]">mycompany.com</span>
        <Button 
          variant="ghost" 
          className="p-0 flex items-center gap-1.5 text-primary hover:bg-transparent h-auto font-medium text-[16px]"
          onClick={handleRescan}
        >
          <RefreshCcw size={18} strokeWidth={2.2} />
          <span>Rescan</span>
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 gap-y-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Globe size={18} />
            <span>mycompany.com</span>
          </div>
          <div
            className={cn(
              "px-3 py-1 leading-none text-sm font-medium rounded-lg capitalize",
              {
                "bg-[#E8F7EF] text-[#1DAF61]": status === "verified",
              },
              {
                "bg-[#FDEBEC] text-[#D00416]": status === "unverified",
              },
            )}
          >
            {status}
          </div>
        </div>
        <div className="items-center gap-4 hidden lg:flex">
          <Button
            variant="outline"
            className="border-[1.5px] border-primary text-primary flex items-center gap-2"
            onClick={handleRescan}
          >
            <RefreshCcw strokeWidth={2.2} size={20} />
            <span>Rescan</span>
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
