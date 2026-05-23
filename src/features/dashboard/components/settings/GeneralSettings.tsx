"use client";

import { useEffect, useState } from "react";
import { Plus, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { profileService } from "../../services/profile.service";
import { useAuthStore } from "@/store/auth.store";

const GeneralSettings = () => {
  const router = useRouter();

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    profileService
      .getProfile()
      .then((profile) => {
        setForm({
          firstName: profile.firstName ?? "",
          lastName: profile.lastName ?? "",
          email: profile.email ?? "",
        });
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : "Failed to load profile.";
        toast.error(msg);
      })
      .finally(() => setLoadingProfile(false));
  }, []);

  const handleSave = async () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      toast.error("First name and last name are required.");
      return;
    }
    setSaving(true);
    try {
      await profileService.updateProfile({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
      });
      toast.success("Profile updated successfully!");
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

  if (loadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 size={24} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
        <h2 className="text-xl font-semibold text-[#2B2B2B]">Personal Information</h2>
        <p className="text-[16px] text-[#666666] mt-0.5">
          Update your personal details visible across the workspace.
        </p>

        {/* Avatar */}
        <div className="flex items-center gap-4 mt-5">
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-[#E5E7EB] flex items-center justify-center shrink-0 overflow-hidden">
            {form.firstName || form.lastName ? (
              <span className="text-2xl font-semibold text-[#6B7280]">
                {form.firstName.charAt(0).toUpperCase()}
                {form.lastName.charAt(0).toUpperCase()}
              </span>
            ) : (
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="40" cy="40" r="40" fill="#E5E7EB" />
                <circle cx="40" cy="30" r="13" fill="#9CA3AF" />
                <ellipse cx="40" cy="68" rx="22" ry="16" fill="#9CA3AF" />
              </svg>
            )}
          </div>
          <button
            onClick={() => toast.info("Profile picture upload coming soon.")}
            className="flex items-center gap-1.5 border border-[#E5E7EB] rounded-lg px-4 py-2 text-sm sm:text-[16px] font-semibold text-white transition-colors bg-primary cursor-pointer"
          >
            <Plus className="w-5 h-5 text-white" />
            Edit profile
          </button>
        </div>

        {/* Fields */}
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[16px] font-normal text-[#2B2B2B] mb-1.5">
                First Name
              </label>
              <input
                type="text"
                value={form.firstName}
                placeholder="First name"
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#2B2B2B] outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-[16px] font-normal text-[#2B2B2B] mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                value={form.lastName}
                placeholder="Last name"
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#2B2B2B] outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-[16px] font-normal text-[#2B2B2B] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              readOnly
              className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#2B2B2B] bg-[#F9FAFB] outline-none cursor-not-allowed"
            />
          </div>


        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() =>
              setForm((prev) => ({ ...prev, firstName: prev.firstName, lastName: prev.lastName }))
            }
            className="py-3 px-5 sm:px-10 text-sm sm:text-[16px] font-semibold text-[#666666] border border-[#EDEDED] rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="py-3 px-5 sm:px-10 text-sm sm:text-[16px] font-semibold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
          >
            {saving && <Loader2 size={15} className="animate-spin" />}
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>



      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-[#FECACA] p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-[#EF4444] shrink-0 mt-0.5" />
          <div>
            <h2 className="text-xl font-semibold text-[#2B2B2B]">Delete Account</h2>
            <p className="text-[16px] text-[#666666] mt-0.5">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-5">
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="py-2.5 px-6 text-sm font-semibold text-[#EF4444] border border-[#FECACA] rounded-lg hover:bg-[#FEF2F2] transition-colors cursor-pointer"
            >
              Delete my account
            </button>
          ) : (
            <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-4 space-y-3">
              <p className="text-sm font-medium text-[#EF4444]">
                Are you sure? This will permanently delete your account and cannot be reversed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="py-2.5 px-6 text-sm font-semibold text-white bg-[#EF4444] rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  {deleting && <Loader2 size={14} className="animate-spin" />}
                  {deleting ? "Deleting..." : "Yes, delete account"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                  className="py-2.5 px-6 text-sm font-semibold text-[#666666] border border-[#EDEDED] rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
