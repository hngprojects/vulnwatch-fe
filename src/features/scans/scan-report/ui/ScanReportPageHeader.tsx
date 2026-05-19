"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Globe, ListRestart, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ScanStatus = "verified" | "unverified" | "";

export default function ScanReportPageHeader() {
  const router = useRouter();
  const [status, setStatus] = useState<ScanStatus>("unverified");

  const handleRescan = () => {
    router.push("/scan");
  };
  const handleViewAllFindings = () => {
    router.push("/scan/report/all");
  };

  return (
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
              "bg-scan-green-400/20 text-scan-green-400": status === "verified",
            },
            {
              "bg-scan-red-400/10 text-scan-red-400": status === "unverified",
            },
          )}
        >
          {status}
        </div>
      </div>
      <div className="items-center gap-4 hidden md:flex">
        <Button
          variant="outline"
          className="border-[1.5px] border-primary text-primary flex items-center gap-2"
          onClick={handleRescan}
        >
          <RefreshCcw strokeWidth={2.2} size={22} />
          <span>Rescan</span>
        </Button>
        <Button onClick={handleViewAllFindings}>View All Findings</Button>
      </div>
    </div>
  );
}
