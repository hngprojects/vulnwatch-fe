"use client";

import PageHeader from "@/features/scans/shared/ui/PageHeader";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  Clock,
  Shield,
  ShieldCheck,
} from "lucide-react";
import ProgressItem from "../ui/ProgressItem/ProgressItem";
import { SCAN_PROGRESS } from "../lib/constants";
import { useState } from "react";
import Modal from "../../shared/ui/Modal";
import ScanResultCardItem from "../ui/ScanResultCardItem";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ScanningProgress from "../../shared/ui/ScanningProgress";

export default function ScanProgress() {
  const [isScanCompleteModalOpen, setIsScanCompleteModalOpen] = useState(true);

  const router = useRouter();

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

      <Modal
        open={isScanCompleteModalOpen}
        onOpenChange={setIsScanCompleteModalOpen}
        title=""
        description=""
      >
        <div className="relative">
          <div className="absolute -top-12 size-20 grid -translate-y-1/2  place-items-center left-1/2 translate-x-[-50%] bg-scan-green-400 p-3 rounded-full border-4 border-white">
            <svg
              className="w-8 h-auto"
              width="37"
              height="29"
              viewBox="0 0 37 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35.5184 7.33244L15.4559 27.3949C14.9871 27.8634 14.3514 28.1266 13.6887 28.1266C13.0259 28.1266 12.3903 27.8634 11.9215 27.3949L0.730873 16.1449C0.262864 15.6762 0 15.0409 0 14.3785C0 13.7162 0.262864 13.0809 0.730873 12.6121L3.85587 9.48713C4.32441 9.02055 4.95871 8.75859 5.61994 8.75859C6.28116 8.75859 6.91546 9.02055 7.384 9.48713L13.7512 15.6621L28.8699 0.729315C29.3385 0.262259 29.9732 0 30.6348 0C31.2964 0 31.931 0.262259 32.3996 0.729315L35.5168 3.78244C35.7512 4.01474 35.9373 4.29116 36.0644 4.59576C36.1915 4.90035 36.2569 5.22708 36.2571 5.55711C36.2572 5.88714 36.192 6.21394 36.0652 6.51864C35.9385 6.82334 35.7526 7.09993 35.5184 7.33244Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-center pt-5 space-y-4">
            <h1 className="font-semibold text-2xl text-scan-primary-900">
              Scan Complete
            </h1>
            <p>
              Your security scan finished successfully. Review the findings
              below.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center">
              <ScanResultCardItem
                statCount="2m 14s"
                icon={<Clock size={18} />}
                description="Duration"
                severity="neutral"
              />
              <ScanResultCardItem
                statCount="34"
                icon={<CheckCircleIcon size={18} />}
                description="Passed"
                severity="excellent"
              />
              <ScanResultCardItem
                statCount="3"
                icon={<AlertTriangleIcon size={18} />}
                description="Failed"
                severity="critical"
              />
            </div>
            <div className="space-y-2">
              <Button
                onClick={() => router.push("/scan/report")}
                className="w-full"
              >
                Show Result
              </Button>
              <Link href="/scan" className="text-center text-scan-primary-900">
                Run another scan
              </Link>
            </div>
            <div className="mt-20 flex items-center justify-center gap-2">
              <ShieldCheck className="text-scan-primary-400" />
              <p>Verified by SecureScan Engine</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
