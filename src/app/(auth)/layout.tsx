"use client";

import { Suspense } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RedirectIfAuthed } from "@/features/auth/components/RedirectIfAuthed";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) console.warn("Google Client ID is missing");

  return (
    <GoogleOAuthProvider clientId={clientId || ""}>
      <Suspense fallback={null}>
        <RedirectIfAuthed />
      </Suspense>
      {children}
    </GoogleOAuthProvider>
  );
}
