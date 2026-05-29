"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Loader2 } from "lucide-react";

import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/features/auth/services/auth.services";

import { loginSchema } from "@/features/auth/schemas/auth.schema";
import type { LoginFormData } from "@/types/auth.types";
import { useAuthStore } from "@/store/auth.store";

import { AuthCard } from "./AuthCard";
import { AuthInput } from "./AuthInput";
import { PasswordInput } from "./PasswordInput";
import { AuthDivider } from "./AuthDivider";
import { SocialAuthButton } from "./SocialAuthButton";

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authService.login(data);

      if (response.isSuccess && response.value) {
        const msg = (response.value as { message?: string }).message ?? "Successfully logged in!";
        toast.success(msg);
        useAuthStore
          .getState()
          .login(response.value.accessToken, data.email);
        router.push("/dashboard");
      } else {
        const isNotVerified =
          response.error?.code === "403" ||
          response.error?.message?.toLowerCase().includes("not been verified") ||
          response.error?.message?.toLowerCase().includes("not verified");

        if (isNotVerified) {
          toast.error(
            response.error?.message ||
              "Your account has not been verified. Redirecting to verification page...",
          );
          if (typeof window !== "undefined") {
            window.sessionStorage.setItem("verify_email_address", data.email);
          }
          router.push("/register/verify-email");
        } else {
          const errMsg = response.error?.message || "Login failed. Please check your credentials.";
          toast.error(errMsg);
          setError("root", { message: errMsg });
        }
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#FAFAFA] px-4 py-8 sm:px-6 lg:px-8">
      <AuthCard>
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4">
            <Link href="/">
              <Image
                src="/images/logo-auth.png"
                alt="VulnWatch AI Logo"
                width={240}
                height={69}
                className="h-auto w-[240px] object-contain"
                priority
              />
            </Link>
          </div>
          <p className="font-geist text-center text-[15px] font-normal text-[#666666] sm:text-[16px]">
            Eter yor credentials to access the secure enterprise dashboard.
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

          <div className="flex flex-col gap-1">
            <PasswordInput
              label="Password"
              placeholder="........"
              error={errors.password?.message}
              {...register("password")}
            />
            <div className="flex justify-end pt-1">
              <Link
                href="/forgot-password"
                className="font-geist text-[13px] font-medium text-[#666666] hover:text-[#C68A00] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary font-geist flex h-[44px] w-full items-center justify-center gap-2 rounded-[8px] px-6 py-4 text-[16px] leading-[24px] font-medium tracking-[0.02em] text-[#FFFFFF] transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="font-geist text-center text-[14px] leading-[24px] font-normal text-[#3D4947]">
              Already have an Account?{" "}
              <Link
                href="/register"
                className="font-medium text-[#8B6200] hover:underline"
              >
                Sign up
              </Link>
            </p>

            <AuthDivider />

            <SocialAuthButton text="Sign in with Google" />
          </div>
        </form>
      </AuthCard>
    </main>
  );
}