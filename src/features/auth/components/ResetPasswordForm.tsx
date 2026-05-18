"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, KeyRound, ArrowRight, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { resetPasswordSchema } from "@/features/auth/schemas/auth.schema";
import type { ResetPasswordFormData } from "@/types/auth.types";
import { authService } from "@/features/auth/services/auth.services";

import { AuthCard } from "./AuthCard";
import { AuthInput } from "./AuthInput";
import { PasswordInput } from "./PasswordInput";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [linkError, setLinkError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const email = searchParams.get("email") ?? "";
    const token = searchParams.get("token") ?? "";

    if (!email || !token) {
      setLinkError("Invalid reset link. Missing parameters.");
      return;
    }

    setValue("email", email);
    setValue("token", token);
  }, [searchParams, setValue]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const response = await authService.resetPassword({
        email: data.email,
        token: data.token,
        newPassword: data.newPassword,
      });

      if (response.isSuccess) {
        toast.success("Password reset successfully. Please log in.");
        router.push("/login");
      } else {
        toast.error(response.error?.message || "Reset password failed");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#FAFAFA] px-4 py-8 sm:px-6 lg:px-8">
      <AuthCard>
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4">
            <Image
              src="/images/logo-auth.png"
              alt="VulnWatch AI Logo"
              width={240}
              height={69}
              className="h-auto w-[240px] object-contain"
              priority
            />
          </div>
          <h1 className="font-geist mb-2 text-center text-[24px] leading-tight font-semibold tracking-[0.5px] text-[#000000] sm:text-[28px]">
            Reset Password
          </h1>
          <p className="font-geist max-w-[360px] text-center text-[14px] font-normal text-[#666666] sm:text-[15px]">
            Set a new secure password for your account.
          </p>
        </div>

        {linkError ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-medium text-red-500">{linkError}</p>
            <Link
              href="/forgot-password"
              className="font-geist flex items-center justify-center gap-2 text-[14px] font-medium text-[#666666] transition-colors hover:text-[#C68A00]"
            >
              Request a new link
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
            noValidate
          >
            <AuthInput
              label="Email"
              type="email"
              placeholder="analyst@company.com"
              icon={<Mail className="h-5 w-5" />}
              error={errors.email?.message}
              readOnly
              {...register("email")}
            />

            <input type="hidden" {...register("token")} />

            <PasswordInput
              label="New Password"
              placeholder="........"
              helperText="Use at least 12 characters, with numbers & symbols."
              error={errors.newPassword?.message}
              {...register("newPassword")}
            />

            <PasswordInput
              label="Confirm New Password"
              placeholder="........"
              helperText="Must match the new password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <div className="mt-2 flex flex-col gap-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary font-geist flex h-[44px] w-full items-center justify-center gap-2 rounded-[8px] px-6 py-4 text-[16px] leading-[24px] font-medium tracking-[0.02em] text-[#FFFFFF] transition-opacity hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>

              <Link
                href="/login"
                className="font-geist flex items-center justify-center gap-2 text-[14px] font-medium text-[#666666] transition-colors hover:text-[#C68A00]"
              >
                Back to Login
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </form>
        )}
      </AuthCard>
    </div>
  );
}
