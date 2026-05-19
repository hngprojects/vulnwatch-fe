"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

type RedirectIfAuthedProps = {
  redirectTo?: string;
};

export function RedirectIfAuthed({
  redirectTo = "/dashboard",
}: RedirectIfAuthedProps) {
  const router = useRouter();

  useEffect(() => {
    const token =
      useAuthStore.getState().token ?? localStorage.getItem("auth_token");

    if (token) {
      router.replace(redirectTo);
    }
  }, [redirectTo, router]);

  return null;
}
