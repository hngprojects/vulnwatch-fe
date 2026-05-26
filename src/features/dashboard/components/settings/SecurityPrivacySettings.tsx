"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import Image from "next/image";
import GoogleLogo from "@/features/auth/components/icons/google-logo";
import { profileService } from "../../services/profile.service";
import { useAuthStore } from "@/store/auth.store";

type ActionType = "button" | "status";

type SecurityRowProps = {
  title: string;
  description: string;
  actionLabel: string;
  actionType?: ActionType;
  onAction?: () => void;
};

const SecurityRow = ({
  title,
  description,
  actionLabel,
  actionType = "button",
  onAction,
}: SecurityRowProps) => (
  <div className="flex flex-col gap-4 border-b border-[#E5E7EB] py-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="min-w-0">
      <p className="text-[16px] font-semibold text-[#2B2B2B] sm:text-[17px]">{title}</p>
      <p className="mt-1 text-[14px] leading-6 text-[#666666] sm:text-[16px]">{description}</p>
    </div>

    {actionType === "button" ? (
      <button
        type="button"
        onClick={onAction}
        className="w-full cursor-pointer rounded-lg border border-[#072E28] px-4 py-3 text-sm font-semibold text-[#072E28] transition-colors hover:bg-[#F5FAF8] sm:w-auto sm:min-w-[180px] sm:text-[16px]"
      >
        {actionLabel}
      </button>
    ) : (
      <span className="text-sm font-medium text-[#666666] sm:text-[15px]">{actionLabel}</span>
    )}
  </div>
);

const getBrowserLabel = () => {
  if (typeof navigator === "undefined") return "Current browser";

  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes("edg")) return "Microsoft Edge";
  if (userAgent.includes("opr") || userAgent.includes("opera")) return "Opera";
  if (userAgent.includes("chrome")) return "Google Chrome";
  if (userAgent.includes("safari")) return "Safari";
  if (userAgent.includes("firefox")) return "Firefox";

  return "Current browser";
};

const isChromeBrowser = () => {
  if (typeof navigator === "undefined") return false;
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes("chrome") && !userAgent.includes("edg");
};

const SecurityPrivacySettings = () => {
  const router = useRouter();
  const authEmail = useAuthStore.getState().email ?? "";
  const [email, setEmail] = useState(authEmail);
  const [hasGoogleLinked, setHasGoogleLinked] = useState(false);
  const browserLabel = useMemo(() => getBrowserLabel(), []);
  const isChrome = useMemo(() => isChromeBrowser(), []);

  useEffect(() => {
    profileService
      .getProfile()
      .then((profile) => {
        setEmail(profile.email ?? authEmail);
        setHasGoogleLinked(profile.hasGoogleLinked);
      })
      .catch(() => {
        setEmail(authEmail);
      });
  }, [authEmail]);

  const linkedAccountLabel = useMemo(
    () => (hasGoogleLinked ? "Google" : "Email login"),
    [hasGoogleLinked]
  );

  const handleSignOut = () => {
    useAuthStore.getState().logout();
    router.push("/login");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
        <h2 className="text-xl font-semibold text-[#2B2B2B]">Basic Security Setup</h2>
        <p className="text-[14px] leading-6 text-[#666666] sm:text-[16px]">
          Manage all permissions and policies.
        </p>

        <div className="mt-5">
          <SecurityRow
            title="Email Address"
            description={email || "No email available"}
            actionLabel="Coming soon"
            actionType="status"
          />

          <SecurityRow
            title="Password"
            description="Manage your password and login alerts."
            actionLabel="Change password"
            onAction={() => router.push("/settings/security")}
          />

          <SecurityRow
            title="Two-Factor Authentication"
            description="Adds an extra layer of protection to your account during login."
            actionLabel="Coming soon"
            actionType="status"
          />

          <SecurityRow
            title="Account Recovery"
            description="Set up recovery options so you can always regain access to your account."
            actionLabel="Coming soon"
            actionType="status"
          />

          <div className="border-b border-[#E5E7EB] py-4">
            <p className="text-[16px] font-semibold text-[#2B2B2B] sm:text-[17px]">Linked Account</p>
            <div className="mt-2 flex items-center gap-2 text-[14px] text-[#666666] sm:text-[16px]">
              {hasGoogleLinked ? (
                <>
                  <GoogleLogo />
                  <span>{linkedAccountLabel}</span>
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 text-[#666666]" />
                  <span>{linkedAccountLabel}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
        <div className="flex flex-col gap-2 border-b border-[#E5E7EB] pb-4">
          <h2 className="text-xl font-semibold text-[#2B2B2B]">Session</h2>
        </div>

        <div className="pt-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {isChrome ? (
                  <Image
                    src="/images/google.jpg"
                    alt="Google Chrome"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                ) : null}
                <p className="text-[16px] font-semibold text-[#2B2B2B] sm:text-[17px]">
                  {isChrome ? "Google Chrome" : browserLabel}
                </p>
              </div>
              <p className="mt-1 text-[14px] leading-6 text-[#2563EB] sm:text-[16px]">
                Current session
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="w-full cursor-pointer rounded-lg border border-[#072E28] px-4 py-3 text-sm font-semibold text-[#072E28] transition-colors hover:bg-[#F5FAF8] sm:w-auto sm:min-w-[160px] sm:text-[16px]"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPrivacySettings;
