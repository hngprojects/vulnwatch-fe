"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GeneralSettings from "./GeneralSettings";
import ComingSoon from "./ComingSoon";
import SecurityPrivacySettings from "./SecurityPrivacySettings";
import SecuritySettings from "./SecuritySettings";

type Tab = "general" | "security" | "session";

const TABS: { label: string; value: Tab }[] = [
  { label: "General", value: "general" },
  { label: "Security", value: "security" },
  { label: "Session Management", value: "session" },
];

type SettingsProps = {
  initialTab?: Tab;
  securityDetail?: boolean;
};

const Settings = ({ initialTab = "general", securityDetail = false }: SettingsProps) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);

    if (!securityDetail) return;

    if (tab === "security") {
      router.push("/settings/security");
      return;
    }

    router.push("/settings");
  };

  return (
    <div>
      <p className="text-[#2B2B2B] text-4xl font-semibold">Settings</p>

      <div className="mt-6 flex sm:gap-[30px]">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`pb-2 px-4 sm:px-10 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab.value
                ? "border-b-3 border-primary text-[#2B2B2B]"
                : "text-[#6B7280] hover:text-[#2B2B2B]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "security" && (securityDetail ? <SecuritySettings /> : <SecurityPrivacySettings />)}
        {activeTab === "session" && <ComingSoon title="Session Management" />}
      </div>
    </div>
  );
};

export default Settings;
