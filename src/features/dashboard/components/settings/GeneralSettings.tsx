"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { useProfile } from "../../hooks/useProfile";
import { profileService } from "../../services/profile.service";
import DeleteAccountSection from "./DeleteAccountSection";
import EditProfileModal from "./EditProfileModal";
import PersonalInfoCard from "./PersonalInfoCard";
import SettingsErrorState from "./SettingsErrorState";
import SettingsSectionSkeleton from "./SettingsSectionSkeleton";
import { type ProfileForm } from "./types";

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
      <h2 className="text-xl font-semibold text-[#2B2B2B]">{title}</h2>
      <p className="text-[14px] leading-6 text-[#666666] sm:text-[16px]">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
  checkmark = false,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  checkmark?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex h-10 w-full items-center justify-between gap-3 rounded-lg border border-[#CCCCCC] bg-white px-3 text-left text-sm text-[#2B2B2B] transition hover:border-primary"
      aria-pressed={checked}
    >
      <span>{label}</span>
      <span
        className={`flex h-6 w-10 shrink-0 items-center rounded-full p-0.5 transition ${checked ? "bg-primary" : "bg-[#E5E7EB]"
          }`}
      >
        {checkmark ? (
          <span
            className={`grid h-5 w-5 place-items-center rounded-md transition ${checked
              ? "translate-x-4 bg-primary text-white"
              : "translate-x-0 bg-white text-transparent"
              }`}
          >
            <Check className="h-3.5 w-3.5" />
          </span>
        ) : (
          <span
            className={`h-5 w-5 rounded-full bg-white transition ${checked ? "translate-x-4" : "translate-x-0"
              }`}
          />
        )}
      </span>
    </button>
  );
}

const GeneralSettings = () => {
  const router = useRouter();
  const { profile, loading, error, refetch, update } = useProfile();

  if (loading) return <SettingsSectionSkeleton label="Loading profile..." />;

  if (error) {
    return <SettingsErrorState message={error} onRetry={() => void refetch()} />;
  }

  if (!profile) {
    return <SettingsErrorState message="Profile data is unavailable." onRetry={() => void refetch()} />;
  }

  return (
    <GeneralSettingsContent
      key={profile.updatedAt}
      profile={profile}
      router={router}
      update={update}
    />
  );
};

const GeneralSettingsContent = ({
  profile,
  router,
  update,
}: {
  profile: NonNullable<ReturnType<typeof useProfile>["profile"]>;
  router: ReturnType<typeof useRouter>;
  update: ReturnType<typeof useProfile>["update"];
}) => {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(
    profile.notificationPreferences?.emailAlerts ?? false
  );
  const [slackNotifications, setSlackNotifications] = useState(
    profile.notificationPreferences?.slackAlerts ?? false
  );
  const [pushNotifications, setPushNotifications] = useState(
    profile.notificationPreferences?.pushNotifications ?? false
  );

  const initialForm = {
    firstName: profile.firstName ?? "",
    lastName: profile.lastName ?? "",
    email: profile.email ?? "",
  };

  const [form, setForm] = useState<ProfileForm>(initialForm);

  const isDirty = useMemo(() => {
    return (
      form.firstName !== initialForm.firstName ||
      form.lastName !== initialForm.lastName ||
      form.email !== initialForm.email
    );
  }, [form, initialForm.email, initialForm.firstName, initialForm.lastName]);

  const handleOpenEditModal = () => {
    setForm(initialForm);
    setIsEditModalOpen(true);
  };

  const handleCancelEdit = () => {
    if (saving) return;

    setForm(initialForm);
    setIsEditModalOpen(false);
  };

  const handleSave = async () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      toast.error("First name and last name are required.");
      return;
    }

    setSaving(true);

    try {
      const updated = await update({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
      });

      setForm({
        firstName: updated.firstName ?? "",
        lastName: updated.lastName ?? "",
        email: updated.email ?? "",
      });

      const currentPicture = useAuthStore.getState().picture;
      useAuthStore.getState().updateProfile(
        updated.firstName,
        updated.lastName,
        updated.profilePictureUrl || currentPicture
      );
      toast.success("Profile updated successfully!");
      setIsEditModalOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await profileService.deleteProfile();
      toast.success("Account deleted.");
      useAuthStore.getState().logout();
      router.push("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete account.");
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="space-y-6">
      <PersonalInfoCard profile={initialForm} onEdit={handleOpenEditModal} />

      <Section
        title="Preferences"
        subtitle="Customize how VulnWatch works for you"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <Toggle
            label="Email Notifications"
            checked={emailNotifications}
            onChange={() => setEmailNotifications((value) => !value)}
          />
          <Toggle
            label="Slack Notifications"
            checked={slackNotifications}
            onChange={() => setSlackNotifications((value) => !value)}
          />
          <Toggle
            label="Push Notifications"
            checked={pushNotifications}
            onChange={() => setPushNotifications((value) => !value)}
          />
        </div>
      </Section>

      <EditProfileModal
        open={isEditModalOpen}
        form={form}
        saving={saving}
        isDirty={isDirty}
        onOpenChange={setIsEditModalOpen}
        onFormChange={setForm}
        onCancel={handleCancelEdit}
        onSave={handleSave}
      />

      <DeleteAccountSection
        deleting={deleting}
        showDeleteConfirm={showDeleteConfirm}
        onShowDeleteConfirm={setShowDeleteConfirm}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default GeneralSettings;
