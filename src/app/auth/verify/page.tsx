"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { authService } from "@/features/auth/services/auth.services";
import { AuthCard } from "@/features/auth/components/AuthCard";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyAccount = async () => {
      const userId = searchParams.get("userId");
      const token = searchParams.get("token");

      if (!userId || !token) {
        setStatus("error");
        setMessage("Invalid verification link. Missing parameters.");
        return;
      }

      try {
        const response = await authService.verify(userId, token);

        if (response.isSuccess) {
          setStatus("success");
          setMessage(response.value?.message || "Email verified! Proceed to login.");
          // Optional: redirect after a few seconds
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(response.error?.message || "Failed to verify email. The link might be expired.");
        }
      } catch {
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again later.");
      }
    };

    verifyAccount();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#FAFAFA] px-4 py-8 sm:px-6 lg:px-8">
      <AuthCard>
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-auth.png"
                alt="VulnWatch AI Logo"
                className="h-auto w-[240px] object-contain"
              />
            </Link>
          </div>
          
          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            {status === "loading" && (
              <>
                <Loader2 className="h-12 w-12 animate-spin text-[#C68A00]" />
                <h2 className="text-xl font-semibold text-[#3D4947]">Verifying Account</h2>
                <p className="text-center text-[#666666]">{message}</p>
              </>
            )}

            {status === "success" && (
              <>
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <h2 className="text-xl font-semibold text-[#3D4947]">Verification Successful!</h2>
                <p className="text-center text-[#666666]">{message}</p>
                <Link
                  href="/login"
                  className="bg-primary mt-4 flex h-[44px] w-full items-center justify-center rounded-[8px] px-6 text-[16px] font-medium text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
                >
                  Go to Login
                </Link>
              </>
            )}

            {status === "error" && (
              <>
                <XCircle className="h-16 w-16 text-red-500" />
                <h2 className="text-xl font-semibold text-[#3D4947]">Verification Failed</h2>
                <p className="text-center text-red-500">{message}</p>
                <Link
                  href="/login"
                  className="mt-4 flex h-[44px] w-full items-center justify-center rounded-[8px] border border-[#C68A00] px-6 text-[16px] font-medium text-[#C68A00] transition-colors hover:bg-[#C68A00] hover:text-white"
                >
                  Back to Login
                </Link>
              </>
            )}
          </div>
        </div>
      </AuthCard>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen w-full items-center justify-center bg-[#FAFAFA]">
        <Loader2 className="h-8 w-8 animate-spin text-[#C68A00]" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
