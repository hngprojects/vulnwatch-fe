"use client";

import { useMemo, useState } from "react";
import { Mail } from "lucide-react";
import GoogleLogo from "@/features/auth/components/icons/google-logo";
import { useAuthStore } from "@/store/auth.store";
import { useProfile } from "../../hooks/useProfile";
import SettingsErrorState from "./SettingsErrorState";
import SettingsSectionSkeleton from "./SettingsSectionSkeleton";
import ChangePasswordModal from "./SecuritySettings";

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

const SecurityPrivacySettings = () => {
  const authEmail = useAuthStore((state) => state.email) ?? "";
  const { profile, loading, error, refetch } = useProfile();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const email = profile?.email ?? authEmail;
  const hasGoogleLinked = profile?.hasGoogleLinked ?? false;

  const linkedAccountLabel = useMemo(
    () => (hasGoogleLinked ? "Google" : "Email login"),
    [hasGoogleLinked]
  );

  if (loading) return <SettingsSectionSkeleton label="Loading security settings..." />;

  if (error) {
    return <SettingsErrorState message={error} onRetry={() => void refetch()} />;
  }

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
            description={
              hasGoogleLinked
                ? "This account uses Google sign-in, so password changes are managed by Google."
                : "Manage your password and login alerts."
            }
            actionLabel={hasGoogleLinked ? "Managed by Google" : "Change password"}
            actionType={hasGoogleLinked ? "status" : "button"}
            onAction={hasGoogleLinked ? undefined : () => setIsPasswordModalOpen(true)}
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

      <ChangePasswordModal
        open={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
      />
    </div>
  );
};

export default SecurityPrivacySettings;
