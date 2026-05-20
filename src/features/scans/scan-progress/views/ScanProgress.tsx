"use client";

import PageHeader from "@/features/scans/shared/ui/PageHeader";
import { Shield } from "lucide-react";
import ProgressItem from "../ui/ProgressItem/ProgressItem";
import { SCAN_PROGRESS } from "../lib/constants";
import { useEffect, useState } from "react";
import ScanningProgress from "../../shared/ui/ScanningProgress";
import ScanCompleteModal from "../ui/ScanCompleteModal";

interface ScanProgressProps {
  scanId?: string;
}

export default function ScanProgress({ scanId }: ScanProgressProps) {
  const [isScanCompleteModalOpen, setIsScanCompleteModalOpen] = useState(false);


  useEffect(() => {
    // Open modal after some seconds
    setTimeout(() => {
      setIsScanCompleteModalOpen(true);
    }, 3000);
  }, []);

  return (
    <>
      <div className="px-4 md:px-6 py-6">
        <PageHeader
          title="Scan Progress"
          description={
            <p className="text-neutral-600 text-sm flex items-center gap-2">
              <Shield size={18} />
              Please wait while we analyze
            </p>
          }
          className="mb-20"
        />
        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start">
          <div className="flex justify-center mb-12">
            <ScanningProgress value={54} label="Scanning..." />
          </div>
          <div className="flex justify-center">
            {/* scan sections */}
            <div className="w-full max-w-xl">
              {SCAN_PROGRESS.map((item, index: number) => (
                <ProgressItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  status={item.status}
                  icon={item.icon}
                  isFirst={index === 0}
                  isLast={index === SCAN_PROGRESS.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ScanCompleteModal
        open={isScanCompleteModalOpen}
        onOpenChange={setIsScanCompleteModalOpen}
        scanId={scanId}
      />
    </>
  );
}
