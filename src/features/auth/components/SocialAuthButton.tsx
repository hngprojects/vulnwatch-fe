"use client";

import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

interface SocialAuthButtonProps {
  text?: string;
}

export function SocialAuthButton({
  text = "Sign up with Google",
}: SocialAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(300);
  const router = useRouter();

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

      const response = await fetch("/api/social/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: credentialResponse.credential }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        toast.success("Google login successful!");
        
        // Decode JWT to get picture
        let picture = "";
        try {
          const payload = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
          picture = payload.picture;
        } catch (e) {
          console.error("Failed to decode Google token:", e);
        }

        useAuthStore.getState().login(data.token, data.email, picture);
        router.push("/dashboard");
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
