"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const clientId = "686601436024-nob7de7vekj0pnflm5uig3ehj1l9uipk.apps.googleusercontent.com";
  if (!clientId) console.warn("Google Client ID is missing");

  return (
    <GoogleOAuthProvider clientId={clientId || ""}>
      {children}
    </GoogleOAuthProvider>
  );
}
