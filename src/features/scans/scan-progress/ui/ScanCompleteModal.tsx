"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  Clock,
  ShieldCheck,
  X,
} from "lucide-react";
import ScanResultCardItem from "./ScanResultCardItem";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ScanCompleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ScanCompleteModal({
  open,
  onOpenChange,
}: ScanCompleteModalProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="overflow-visible sm:max-w-lg p-0 border-none shadow-none bg-transparent outline-none"
      >
        {/* Scrollable container with padding for the overlap */}
        <div className="pt-16 pb-6 overflow-y-auto max-h-[98vh] scrollbar-hide">
          {/* The actual card */}
          <div className="bg-white rounded-4xl p-6 relative overflow-visible shadow-2xl mx-4 sm:mx-0">
            <DialogClose asChild className="absolute top-4 right-4 z-20">
              <Button variant="ghost" size="icon-sm" className="rounded-full">
                <X size={18} />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
            <DialogHeader className="sr-only">
              <DialogTitle>Scan Complete</DialogTitle>
              <DialogDescription>
                Your security scan finished successfully. Review the findings
                below.
              </DialogDescription>
            </DialogHeader>

            <div className="relative">
              {/* Overlapping Checkmark Icon */}
              <div className="absolute top-0 size-20 grid translate-y-[-77%] place-items-center left-1/2 translate-x-[-50%] bg-scan-green-400 p-3 rounded-full border-4 border-white z-10">
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

              <div className="text-center pt-12 space-y-4">
                <h1 className="font-semibold text-2xl text-scan-primary-900">
                  Scan Complete
                </h1>
                <p className="text-neutral-600">
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

                <div className="space-y-2 pt-2">
                  <Button
                    onClick={() => router.push("/scan/report")}
                    className="w-full"
                  >
                    Show Result
                  </Button>
                  <Link
                    href="/scan"
                    className="block text-center text-scan-primary-900 font-medium hover:underline"
                  >
                    Run another scan
                  </Link>
                </div>

                <div className="mt-16 flex items-center justify-center gap-2 text-neutral-500 text-sm">
                  <ShieldCheck size={18} className="text-scan-primary-400" />
                  <p>Verified by SecureScan Engine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
