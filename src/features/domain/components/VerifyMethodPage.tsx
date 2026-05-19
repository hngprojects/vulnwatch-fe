"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Globe,
  ArrowLeft,
  Check,
  Info,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { domainService } from "../services/domain.service";
import type { Domain } from "../types/domain.types";

function Stepper() {
  return (
    <div className="flex items-center gap-2 mb-8">
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-[#072E28] text-white">
          <Check size={12} />
        </div>
        <span className="text-sm font-medium text-[#6B7280]">Enter Domain</span>
      </div>
      <div className="h-px w-10 bg-[#E5E7EB]" />
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-[#072E28] text-white">
          2
        </div>
        <span className="text-sm font-medium text-[#111827]">Verify Domain Ownership</span>
      </div>
    </div>
  );
}

export default function VerifyMethodPage({ domainId }: { domainId: string }) {
  const router = useRouter();
  const [domain, setDomain] = useState<Domain | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="px-4 md:px-6 py-6 max-w-2xl">
      <button
        onClick={() => router.push("/domain")}
        className="flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#111827] mb-6"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <Stepper />

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#111827]">
            Verify Domain Ownership
          </h1>
          <p className="text-sm text-[#6B7280] mt-1 max-w-sm">
            To ensure security and prevent unauthorized scans, you need to verify
            that you own this domain
            {domain ? ` (${domain.name})` : ""}
          </p>
        </div>
        <Button
          onClick={() => router.push(`/domain/${domainId}/verify/dns`)}
          className="bg-[#072E28] text-white hover:bg-[#072E28]/90 rounded-lg shrink-0 ml-4"
        >
          Continue
        </Button>
      </div>

      <div className="mb-5">
        <h3 className="text-sm font-medium text-[#111827] mb-3">
          Choose verification method
        </h3>
        <div className="border-2 border-[#072E28] rounded-xl p-4 bg-[#F0FDF4] flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-[#072E28] flex items-center justify-center shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#072E28]" />
          </div>
          <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center shrink-0">
            <Globe size={16} className="text-[#374151]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#111827]">DNS TXT Record</p>
            <p className="text-xs text-[#6B7280]">Add a TXT record to your domain</p>
          </div>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-[#6B7280] mt-2">
          <Info size={12} />
          You&apos;ll add a DNS record to verify ownership.
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-[#111827] mb-3">Before you continue</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
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
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-[#ECFDF5] flex items-center justify-center shrink-0 mt-0.5">
                <Check size={10} className="text-[#10B981]" />
              </div>
              <div>
                <p className="text-xs font-medium text-[#111827]">{item.title}</p>
                <p className="text-xs text-[#6B7280]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="flex items-center gap-1.5 text-xs text-[#6B7280] border-t border-[#E5E7EB] pt-3 mt-4">
        <ShieldCheck size={12} className="text-[#10B981]" />
        Your domain information is secure and encrypted
      </p>
    </div>
  );
}
