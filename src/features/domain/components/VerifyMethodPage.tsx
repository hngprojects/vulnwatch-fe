"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Check, Info, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { domainService } from "../services/domain.service";
import type { Domain } from "../types/domain.types";



function Stepper() {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2 sm:gap-3">
      {/* Step 1 - complete */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-brand-green text-white shrink-0">
          <Check size={13} />
        </div>
        <span className="text-sm font-medium text-brand-gray font-geist">
          Enter Domain
        </span>
      </div>

      {/* Mobile vertical dotted/dashed connector */}
      <div className="flex flex-col gap-0.5 items-center my-1 sm:hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-0.5 h-1.5 bg-[#D1D5DB] rounded-full" />
        ))}
      </div>

      {/* Desktop horizontal dotted/dashed connector */}
      <div className="hidden sm:flex gap-0.5 items-center mx-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-2 h-0.5 bg-[#D1D5DB] rounded-full" />
        ))}
      </div>

      {/* Step 2 - active */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-brand-green text-white shrink-0">
          2
        </div>
        <span className="text-sm font-medium text-brand-dark font-geist">
          Verify Domain Ownership
        </span>
      </div>
    </div>
  );
}

const PRE_CHECKS = [
  {
    title: "Your domain is registered",
    desc: "Make sure you have access to your domain registrar account",
  },
  {
    title: "Verify via DNS",
    desc: "Add the provided DNS TXT record to your domain",
  },
  {
    title: "Verification may take few minutes",
    desc: "After verification, you can start scanning your domain",
  },
];

export default function VerifyMethodPage({ domainId }: { domainId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [domain, setDomain] = useState<Domain | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    domainService
      .getDomain(domainId)
      .then(setDomain)
      .catch((err) => {
        console.error("Failed to load domain details:", err);
        setDomain(null);
      })
      .finally(() => setLoading(false));
  }, [domainId]);

  if (loading) {
    return (
      <div className="px-4 md:px-6 py-6 flex items-center justify-center min-h-[60vh]">
        <Loader2 size={24} className="animate-spin text-[#072E28]" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-6 bg-brand-bg min-h-screen">
      {/* Top bar: Back + Stepper */}
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
        {/* spacer to keep stepper centered on desktop */}
        <div className="w-14 hidden sm:block" />
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 flex flex-col items-center text-center gap-6">
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-[24px] md:text-[32px] font-semibold text-brand-dark font-geist">
            Verify Domain Ownership
          </h1>
          <p className="text-base font-normal text-brand-gray font-geist max-w-xl mx-auto">
            To ensure security and prevent unauthorized scans, you need to verify
            that you own this domain
            {domain ? ` (${domain.domain})` : ""}
          </p>
        </div>

        {/* DNS TXT Record option card */}
        <div className="w-full max-w-sm bg-brand-light-green rounded-[8px] p-6 flex flex-col items-center gap-2 cursor-pointer">
          <Image
            src="/images/domain-page/txt-icon.jpg"
            alt="TXT Icon"
            width={40}
            height={40}
            className="w-10 h-10 object-contain rounded-[8px]"
          />
          <p className="text-base font-semibold text-brand-dark mt-1 font-geist">
            DNS TXT Record
          </p>
          <p className="text-xs font-normal text-brand-gray font-geist">
            Add a TXT record to your domain
          </p>
        </div>

        {/* Continue button */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full max-w-[280px]">
            <Button
              onClick={() => {
                toast.info("Proceeding to DNS verification...");
                router.push(`/domain/${domainId}/verify/dns?token=${encodeURIComponent(token)}`);
              }}
              className="w-full bg-[#072E28] hover:bg-[#072E28]/90 text-white font-medium h-11 rounded-[8px] cursor-pointer"
            >
              Continue
            </Button>
          </div>
          <p className="flex items-center justify-center gap-1.5 text-sm font-normal text-brand-slate font-geist w-full">
            <Info size={12} />
            You&apos;ll add a DNS record to verify ownership.
          </p>
        </div>
      </div>

      {/* Before you continue — outside the card */}
      <div className="mt-8 space-y-5">
        <h3 className="text-[24px] font-semibold text-brand-dark font-geist">
          Before you continue
        </h3>
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 w-full">
          {PRE_CHECKS.map((item) => (
            <div key={item.title} className="flex items-start gap-3 flex-1">
              <div className="w-6 h-6 rounded-full border-2 border-brand-green flex items-center justify-center shrink-0 mt-0.5">
                <Check size={11} className="text-brand-green" />
              </div>
              <div className="space-y-1">
                <p className="text-[18px] font-semibold text-brand-slate font-geist">
                  {item.title}
                </p>
                <p className="text-[16px] font-normal text-brand-gray font-geist leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Security note */}
        <p className="flex items-center gap-2 text-[16px] font-normal text-brand-gray font-geist pt-2 border-t border-[#E5E7EB]/50">
          <ShieldCheck size={16} className="text-brand-green" />
          Your domain information is secure and encrypted
        </p>
      </div>
    </div>
  );
}
