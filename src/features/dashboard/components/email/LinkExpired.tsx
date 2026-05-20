"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

interface LinkExpiredProps {
  email?: string;
  onResend?: () => void;
  onTryDifferentMethod?: () => void;
}

function Stepper() {
  return (
    <div className="mb-6 flex w-full max-w-[520px] items-start">
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

export default function LinkExpired({
  email = "admin@company.com",
  onResend,
  onTryDifferentMethod,
}: LinkExpiredProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <Stepper />

      <div className="w-full max-w-[520px] rounded-2xl border border-[#E8E8E8] bg-white px-6 py-8 md:px-10 md:py-10">
        {/* Clock icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F5]">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="13" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M16 9v7l4 2" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-center text-[18px] font-semibold text-[#2b2b2b]">
          Your verification link has expired
        </h2>

        {/* Description */}
        <p className="mb-6 text-center text-[14px] leading-6 text-[#666666]">
          Links are valid for 24 hours. The link sent to{" "}
          <span className="inline-block rounded bg-[#FFF8E7] px-2 py-0.5 text-[13px] text-[#2b2b2b]">
            {email}
          </span>{" "}
          has expired.
        </p>

        {/* Resend button */}
        <button
          onClick={onResend}
          className="mb-3 w-full cursor-pointer rounded-xl bg-[#072e28] px-4 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 active:opacity-80"
        >
          Resend verification email
        </button>

        {/* Try different method button */}
        <button
          onClick={onTryDifferentMethod}
          className="w-full cursor-pointer rounded-xl border border-[#D4D4D4] bg-white px-4 py-3.5 text-[15px] font-medium text-[#2b2b2b] transition-colors hover:bg-[#F5F5F5] active:bg-[#EDEDED]"
        >
          Try a different method
        </button>

        {/* Footer hint */}
        <p className="mt-5 text-center text-[13px] text-[#9CA3AF]">
          If you keep having issues, try{" "}
          <span className="cursor-pointer font-medium text-[#666666] hover:underline">DNS TXT</span>{" "}
          or{" "}
          <span className="cursor-pointer font-medium text-[#666666] hover:underline">File Upload</span>{" "}
          instead.
        </p>
      </div>

      {/* Back to domain selection */}
      <button
        onClick={() => router.push("/domain")}
        className="mt-5 flex cursor-pointer items-center gap-1.5 text-[14px] text-[#9CA3AF] transition-colors hover:text-[#666666]"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back to domain selection
      </button>
    </div>
  );
}
