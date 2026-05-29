"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { MonitoringSettings as MonitoringSettingsType, ScanFrequency } from "./domain-detail.types";

const SSL_THRESHOLDS = ["30 Days", "14 Days", "7 Days", "3 Days"] as const;
const SCAN_FREQUENCIES: ScanFrequency[] = ["Hourly", "Daily", "Weekly"];

interface MonitoringSettingsProps {
  initialSettings: MonitoringSettingsType;
  onSave: (settings: MonitoringSettingsType) => void;
}

export function MonitoringSettings({ initialSettings, onSave }: MonitoringSettingsProps) {
  const [settings, setSettings] = useState<MonitoringSettingsType>(initialSettings);

  const toggleThreshold = (t: string) => {
    setSettings((prev) => ({
      ...prev,
      sslAlertThresholds: prev.sslAlertThresholds.includes(t)
        ? prev.sslAlertThresholds.filter((x) => x !== t)
        : [...prev.sslAlertThresholds, t],
    }));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 h-full">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-4 w-4 text-slate-400" />
        <h3 className="font-semibold text-slate-900 font-geist">
          Automated Monitoring Settings
        </h3>
      </div>

      <div className="space-y-6">
        {/* Scan Frequency */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">Scan Frequency</Label>
          <select
            value={settings.scanFrequency}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                scanFrequency: e.target.value as ScanFrequency,
              }))
            }
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors appearance-none cursor-pointer"
          >
            {SCAN_FREQUENCIES.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* SSL Alert Thresholds */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">SSL Alert Thresholds</Label>
          <p className="text-xs text-slate-400">Alert me when SSL expires within:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {SSL_THRESHOLDS.map((t) => {
              const active = settings.sslAlertThresholds.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleThreshold(t)}
                  className={[
                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
                    active
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-slate-600 border-gray-200 hover:border-slate-400",
                  ].join(" ")}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notification Channels */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">Notification Channels</Label>
          <div className="space-y-3 mt-1">
            {[
              {
                id: "email-alerts",
                key: "emailAlerts" as const,
                label: "Email Alerts",
                sub: "Receive scan results to your inbox",
              },
              {
                id: "slack-alerts",
                key: "slackAlerts" as const,
                label: "Slack Alerts",
                sub: "Send notifications to your Slack workspace",
              },
            ].map(({ id, key, label, sub }) => (
              <div
                key={id}
                className="flex items-center gap-3 p-3 bg-brand-bg border border-gray-200 rounded-lg"
              >
                <Checkbox
                  id={id}
                  checked={settings[key]}
                  onCheckedChange={(v) =>
                    setSettings((prev) => ({ ...prev, [key]: !!v }))
                  }
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <div>
                  <Label
                    htmlFor={id}
                    className="text-sm font-medium text-slate-900 cursor-pointer"
                  >
                    {label}
                  </Label>
                  <p className="text-xs text-slate-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          className="w-full bg-primary hover:bg-primary/90 text-white mt-2 font-semibold"
          onClick={() => onSave(settings)}
        >
          Save Settings
        </Button>
      </div>
    </div>
  );
}
