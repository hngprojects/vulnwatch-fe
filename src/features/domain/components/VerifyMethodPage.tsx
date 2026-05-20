"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  Info,
  Loader2,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { domainService } from "../services/domain.service";
import type { Domain, VerificationMethod } from "../types/domain.types";
import DomainVerificationStepper from "./DomainVerificationStepper";

const PRE_CHECKS = [
  {
    title: "Your domain is registered",
    desc: "Make sure you have access to your domain registrar account.",
  },
  {
    title: "Choose a verified method",
    desc: "Use DNS TXT or email verification based on what is fastest for you.",
  },
  {
    title: "Verification may take a few minutes",
    desc: "After verification, you can start scanning your domain right away.",
  },
];

const METHOD_OPTIONS: {
  value: VerificationMethod;
  title: string;
  description: string;
  icon: "dns" | "email";
}[] = [
  {
    value: "DNS_TXT",
    title: "DNS TXT Record",
    description: "Add a TXT record to your domain DNS settings.",
    icon: "dns",
  },
  {
    value: "EMAIL",
    title: "Email Verification",
    description: "Receive a verification link and 6-digit OTP by email.",
    icon: "email",
  },
];

function MethodIcon({ icon }: { icon: "dns" | "email" }) {
  if (icon === "email") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DDF7CE] text-[#072E28]">
        <Mail size={20} />
      </div>
    );
  }

  return (
    <Image
      src="/images/domain-page/txt-icon.jpg"
      alt="TXT Icon"
      width={44}
      height={44}
      className="h-11 w-11 rounded-2xl object-cover"
    />
  );
}

function getVerificationEmail(domainName: string) {
  if (!domainName) return "admin@company.io";
  return `admin@${domainName}`;
}

export default function VerifyMethodPage({ domainId }: { domainId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [domain, setDomain] = useState<Domain | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] =
    useState<VerificationMethod>("DNS_TXT");

  useEffect(() => {
    domainService
      .getDomain(domainId)
      .then((result) => {
        setDomain(result);
        if (result.verificationMethod === "EMAIL") {
          setSelectedMethod("EMAIL");
        }
      })
      .finally(() => setLoading(false));
  }, [domainId]);

  const handleContinue = () => {
    if (selectedMethod === "EMAIL") {
      const email = getVerificationEmail(domain?.domain ?? "");
      router.push(
        `/domain/${domainId}/verify/email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`,
      );
      return;
    }

    toast.info("Proceeding to DNS verification...");
    router.push(`/domain/${domainId}/verify/dns?token=${encodeURIComponent(token)}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-6 md:px-6">
        <Loader2 size={24} className="animate-spin text-[#072E28]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <DomainVerificationStepper
            steps={[
              {
                number: 1,
                label: "Domain Info",
                mobileLabel: "Domain info",
                state: "complete",
              },
              {
                number: 2,
                label: "Verification Method",
                mobileLabel: "Verification Method",
                state: "current",
              },
              {
                number: 3,
                label: "Select Email",
                mobileLabel: "Select Email",
                state: "upcoming",
              },
            ]}
          />
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => router.push("/domain")}
            className="flex items-center gap-1.5 self-start text-sm text-[#6B7280] transition-colors hover:text-[#111827]"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="w-14 hidden sm:block" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] md:p-8">
            <div className="max-w-2xl">
              <h1 className="text-[28px] font-semibold leading-tight text-brand-dark md:text-[36px]">
                Verify Domain Ownership
              </h1>
              <p className="mt-3 text-sm leading-6 text-brand-gray md:text-base">
                Choose how you want to confirm ownership for
                <span className="font-semibold text-brand-dark">
                  {" "}
                  {domain ? domain.domain : "this domain"}
                </span>
                . You can continue with DNS verification or request a code by
                email.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {METHOD_OPTIONS.map((option) => {
                const isSelected = selectedMethod === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedMethod(option.value)}
                    className={cn(
                      "rounded-[24px] border p-5 text-left transition-all",
                      isSelected
                        ? "border-[#072E28] bg-[#F5FBF8] shadow-[0_12px_24px_rgba(7,46,40,0.08)]"
                        : "border-[#E5E7EB] bg-white hover:border-[#B8C7C1]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <MethodIcon icon={option.icon} />
                      <div
                        className={cn(
                          "mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border",
                          isSelected
                            ? "border-[#072E28] bg-[#072E28]"
                            : "border-[#C9D3CF] bg-white",
                        )}
                      >
                        {isSelected && <Check size={12} className="text-white" />}
                      </div>
                    </div>

                    <p className="mt-5 text-lg font-semibold text-brand-dark">
                      {option.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-brand-gray">
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button
                onClick={handleContinue}
                className="h-11 rounded-xl bg-[#072E28] px-6 text-white hover:bg-[#072E28]/90"
              >
                Continue
              </Button>
              <p className="flex items-center gap-1.5 text-sm text-brand-slate">
                <Info size={12} />
                {selectedMethod === "EMAIL"
                  ? "We'll prepare an email verification step with an OTP fallback."
                  : "You'll add a DNS TXT record to verify ownership."}
              </p>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[24px] border border-[#E5E7EB] bg-[#FAFAFA] p-6">
              <h3 className="text-xl font-semibold text-brand-dark">
                Before you continue
              </h3>
              <div className="mt-5 space-y-5">
                {PRE_CHECKS.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-brand-green">
                      <Check size={12} className="text-brand-green" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-slate">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-brand-gray">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] border border-[#E5E7EB] bg-white p-5">
              <p className="flex items-center gap-2 text-sm text-brand-gray">
                <ShieldCheck size={16} className="text-brand-green" />
                Your domain information is secure and encrypted during
                verification.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
