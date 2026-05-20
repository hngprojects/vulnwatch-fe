"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Check, Info, ShieldCheck, Loader2, Upload, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { domainService } from "../services/domain.service";
import type { Domain } from "../types/domain.types";

type VerifyMethod = "dns" | "file" | "email";

function Stepper() {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2 sm:gap-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-brand-green text-white shrink-0">
          <Check size={13} />
        </div>
        <span className="text-sm font-medium text-brand-gray font-geist">Enter Domain</span>
      </div>
      <div className="flex flex-col gap-0.5 items-center my-1 sm:hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-0.5 h-1.5 bg-[#D1D5DB] rounded-full" />
        ))}
      </div>
      <div className="hidden sm:flex gap-0.5 items-center mx-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-2 h-0.5 bg-[#D1D5DB] rounded-full" />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-brand-green text-white shrink-0">
          2
        </div>
        <span className="text-sm font-medium text-brand-dark font-geist">Verify Domain Ownership</span>
      </div>
    </div>
  );
}

const PRE_CHECKS = [
  {
    title: "Your domain is registered",
    desc: "Make sure you have access to your domain register account",
  },
  {
    title: "Choose a verified method",
    desc: "You can verify using DNS, file upload, or email",
  },
  {
    title: "Verification may take few minutes",
    desc: "After verification, you can start scanning your domain",
  },
];

const METHOD_HINTS: Record<VerifyMethod, string> = {
  dns: "You'll add a DNS record to verify ownership.",
  file: "You'll upload a verification file to your website root directory.",
  email: "We'll send a verification link to your domain email.",
};

const METHOD_ROUTES: Record<VerifyMethod, (id: string, token: string) => string> = {
  dns: (id, t) => `/domain/${id}/verify/dns?token=${encodeURIComponent(t)}`,
  file: (id, t) => `/domain/${id}/verify/file?token=${encodeURIComponent(t)}`,
  email: (id, t) => `/domain/${id}/verify/email?token=${encodeURIComponent(t)}`,
};

const METHOD_TOASTS: Record<VerifyMethod, string> = {
  dns: "Proceeding to DNS verification...",
  file: "Proceeding to file upload verification...",
  email: "Proceeding to email verification...",
};

export default function VerifyMethodPage({ domainId }: { domainId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [domain, setDomain] = useState<Domain | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<VerifyMethod>("dns");

  useEffect(() => {
    domainService
      .getDomain(domainId)
      .then(setDomain)
      .finally(() => setLoading(false));
  }, [domainId]);

  if (loading) {
    return (
      <div className="px-4 md:px-6 py-6 flex items-center justify-center min-h-[60vh]">
        <Loader2 size={24} className="animate-spin text-[#072E28]" />
      </div>
    );
  }

  const handleContinue = () => {
    toast.info(METHOD_TOASTS[selectedMethod]);
    router.push(METHOD_ROUTES[selectedMethod](domainId, token));
  };

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
        <div className="w-14 hidden sm:block" />
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 flex flex-col items-center text-center gap-6">
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-[24px] md:text-[32px] font-semibold text-brand-dark font-geist">
            Verify Domain Ownership
          </h1>
          <p className="text-base font-normal text-brand-gray font-geist max-w-xl mx-auto">
            To ensure security and prevent unauthorized scans, you need to verify
            that you own this domain{domain ? ` (${domain.domain})` : ""}
          </p>
        </div>

        {/* Method cards — responsive grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
          {/* DNS TXT Record */}
          <button
            onClick={() => setSelectedMethod("dns")}
            className={`relative rounded-[8px] p-5 flex flex-col items-center gap-2 text-center transition-all border-2 cursor-pointer ${
              selectedMethod === "dns"
                ? "bg-brand-light-green border-brand-green"
                : "bg-white border-[#E5E7EB] hover:border-brand-green/40"
            }`}
          >
            <div className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedMethod === "dns" ? "border-brand-green bg-brand-green" : "border-[#D1D5DB]"
            }`}>
              {selectedMethod === "dns" && <Check size={9} className="text-white" />}
            </div>
            <Image
              src="/images/domain-page/txt-icon.jpg"
              alt="TXT Icon"
              width={40}
              height={40}
              className="w-10 h-10 object-contain rounded-[8px]"
            />
            <p className="text-base font-semibold text-brand-dark font-geist">DNS TXT Record</p>
            <p className="text-xs font-normal text-brand-gray font-geist">
              Add a TXT record to your DNS settings
            </p>
          </button>

          {/* File Upload */}
          <button
            onClick={() => setSelectedMethod("file")}
            className={`relative rounded-[8px] p-5 flex flex-col items-center gap-2 text-center transition-all border-2 cursor-pointer ${
              selectedMethod === "file"
                ? "bg-brand-light-green border-brand-green"
                : "bg-white border-[#E5E7EB] hover:border-brand-green/40"
            }`}
          >
            <div className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedMethod === "file" ? "border-brand-green bg-brand-green" : "border-[#D1D5DB]"
            }`}>
              {selectedMethod === "file" && <Check size={9} className="text-white" />}
            </div>
            <div className="w-10 h-10 rounded-[8px] bg-[#F3F4F6] flex items-center justify-center">
              <Upload size={20} className="text-brand-dark" />
            </div>
            <p className="text-base font-semibold text-brand-dark font-geist">File Upload</p>
            <p className="text-xs font-normal text-brand-gray font-geist">
              Upload a verification file to your website root directory
            </p>
          </button>

          {/* Email Verification */}
          <button
            onClick={() => setSelectedMethod("email")}
            className={`relative rounded-[8px] p-5 flex flex-col items-center gap-2 text-center transition-all border-2 cursor-pointer ${
              selectedMethod === "email"
                ? "bg-brand-light-green border-brand-green"
                : "bg-white border-[#E5E7EB] hover:border-brand-green/40"
            }`}
          >
            <div className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
              selectedMethod === "email" ? "border-brand-green bg-brand-green" : "border-[#D1D5DB]"
            }`}>
              {selectedMethod === "email" && <Check size={9} className="text-white" />}
            </div>
            <div className="w-10 h-10 rounded-[8px] bg-[#F3F4F6] flex items-center justify-center">
              <Mail size={20} className="text-brand-dark" />
            </div>
            <p className="text-base font-semibold text-brand-dark font-geist">Email Verification</p>
            <p className="text-xs font-normal text-brand-gray font-geist">
              Approve via a verification link sent to your domain email
            </p>
          </button>
        </div>

        {/* Continue button */}
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full max-w-[280px]">
            <Button
              onClick={handleContinue}
              className="w-full bg-[#072E28] hover:bg-[#072E28]/90 text-white font-medium h-11 rounded-[8px] cursor-pointer"
            >
              Continue
            </Button>
          </div>
          <p className="flex items-center justify-center gap-1.5 text-sm font-normal text-brand-slate font-geist w-full">
            <Info size={12} />
            {METHOD_HINTS[selectedMethod]}
          </p>
        </div>
      </div>

      {/* Before you continue */}
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
                <p className="text-[18px] font-semibold text-brand-slate font-geist">{item.title}</p>
                <p className="text-[16px] font-normal text-brand-gray font-geist leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="flex items-center gap-2 text-[16px] font-normal text-brand-gray font-geist pt-2 border-t border-[#E5E7EB]/50">
          <ShieldCheck size={16} className="text-brand-green" />
          Your domain information is secure and encrypted
        </p>
      </div>
    </div>
  );
}
