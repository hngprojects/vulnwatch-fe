"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

interface WrongAddressProps {
  email?: string;
  onSwitchToDNS?: () => void;
  onSwitchToFileUpload?: () => void;
}

function Stepper() {
  return (
    <div className="mb-6 flex w-full max-w-[580px] items-start">
      {/* Step 1 - complete */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1daf61] text-[#1daf61]">
          <Check size={14} strokeWidth={2.5} />
        </div>
        <span className="text-[11px] font-medium text-[#1daf61]">Domain Info</span>
      </div>

      {/* Connector 1 — dark (completed) */}
      <div className="mt-4 h-px flex-1 bg-[#2b2b2b]" />

      {/* Step 2 - complete */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1daf61] text-[#1daf61]">
          <Check size={14} strokeWidth={2.5} />
        </div>
        <span className="text-[11px] font-medium text-[#1daf61]">Verification Method</span>
      </div>

      {/* Connector 2 — light (not yet complete) */}
      <div className="mt-4 h-px flex-1 bg-[#9CA3AF]" />

      {/* Step 3 - active */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B7280] text-white text-[13px] font-bold">
          3
        </div>
        <span className="text-[11px] font-medium text-[#6B7280]">Select Email</span>
      </div>
    </div>
  );
}

export default function WrongAddress({
  email = "admin@company.io",
  onSwitchToDNS,
  onSwitchToFileUpload,
}: WrongAddressProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <Stepper />

      <div className="w-full max-w-[580px] rounded-2xl border border-[#E8E8E8] bg-white px-6 py-8 md:px-10 md:py-10">
        {/* Mail with lock icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="9" width="24" height="17" rx="2" stroke="#EF4444" strokeWidth="1.8" />
              <path d="M4 13l12 8 12-8" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
              <rect x="23" y="20" width="9" height="7" rx="1.5" fill="white" stroke="#EF4444" strokeWidth="1.5" />
              <path d="M25.5 20v-1.5a2 2 0 0 1 4 0V20" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="27.5" cy="23.5" r="1" fill="#EF4444" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-center text-[20px] font-bold text-[#2b2b2b]">
          Email Could Not Be Delivered
        </h2>

        {/* Description */}
        <p className="mb-5 text-center text-[14px] leading-6 text-[#666666]">
          We couldn&apos;t deliver the email to{" "}
          <strong className="font-semibold text-[#2b2b2b]">{email}</strong>. This
          may be because the WHOIS record is outdated or privacy- protected.
        </p>

        {/* Warning banner */}
        <div className="mb-5 flex items-start gap-3 rounded-lg bg-red-50 px-4 py-3">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-0.5 shrink-0">
            <path d="M9 1.5L16.5 15H1.5L9 1.5Z" stroke="#EF4444" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 7v3.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="9" cy="12.5" r="0.75" fill="#EF4444" />
          </svg>
          <p className="text-[13px] font-medium text-[#EF4444]">
            WHOIS privacy protection may be blocking email lookup.
          </p>
        </div>

        {/* Switch method cards */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* DNS TXT */}
          <button
            onClick={onSwitchToDNS}
            className="flex cursor-pointer flex-col items-start gap-3 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] p-4 text-left transition-colors hover:border-[#D4D4D4] hover:bg-[#F5F5F5] active:bg-[#EDEDED]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F0F0]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="#2b2b2b" strokeWidth="1.4" />
                <path d="M2 8h16M6 4v12" stroke="#2b2b2b" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <p className="text-[14px] font-semibold text-[#2b2b2b]">Switch to DNS TXT</p>
              <p className="mt-1 text-[12px] leading-5 text-[#666666]">
                Verify domain ownership by adding a specific TXT record to your DNS configuration.
              </p>
            </div>
          </button>

          {/* File Upload */}
          <button
            onClick={onSwitchToFileUpload}
            className="flex cursor-pointer flex-col items-start gap-3 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] p-4 text-left transition-colors hover:border-[#D4D4D4] hover:bg-[#F5F5F5] active:bg-[#EDEDED]"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F0F0F0]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8l-4-6Z" stroke="#2b2b2b" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M12 2v6h6M10 13V9m-2 2 2-2 2 2" stroke="#2b2b2b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="text-[14px] font-semibold text-[#2b2b2b]">Switch to File Upload</p>
              <p className="mt-1 text-[12px] leading-5 text-[#666666]">
                Verify by uploading a verification file to your website&apos;s root directory (.well-known).
              </p>
            </div>
          </button>
        </div>

        {/* Back to domain selection */}
        <button
          onClick={() => router.push("/domain")}
          className="flex w-full cursor-pointer items-center justify-center gap-1.5 text-[14px] text-[#9CA3AF] transition-colors hover:text-[#666666]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to domain selection
        </button>
      </div>
    </div>
  );
}
