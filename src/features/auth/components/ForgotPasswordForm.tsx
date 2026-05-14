"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { toast } from "sonner";
import { authService } from "@/features/auth/services/auth.services";

import { forgotPasswordSchema } from "@/features/auth/schemas/auth.schema";
import type { ForgotPasswordFormData } from "@/types/auth.types";

import { AuthCard } from "./AuthCard";
import { AuthInput } from "./AuthInput";

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await authService.forgotPassword(data);

      if (response.isSuccess) {
        toast.success(
          response.value?.message || "Password reset link sent to your email!",
        );
      } else {
        toast.error(response.error?.message || "Failed to send reset link");
        setError("root", {
          message: response.error?.message || "Failed to send reset link",
        });
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
            Forgot Password
          </h1>
          <p className="font-geist max-w-[320px] text-center text-[14px] font-normal text-[#666666] sm:text-[15px]">
            Enter your secure corporate email to receive a password reset link.
          </p>
        </div>

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
            {...register("email")}
          />

          <div className="mt-2 flex flex-col gap-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary font-geist flex h-[44px] w-full items-center justify-center rounded-[8px] px-6 py-4 text-[16px] leading-[24px] font-medium tracking-[0.02em] text-[#FFFFFF] transiti
            >
              Send Reset Link
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
      </AuthCard>
    </div>
  );
}
