"use client";

import PageHeader from "@/features/scans/shared/ui/PageHeader";
import { Shield } from "lucide-react";
import ProgressItem from "../ui/ProgressItem/ProgressItem";
import { SCAN_PROGRESS } from "../lib/constants";
import { useState } from "react";
import ScanningProgress from "../../shared/ui/ScanningProgress";
import ScanCompleteModal from "../ui/ScanCompleteModal";

export default function ScanProgress() {
  const [isScanCompleteModalOpen, setIsScanCompleteModalOpen] = useState(true);

  return (
    <>
      <div>
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
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex justify-center mb-12">
            <ScanningProgress value={54} label="Scanning..." />
          </div>
          <div className="">
            {/* scan sections */}
            <div>
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
      />
    </>
  );
}
