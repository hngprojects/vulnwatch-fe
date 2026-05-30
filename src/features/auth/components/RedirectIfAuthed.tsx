"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { getSafeReturnUrl } from "@/lib/utils";

type RedirectIfAuthedProps = {
  redirectTo?: string;
};

export function RedirectIfAuthed({
  redirectTo = "/dashboard",
}: RedirectIfAuthedProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token =
      useAuthStore.getState().token ?? localStorage.getItem("auth_token");

    if (token) {
      const returnUrl = searchParams.get("returnUrl");
      router.replace(getSafeReturnUrl(returnUrl, redirectTo));
    }
  }, [redirectTo, router, searchParams]);

  return null;
}
