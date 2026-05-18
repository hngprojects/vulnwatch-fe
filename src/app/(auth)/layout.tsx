"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { RedirectIfAuthed } from "@/features/auth/components/RedirectIfAuthed";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const clientId =
    "686601436024-nob7de7vekj0pnflm5uig3ehj1l9uipk.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId || ""}>
      <RedirectIfAuthed />
      {children}
    </GoogleOAuthProvider>
  );
}