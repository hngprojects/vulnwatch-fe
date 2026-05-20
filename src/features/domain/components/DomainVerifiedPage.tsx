"use client";

import { useRouter } from "next/navigation";
import { Check, Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

function Stepper() {
  return (
    <div className="flex items-start">
      {/* Step 1 */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="w-7 h-7 rounded-full border-2 border-[#0D6837] bg-white flex items-center justify-center shrink-0">
          <Check size={13} strokeWidth={2.5} className="text-[#0D6837]" />
        </div>
        <span className="text-xs font-medium text-[#0D6837] font-geist whitespace-nowrap">Domain Info</span>
      </div>

      {/* Connector */}
      <div className="h-[2px] w-20 sm:w-32 bg-[#0D6837] mt-3.25 mx-1 shrink-0" />

      {/* Step 2 */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="w-7 h-7 rounded-full border-2 border-[#0D6837] bg-white flex items-center justify-center shrink-0">
          <Check size={13} strokeWidth={2.5} className="text-[#0D6837]" />
        </div>
        <span className="text-xs font-medium text-[#0D6837] font-geist whitespace-nowrap">Verification Method</span>
      </div>

      {/* Connector */}
      <div className="h-[2px] w-20 sm:w-32 bg-[#1DAF61] mt-3.25 mx-1 shrink-0" />

      {/* Step 3 */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="w-7 h-7 rounded-full bg-[#1DAF61] flex items-center justify-center text-white text-xs font-bold shrink-0">
          3
        </div>
        <span className="text-xs font-medium text-[#1DAF61] font-geist whitespace-nowrap">Select Email</span>
      </div>
    </div>
  );
}


export default function DomainVerifiedPage({
  domain,
  verifiedAt,
}: {
  domain: string;
  verifiedAt?: string;
}) {
  const router = useRouter();
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
    <div className="px-4 md:px-6 py-6 bg-white min-h-screen">
      {/* Top bar */}
      <div className="flex justify-center mb-8 w-full">
        <Stepper />
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 flex flex-col items-center text-center gap-6 relative">
        {/* Success icon */}
        <div className="w-14 h-14 rounded-full bg-[#1DAF61] flex items-center justify-center shrink-0">
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
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F5E9] border border-brand-green/20">
          <span className="text-sm font-medium text-brand-dark font-geist">{domain}</span>
          <Check size={14} className="text-brand-green" />
        </div>

        {/* Info rows */}
        <div className="w-full max-w-md border border-[#E5E7EB] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
            <span className="text-sm text-brand-gray font-geist">Verification Method</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-green bg-[#FFF8E7] px-2.5 py-1 rounded-full uppercase tracking-wide">
              <Mail size={12} />
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
            className="text-sm text-brand-gray hover:text-brand-dark transition-colors font-geist border w-full h-11 rounded-[8px] cursor-pointer"
          >
            Add another domain
          </button>
        </div>

        <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-brand-dark font-geist border-t border-[#E5E7EB] w-full max-w-md pt-4">
          <Info size={15} /> What happens next?
        </p>

      </div>
    </div>
  );
}
