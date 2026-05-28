"use client";

import { Check, Globe2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import SettingsErrorState from "./SettingsErrorState";
import SettingsSectionSkeleton from "./SettingsSectionSkeleton";

const inputClass =
  "h-10 w-full rounded-lg border border-[#CCCCCC] bg-white px-3 text-sm text-[#2B2B2B] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";

const selectClass =
  "h-10 w-full rounded-lg border border-[#CCCCCC] bg-white px-3 text-sm text-[#2B2B2B] outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";

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
    <section className="bg-white px-4 py-7 sm:px-6 lg:px-8">
      <div className="max-w-6xl">
        <h2 className="text-2xl font-semibold text-[#2B2B2B]">{title}</h2>
        <p className="mt-2 text-sm sm:text-base text-[#666666]">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm sm:text-base text-[#2B2B2B]">
        {label}
      </span>
      {children}
    </label>
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
        className={`flex h-6 w-10 shrink-0 items-center rounded-full p-0.5 transition ${
          checked ? "bg-primary" : "bg-[#E5E7EB]"
        }`}
      >
        {checkmark ? (
          <span
            className={`grid h-5 w-5 place-items-center rounded-md transition ${
              checked
                ? "translate-x-4 bg-primary text-white"
                : "translate-x-0 bg-white text-transparent"
            }`}
          >
            <Check className="h-3.5 w-3.5" />
          </span>
        ) : (
          <span
            className={`h-5 w-5 rounded-full bg-white transition ${
              checked ? "translate-x-4" : "translate-x-0"
            }`}
          />
        )}
      </span>
    </button>
  );
}

function IconSelect({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Field label={label}>
      <div className="relative">
        <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
        {children}
      </div>
    </Field>
  );
}

const Session = () => {
  const { profile, loading, error, refetch } = useProfile();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [riskBadges, setRiskBadges] = useState(false);
  const [theme, setTheme] = useState<"Light" | "Dark">("Light");

  useEffect(() => {
    if (!profile) return;

    setEmailNotifications(profile.notificationPreferences.emailAlerts);
    setSlackNotifications(profile.notificationPreferences.slackAlerts);
    setPushNotifications(profile.notificationPreferences.pushNotifications);
  }, [profile]);

  if (loading) return <SettingsSectionSkeleton label="Loading preferences..." />;

  if (error) {
    return <SettingsErrorState message={error} onRetry={() => void refetch()} />;
  }

  return (
    <div className="space-y-4 lg:space-y-3">
      <Section
        title="Account Profile Info"
        subtitle="Your Personal and Organization Details"
      >
        <button
          type="button"
          className="mb-6 flex h-12 w-full max-w-[170px] items-center justify-center gap-3 rounded-lg bg-primary px-5 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
        >
          <Plus className="h-5 w-5" />
          Edit profile
        </button>

        <div className="space-y-5">
          <Field label="Name">
            <input className={inputClass} placeholder="Full name" />
          </Field>
          <Field label="Email Address">
            <input
              className={inputClass}
              type="email"
              placeholder="Email address"
            />
          </Field>
          <Field label="Organization">
            <input
              className={inputClass}
              placeholder="Organization name"
            />
          </Field>
        </div>
      </Section>

      <Section
        title="Preferences"
        subtitle="Customize how VulnWatch works for you"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_0.65fr_0.65fr]">
          <Field label="Default Dashboard View">
            <select className={selectClass} defaultValue="Overview">
              <option>Overview</option>
              <option>Assets</option>
              <option>Risk Summary</option>
            </select>
          </Field>

          <IconSelect label="Time zone">
            <select className={`${selectClass} pl-10`} defaultValue="Nigeria (UTC+1)">
              <option>Nigeria (UTC+1)</option>
              <option>UTC</option>
              <option>Eastern Time (UTC-5)</option>
            </select>
          </IconSelect>

          <IconSelect label="Language">
            <select className={`${selectClass} pl-10`} defaultValue="English">
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
            </select>
          </IconSelect>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
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

      <Section
        title="Appearances"
        subtitle="Customize how VulnWatch looks for you"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.5fr_0.7fr] lg:items-end">
          <div>
            <span className="mb-3 block text-sm sm:text-base text-[#2B2B2B]">
              Display Theme
            </span>
            <div className="overflow-hidden rounded-lg border border-[#CCCCCC] bg-white">
              {(["Light", "Dark"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTheme(option)}
                  className="flex h-12 w-full items-center justify-between border-b border-[#CCCCCC] px-4 text-left text-sm text-[#2B2B2B] last:border-b-0"
                  aria-pressed={theme === option}
                >
                  <span>{option}</span>
                  <span
                    className={`h-7 w-7 rounded-full border-2 ${
                      theme === option
                        ? "border-primary bg-white p-1"
                        : "border-primary bg-white"
                    }`}
                  >
                    {theme === option && (
                      <span className="block h-full w-full rounded-full bg-primary" />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Field label="Font Size">
            <select className={selectClass} defaultValue="Medium (default)">
              <option>Small</option>
              <option>Medium (default)</option>
              <option>Large</option>
            </select>
          </Field>

          <div>
            <span className="mb-2 block text-sm sm:text-base text-[#2B2B2B]">
              Show Risk Badges
            </span>
            <Toggle
              label="Show"
              checked={riskBadges}
              onChange={() => setRiskBadges((value) => !value)}
            />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Session;
