"use client";

import { useState } from "react";
import GeneralSettings from "./GeneralSettings";
import SecuritySettings from "./SecuritySettings";
import SessionManagement from "./SessionManagement";

type Tab = "general" | "security" | "session";

const TABS: { label: string; value: Tab }[] = [
  { label: "General", value: "general" },
  { label: "Security", value: "security" },
  { label: "Session Management", value: "session" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState<Tab>("general");

  return (
    <div>
      <p className="text-[#2B2B2B] text-4xl font-semibold">Settings</p>

      <div className="mt-6 flex sm:gap-[30px]">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
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
        {activeTab === "general" && <div><GeneralSettings/></div>}
        {activeTab === "security" && <div><SecuritySettings/></div>}
        {activeTab === "session" && <div><SessionManagement/></div>}
      </div>
    </div>
  );
};

export default Settings;
