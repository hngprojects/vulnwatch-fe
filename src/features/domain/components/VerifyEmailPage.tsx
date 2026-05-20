"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Check, Mail, Loader2, RefreshCw, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { domainService } from "../services/domain.service";
import type { Domain } from "../types/domain.types";

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

export default function VerifyEmailPage({ domainId }: { domainId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token") ?? "";

  const [domain, setDomain] = useState<Domain | null>(null);
  const [loadingDomain, setLoadingDomain] = useState(true);
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    domainService
      .getDomain(domainId)
      .then(setDomain)
      .finally(() => setLoadingDomain(false));
  }, [domainId]);

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const t = setTimeout(() => setResendCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCountdown]);

  const domainName = domain?.domain ?? "yourdomain.com";
  const verificationEmail = `admin@${domainName}`;

  const handleCheckStatus = async () => {
    setChecking(true);
    try {
      const updated = await domainService.getDomain(domainId);
      if (updated.status === "Verified") {
        toast.success("Domain verified successfully!");
        router.push("/domain");
      } else {
        toast.info("Not verified yet. Please check your email and click the verification link.");
      }
    } catch {
      toast.error("Failed to check status. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await domainService.verifyDomain(domainId);
      toast.success("Verification email resent!");
      setResendCountdown(60);
    } catch {
      toast.error("Failed to resend. Please try again.");
    } finally {
      setResending(false);
    }
  };

  if (loadingDomain) {
    return (
      <div className="px-4 md:px-6 py-6 flex items-center justify-center min-h-[60vh]">
        <Loader2 size={24} className="animate-spin text-[#072E28]" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-6 bg-brand-bg min-h-screen">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-8 w-full">
        <button
          onClick={() =>
            router.push(
              `/domain/${domainId}/verify?token=${encodeURIComponent(tokenFromUrl)}`
            )
          }
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

      {/* Breadcrumb (mobile hidden) */}
      <nav className="hidden sm:flex items-center gap-1 text-xs text-[#6B7280] font-geist mb-6">
        <span>Domain</span>
        <ChevronRight size={11} />
        <span>Verify Domain</span>
        <ChevronRight size={11} />
        <span className="text-brand-dark font-medium">Email Verification</span>
      </nav>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 sm:p-10 flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-brand-light-green flex items-center justify-center">
          <Mail size={28} className="text-brand-green" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-[22px] sm:text-[28px] font-semibold text-brand-dark font-geist">
            Check Your Domain Email
          </h1>
          <p className="text-sm font-normal text-brand-gray font-geist">
            We&apos;ve sent a verification link to the admin email associated with{" "}
            <span className="font-semibold text-brand-dark">{domainName}</span>
          </p>
        </div>

        {/* Email hint */}
        <div className="w-full bg-[#F9FAFB] rounded-lg border border-[#E5E7EB] px-4 py-3 flex items-center gap-3">
          <Mail size={16} className="text-[#9CA3AF] shrink-0" />
          <span className="text-sm text-brand-dark font-mono font-geist">{verificationEmail}</span>
        </div>

        {/* Steps */}
        <div className="w-full text-left space-y-3">
          {[
            "Open the email from VulnWatch",
            'Click the "Verify Domain Ownership" button in the email',
            "Return here and click \"Check verification status\"",
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-brand-green flex items-center justify-center text-xs font-bold text-brand-green shrink-0 mt-0.5 font-geist">
                {i + 1}
              </div>
              <p className="text-sm text-brand-dark font-geist leading-relaxed">{s}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="w-full space-y-3">
          <Button
            onClick={handleCheckStatus}
            disabled={checking}
            className="w-full bg-[#072E28] hover:bg-[#072E28]/90 text-white font-medium h-11 rounded-lg cursor-pointer"
          >
            {checking ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Checking...
              </>
            ) : (
              "Check verification status"
            )}
          </Button>

          <Button
            onClick={handleResend}
            disabled={resending || resendCountdown > 0}
            variant="outline"
            className="w-full h-11 rounded-lg border-[#E5E7EB] text-brand-dark font-medium cursor-pointer flex items-center justify-center gap-2"
          >
            {resending ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <RefreshCw size={15} />
            )}
            {resendCountdown > 0
              ? `Resend in ${resendCountdown}s`
              : "Resend verification email"}
          </Button>
        </div>

        {/* Tip */}
        <p className="text-xs text-[#9CA3AF] font-geist">
          Don&apos;t see it? Check your spam or junk folder. The link expires in 24 hours.
        </p>
      </div>

      {/* Try different method */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() =>
            router.push(
              `/domain/${domainId}/verify?token=${encodeURIComponent(tokenFromUrl)}`
            )
          }
          className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors font-geist"
        >
          ← Try a different verification method
        </button>
      </div>
    </div>
  );
}
