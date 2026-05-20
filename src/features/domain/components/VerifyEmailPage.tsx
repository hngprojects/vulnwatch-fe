"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { domainService } from "../services/domain.service";
import type { Domain } from "../types/domain.types";
import DomainVerificationStepper from "./DomainVerificationStepper";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

function getDefaultEmail(domainName: string) {
  if (!domainName) return "admin@company.io";
  return `admin@${domainName}`;
}

function formatSeconds(value: number) {
  return `${value}s`;
}

export default function VerifyEmailPage({ domainId }: { domainId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const emailParam = searchParams.get("email");
  const [domain, setDomain] = useState<Domain | null>(null);
  const [loading, setLoading] = useState(true);
  const [otp, setOtp] = useState<string[]>(() => Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    domainService
      .getDomain(domainId)
      .then(setDomain)
      .finally(() => setLoading(false));
  }, [domainId]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const verificationEmail = useMemo(() => {
    if (emailParam) return emailParam;
    return getDefaultEmail(domain?.domain ?? "");
  }, [domain?.domain, emailParam]);

  const codeValue = otp.join("");

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    setOtp((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    if (pastedDigits.length === 0) return;

    const next = Array(OTP_LENGTH).fill("");
    pastedDigits.forEach((digit, index) => {
      next[index] = digit;
    });
    setOtp(next);
    inputRefs.current[Math.min(pastedDigits.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = () => {
    if (codeValue.length < OTP_LENGTH) {
      toast.error("Enter the full 6-digit verification code.");
      return;
    }

    router.push(
      `/domain/${domainId}/verify/email/waiting?token=${encodeURIComponent(token)}&email=${encodeURIComponent(verificationEmail)}`,
    );
  };

  const handleResend = () => {
    if (countdown > 0) return;

    setCountdown(RESEND_SECONDS);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
    toast.success("Verification email resent.", {
      description: `A new code was sent to ${verificationEmail}.`,
    });
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
                state: "complete",
              },
              {
                number: 3,
                label: "Select Email",
                mobileLabel: "Select Email",
                state: "current",
              },
            ]}
          />
        </div>

        <div className="mb-6 flex">
          <button
            onClick={() =>
              router.push(`/domain/${domainId}/verify?token=${encodeURIComponent(token)}`)
            }
            className="flex items-center gap-1.5 text-sm text-[#6B7280] transition-colors hover:text-[#111827]"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-[620px] rounded-[22px] border border-[#E5E7EB] bg-white px-5 py-8 shadow-[0_14px_34px_rgba(15,23,42,0.06)] sm:px-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#A0E870] text-[#072E28] shadow-[0_8px_24px_rgba(160,232,112,0.35)]">
              <MailCheck size={36} />
            </div>

            <div className="mx-auto mt-6 max-w-[430px] text-center">
              <h1 className="text-[32px] font-semibold leading-tight text-[#2B2B2B]">
                We&apos;ve sent a verification link to
                <span className="block">{verificationEmail}</span>
              </h1>
              <p className="mt-4 text-base leading-7 text-[#7A7A7A]">
                Click the link in your email to verify, or enter the 6-digit OTP
                code below.
              </p>
            </div>

            <div className="mt-8 flex justify-center gap-2.5 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(event) => handleChange(index, event.target.value)}
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  onPaste={handlePaste}
                  aria-label={`OTP digit ${index + 1}`}
                  className="h-14 w-11 rounded-xl border border-[#E2E8F0] text-center text-[28px] font-semibold text-[#2B2B2B] outline-none transition-all focus:border-[#8EA0FF] focus:ring-2 focus:ring-[#8EA0FF]/25 sm:h-16 sm:w-12"
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0}
                className="text-sm font-medium text-[#A1A1AA] transition-colors enabled:text-[#466557] enabled:hover:text-[#072E28] disabled:cursor-default"
              >
                Resend email {countdown > 0 ? `(${formatSeconds(countdown)})` : ""}
              </button>
            </div>

            <div className="mx-auto mt-5 max-w-[440px]">
              <Button
                onClick={handleVerify}
                className="h-12 w-full rounded-xl bg-[#072E28] text-base font-semibold text-white hover:bg-[#072E28]/90"
              >
                Verify Code
              </Button>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() =>
                  router.push(`/domain/${domainId}/verify?token=${encodeURIComponent(token)}`)
                }
                className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#2B2B2B]"
              >
                Back to a different method
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
