"use client";

import { useEffect, useState, useTransition } from "react";
import { Mail, ArrowRight, Loader2, MailCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { authService } from "@/features/auth/services/auth.services";
import { AuthCard } from "./AuthCard";

const COOLDOWN_SECONDS = 60;

export function RegisterVerifyEmail() {
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let isMounted = true;
    if (typeof window !== "undefined") {
      const storedEmail = window.sessionStorage.getItem("verify_email_address") || "";
      setTimeout(() => {
        if (isMounted) {
          setEmail(storedEmail);
        }
      }, 0);
    }
    return () => {
      isMounted = false;
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem("verify_email_address");
      }
    };
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = () => {
    if (!email) {
      toast.error("No email address provided.");
      return;
    }

    if (countdown > 0) return;

    startTransition(async () => {
      try {
        const response = await authService.resendVerification(email);

        if (response.isSuccess) {
          toast.success(
            response.value?.message || "Verification link sent to your email!",
          );
          setCountdown(COOLDOWN_SECONDS);
        } else {
          const errMsg = response.error?.message || "Failed to resend verification email.";
          toast.error(errMsg);
        }
      } catch {
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#FAFAFA] px-4 py-8 sm:px-6 lg:px-8">
      <AuthCard>
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-8 w-full flex items-center justify-center">
            <Link href="/">
              <Image
                src="/images/logo-auth.png"
                alt="VulnWatch AI Logo"
                width={260}
                height={105}
                className="h-auto w-56 object-contain"
                priority
              />
            </Link>
          </div>
          
          <h1 className="font-geist mb-2 text-center text-[24px] leading-tight font-semibold tracking-[0.5px] text-[#000000] sm:text-[28px]">
            Verify your email
          </h1>
          <p className="font-geist max-w-[480px] text-center text-[15px] font-normal text-[#666666] sm:text-[16px] leading-relaxed">
            We&apos;ve sent a secure verification link to your email address. Please click the link to verify your account.
          </p>
        </div>

        <div className="mx-auto my-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#E7E4D9] text-[#072E28]">
          <MailCheck className="h-10 w-10 animate-pulse" />
        </div>

        {email && (
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6C8D84] bg-[#FFFDEA] px-4 py-1.5 text-sm font-medium text-[#35564B]">
              <Mail className="h-4.5 w-4.5 text-[#35564B]" />
              <span className="font-geist select-all">{email}</span>
            </div>
          </div>
        )}

        <div className="mx-auto mt-6 max-w-[420px] rounded-lg border border-[#C9D8FF] bg-[#F3F7FF] px-4 py-3 text-left">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#5D87E1]" />
            <p className="font-geist text-xs sm:text-sm leading-relaxed text-[#4D6AC8]">
              Didn&apos;t receive it? Please check your spam or junk folder. The link will expire in 5 minutes.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/login"
            className="bg-primary font-geist flex h-[44px] w-full items-center justify-center gap-2 rounded-[8px] px-6 py-4 text-[16px] leading-[24px] font-medium tracking-[0.02em] text-[#FFFFFF] transition-opacity hover:opacity-90 active:scale-95"
          >
            Go to Login
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || isPending}
            className="font-geist flex h-[44px] w-full items-center justify-center gap-2 rounded-[8px] border border-[#E5E7EB] bg-white px-6 py-4 text-[16px] leading-[24px] font-medium text-[#666666] transition-colors hover:bg-gray-50 hover:text-black disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Resending...
              </>
            ) : countdown > 0 ? (
              `Resend email in ${countdown}s`
            ) : (
              "Resend email"
            )}
          </button>
        </div>
      </AuthCard>
    </div>
  );
}
