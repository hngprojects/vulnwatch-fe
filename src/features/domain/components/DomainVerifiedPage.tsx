"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

function Stepper() {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2 sm:gap-3">
      {/* Step 1 - complete */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-brand-green text-white shrink-0">
          <Check size={13} />
        </div>
        <span className="text-sm font-medium text-brand-gray font-geist">Domain Info</span>
      </div>

      <div className="hidden sm:flex gap-0.5 items-center mx-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-2 h-0.5 bg-brand-green rounded-full" />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 items-center my-1 sm:hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-0.5 h-1.5 bg-brand-green rounded-full" />
        ))}
      </div>

      {/* Step 2 - complete */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-brand-green text-white shrink-0">
          <Check size={13} />
        </div>
        <span className="text-sm font-medium text-brand-gray font-geist">Verification Method</span>
      </div>

      <div className="hidden sm:flex gap-0.5 items-center mx-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-2 h-0.5 bg-brand-green rounded-full" />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 items-center my-1 sm:hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-0.5 h-1.5 bg-brand-green rounded-full" />
        ))}
      </div>

      {/* Step 3 - active */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-brand-green text-white text-xs font-bold shrink-0">
          3
        </div>
        <span className="text-sm font-medium text-brand-dark font-geist">Select Email</span>
      </div>
    </div>
  );
}

const WHAT_NEXT = [
  {
    title: "Run your first vulnerability scan",
    desc: "Now that your domain is verified, initiate a scan to detect vulnerabilities.",
  },
  {
    title: "Monitor your security posture",
    desc: "Track your domain's security score and get alerts on new issues.",
  },
  {
    title: "Review scan reports",
    desc: "Access detailed reports with actionable recommendations.",
  },
];

export default function DomainVerifiedPage({
  domain,
  verifiedAt,
}: {
  domain: string;
  verifiedAt?: string;
}) {
  const router = useRouter();
  const [showWhatNext, setShowWhatNext] = useState(false);

  const formattedDate = verifiedAt
    ? new Date(verifiedAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      })
    : new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });

  return (
    <div className="px-4 md:px-6 py-6 bg-brand-bg min-h-screen">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-8 w-full">
        <button
          onClick={() => router.push("/domain")}
          className="self-start flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="flex justify-center w-full sm:w-auto">
          <Stepper />
        </div>
        <div className="w-14 hidden sm:block" />
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 flex flex-col items-center text-center gap-6 relative">
        {/* Expand toggle */}
        <button
          onClick={() => setShowWhatNext((v) => !v)}
          className="absolute top-4 right-4 text-[#9CA3AF] hover:text-brand-dark transition-colors"
          aria-label="Toggle details"
        >
          {showWhatNext ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {/* Success icon */}
        <div className="w-14 h-14 rounded-full bg-brand-green flex items-center justify-center shrink-0">
          <Check size={28} strokeWidth={2.5} className="text-white" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-[24px] md:text-[28px] font-semibold text-brand-dark font-geist">
            Domain Successfully Verified
          </h1>
          <p className="text-sm font-normal text-brand-gray font-geist max-w-md mx-auto">
            Your domain ownership has been confirmed. You can now initiate
            vulnerability scans and monitor security posture.
          </p>
        </div>

        {/* Domain badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light-green border border-brand-green/20">
          <span className="text-sm font-medium text-brand-dark font-geist">{domain}</span>
          <Check size={14} className="text-brand-green" />
        </div>

        {/* Info rows */}
        <div className="w-full max-w-md border border-[#E5E7EB] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
            <span className="text-sm text-brand-gray font-geist">Verification Method</span>
            <span className="text-xs font-semibold text-brand-green bg-brand-light-green px-2.5 py-1 rounded-full uppercase tracking-wide">
              Verified via Email
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-brand-gray font-geist">Date verified</span>
            <span className="text-sm font-medium text-brand-dark font-geist">{formattedDate}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full max-w-md flex flex-col items-center gap-3">
          <Button
            onClick={() => router.push("/scan")}
            className="w-full bg-[#072E28] hover:bg-[#072E28]/90 text-white font-medium h-11 rounded-[8px] cursor-pointer"
          >
            Start your first scan
          </Button>
          <button
            onClick={() => router.push("/domain")}
            className="text-sm text-brand-gray hover:text-brand-dark transition-colors font-geist"
          >
            Add another domain
          </button>
        </div>

        {/* What happens next accordion */}
        <div className="w-full max-w-md">
          <button
            onClick={() => setShowWhatNext((v) => !v)}
            className="flex items-center justify-between w-full text-sm font-medium text-brand-dark font-geist py-2 border-t border-[#E5E7EB]"
          >
            <span className="flex items-center gap-1.5">
              <span>?</span> What happens next?
            </span>
            {showWhatNext ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showWhatNext && (
            <div className="mt-3 space-y-4 text-left">
              {WHAT_NEXT.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-brand-green flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={10} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-dark font-geist">{item.title}</p>
                    <p className="text-xs font-normal text-brand-gray font-geist mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
