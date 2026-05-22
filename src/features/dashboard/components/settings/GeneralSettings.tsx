"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const GeneralSettings = () => {
  const [profile, setProfile] = useState({
    name: "Aisha Agboola",
    email: "mycompany31@gmail.com",
    organization: "Aishathenewbie Enterprises",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    weeklySummaryReport: true,
  });

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
        <h2 className="text-xl font-semibold text-[#2B2B2B]">
          Personal Information
        </h2>
        <p className="text-[16px] text-[#666666] mt-0.5">
          Update your personal details visible across the workspace.
        </p>

        {/* Avatar */}
        <div className="flex items-center gap-4 mt-5">
          <div className=" w-15 h-15 sm:w-25 sm:h-25 rounded-full bg-[#D9D9D9] flex items-center justify-center shrink-0">
          </div>
          <button className="flex items-center gap-1.5 border border-[#E5E7EB] rounded-lg px-4 py-2 text-sm sm:text-[16px] font-semibold text-white transition-colors bg-primary cursor-pointer">
            <Plus className="w-5 h-5 text-white" />
            Edit profile
          </button>
        </div>

        {/* Fields */}
        <div className="mt-5 space-y-4">
          <div>
            <label className="block text-[16px] font-normal text-[#2B2B2B] mb-1.5">
              Name
            </label>
            <input
              type="text"
              placeholder={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#2B2B2B] outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-[16px] font-normal text-[#2B2B2B] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#2B2B2B] outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-[16px] font-normal text-[#2B2B2B] mb-1.5">
              Organization
            </label>
            <input
              type="text"
              placeholder={profile.organization}
              onChange={(e) =>
                setProfile({ ...profile, organization: e.target.value })
              }
              className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#2B2B2B] outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="py-3 px-5 sm:px-10 text-sm sm:text-[16px] font-semibold text-[#666666] border border-[#EDEDED] rounded-lg transition-colors">
            Cancel
          </button>
          <button className="py-3 px-5 sm:px-10 text-sm sm:text-[16px] font-semiold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity">
            Save changes
          </button>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
        <h2 className="text-xl font-semibold text-[#2B2B2B]">Preferences</h2>
        <p className="text-[16px] text-[#666666] mt-0.5">
          Customize your experience.
        </p>

        <div className="mt-5 space-y-3">
          {/* Email Notifications toggle */}
          <div className="flex items-center justify-between border border-[#E5E7EB] rounded-lg px-4 py-3">
            <span className="text-sm text-[#2B2B2B]">Email Notifications</span>
            <button
              role="switch"
              aria-checked={preferences.emailNotifications}
              onClick={() =>
                setPreferences({
                  ...preferences,
                  emailNotifications: !preferences.emailNotifications,
                })
              }
              className={`relative w-10 h-6 rounded-full transition-colors ${
                preferences.emailNotifications ? "bg-primary" : "bg-[#D1D5DB]"
              }`}
            >
              <span
                className={`absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  preferences.emailNotifications
                    ? "translate-x-5"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Weekly Summary Report checkbox */}
          <div className="flex items-center justify-between border border-[#E5E7EB] rounded-lg px-4 py-3">
            <span className="text-sm text-[#2B2B2B]">
              Weekly Summary Report
            </span>
            <button
              role="checkbox"
              aria-checked={preferences.weeklySummaryReport}
              onClick={() =>
                setPreferences({
                  ...preferences,
                  weeklySummaryReport: !preferences.weeklySummaryReport,
                })
              }
              className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                preferences.weeklySummaryReport
                  ? "bg-primary border-primary"
                  : "bg-white border-[#D1D5DB]"
              }`}
            >
              {preferences.weeklySummaryReport && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="py-3 px-5 sm:px-10 text-sm sm:text-[16px] font-semiold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
