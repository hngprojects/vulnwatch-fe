"use client";

import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { getSafeReturnUrl } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

interface SocialAuthButtonProps {
  text?: string;
}

type AccessTokenPayload = {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string;
};

type GoogleIdTokenPayload = {
  picture?: string;
};

export function SocialAuthButton({
  text = "Sign up with Google",
}: SocialAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(300);
  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const updateWidth = () => {
      // Calculate a reasonable width: either the container width or a fixed max
      const width = Math.min(window.innerWidth - 64, 400); 
      setButtonWidth(width);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    if (!credentialResponse.credential) {
      toast.error("Google login failed. No credential received.");
      return;
    }

    try {
      setIsLoading(true);

      const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "";
      const response = await fetch(`${apiBase}/api/Auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: credentialResponse.credential }),
      });

      const data = await response.json();
      if (data.isSuccess && data.value.accessToken) {
        const successMessage = data.message ?? "Google login successful!";
        toast.success(successMessage);
        
        // Decode tokens to get picture and email
        let picture = "";
        let email: string | null = null;
        try {
          const googlePayload = jwtDecode<GoogleIdTokenPayload>(
            credentialResponse.credential
          );
          picture = googlePayload.picture ?? "";
        } catch (e) {
          console.error("Failed to decode Google token:", e);
        }

        try {
          const accessPayload = jwtDecode<AccessTokenPayload>(
            data.value.accessToken
          );
          email =
            accessPayload[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ] ?? null;
        } catch (e) {
          console.error("Failed to decode access token:", e);
        }

        useAuthStore.getState().login(data.value.accessToken, email, picture);
        const returnUrl = searchParams.get("returnUrl");
        router.push(getSafeReturnUrl(returnUrl));
      } else {
        toast.error(data.message || "Backend rejected token");
        console.error("Backend rejected token:", data);
      }
    } catch (error) {
      toast.error("Google login failed. Please try again.");
      console.error("Google login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`google-auth-wrapper flex w-full justify-center transition-opacity ${isLoading ? "pointer-events-none opacity-50" : ""}`}
    >
      <style>{`
        .google-auth-wrapper div[role=button],
        .google-auth-wrapper iframe {
          border-radius: 8px !important;
        }
        .google-auth-wrapper div[role=button]:focus,
        .google-auth-wrapper div[role=button]:focus-visible,
        .google-auth-wrapper div[role=button]:active,
        .google-auth-wrapper iframe:focus,
        .google-auth-wrapper iframe:focus-visible,
        .google-auth-wrapper iframe:active {
          box-shadow: none !important;
          outline: none !important;
        }
      `}</style>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => toast.error("Google Login Failed")}
        useOneTap={false}
        auto_select={false}
        itp_support={false}
        theme="outline"
        size="large"
        width={buttonWidth}
        text={text === "Sign up with Google" ? "signup_with" : "signin_with"}
        shape="rectangular"
      />
    </div>
  );
}
