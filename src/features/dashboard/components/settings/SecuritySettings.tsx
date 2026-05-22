import { privateApi } from "@/lib/axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import React, { useState } from "react";

const SecuritySettings = () => {
  const [loginAlert, setLoginAlert] = useState({
    sessionsAlert: true,
    suspiciousLoginAlerts: true,
    newDeviceAlerts: true,
  });

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.currentPassword || !form.newPassword || !form.currentPassword) {
      toast.error("All fields are required.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    if (form.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      // the /auth/change-password is a placeholder
      await privateApi.patch("/auth/change-password", {
        current_password: form.currentPassword,
        new_password: form.newPassword,
      });
      toast.success("Password updated successfully.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: unknown) {
      const message = isAxiosError(err) ? err.response?.data?.message : undefined;
      toast.error(message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
        <div>
          <p className="text-[#2B2B2B] font-semibold text-xl mb-2">
            Change Password
          </p>
          <span className="font-normal text-[16px] text-[#666666]">
            Use a strong password
          </span>
        </div>
        <div>
          <div>
            <label className="block text-[16px] font-normal text-[#2B2B2B] mt-3 mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#2B2B2B] outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-[16px] font-normal text-[#2B2B2B] mt-2 mb-1.5">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#2B2B2B] outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-[16px] font-normal text-[#2B2B2B] mt-2 mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#2B2B2B] outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="py-3 px-5 sm:px-10 text-sm sm:text-[16px] font-semibold text-[#666666] border border-[#EDEDED] rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="py-3 px-5 sm:px-10 text-sm sm:text-[16px] font-semibold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
            >
              {loading ? "Updating..." : "Update password"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
        <div>
          <p className="text-[#2B2B2B] font-semibold text-xl mb-2">Login</p>
          <span className="font-normal text-[16px] text-[#666666]">
            Get notify about unusual account activity
          </span>
        </div>

        <div className="flex items-center justify-between border border-[#E5E7EB] rounded-lg px-4 py-3 mt-5">
          <span className="text-[16px] font-normal text-[#2B2B2B]">
            Sessions Alert
          </span>
          <button
            role="switch"
            aria-checked={loginAlert.sessionsAlert}
            onClick={() =>
              setLoginAlert({
                ...loginAlert,
                sessionsAlert: !loginAlert.sessionsAlert,
              })
            }
            className={`relative w-10 h-6 rounded-full transition-colors ${
              loginAlert.sessionsAlert ? "bg-primary" : "bg-[#D1D5DB]"
            }`}
          >
            <span
              className={`absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                loginAlert.sessionsAlert ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between border border-[#E5E7EB] rounded-lg px-4 py-3 mt-5">
          <span className="text-[16px] font-normal text-[#2B2B2B]">
            Suspicious Login Alerts
          </span>
          <button
            role="switch"
            aria-checked={loginAlert.suspiciousLoginAlerts}
            onClick={() =>
              setLoginAlert({
                ...loginAlert,
                suspiciousLoginAlerts: !loginAlert.suspiciousLoginAlerts,
              })
            }
            className={`relative w-10 h-6 rounded-full transition-colors ${
              loginAlert.suspiciousLoginAlerts ? "bg-primary" : "bg-[#D1D5DB]"
            }`}
          >
            <span
              className={`absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                loginAlert.suspiciousLoginAlerts
                  ? "translate-x-5"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between border border-[#E5E7EB] rounded-lg px-4 py-3 mt-5">
          <span className="text-[16px] font-normal text-[#2B2B2B]">
            New Device Alerts
          </span>
          <button
            role="switch"
            aria-checked={loginAlert.newDeviceAlerts}
            onClick={() =>
              setLoginAlert({
                ...loginAlert,
                newDeviceAlerts: !loginAlert.newDeviceAlerts,
              })
            }
            className={`relative w-10 h-6 rounded-full transition-colors ${
              loginAlert.newDeviceAlerts ? "bg-primary" : "bg-[#D1D5DB]"
            }`}
          >
            <span
              className={`absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                loginAlert.newDeviceAlerts ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
