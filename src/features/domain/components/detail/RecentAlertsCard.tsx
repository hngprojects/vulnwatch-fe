"use client";

import { Bell, ShieldCheck, ShieldAlert, Lock, Wifi, Info } from "lucide-react";
import type { SecurityAlert } from "./domain-detail.types";

// ---------------------------------------------------------------------------
// Severity → visual config (matches brand design tokens in globals.css)
// ---------------------------------------------------------------------------
const SEVERITY_CONFIG: Record<
  string,
  { label: string; pill: string; text: string; dot: string }
> = {
  Info:     { label: "Info",     pill: "bg-brand-info-bg",           text: "text-brand-info",           dot: "bg-brand-info" },
  Low:      { label: "Low",      pill: "bg-brand-risk-low-bg",       text: "text-brand-risk-low",       dot: "bg-brand-risk-low" },
  Medium:   { label: "Medium",   pill: "bg-brand-pending-bg",        text: "text-brand-pending-text",   dot: "bg-brand-pending-text" },
  High:     { label: "High",     pill: "bg-brand-risk-high-bg",      text: "text-brand-risk-high",      dot: "bg-brand-risk-high" },
  Critical: { label: "Critical", pill: "bg-brand-risk-critical-bg",  text: "text-brand-risk-critical",  dot: "bg-brand-risk-critical" },
};

// ---------------------------------------------------------------------------
// Alert type → icon + label
// ---------------------------------------------------------------------------
const ALERT_TYPE_CONFIG: Record<
  string,
  { icon: React.ElementType; label: string }
> = {
  SslExpiry:       { icon: Lock,        label: "SSL Expiry" },
  SecurityFinding: { icon: ShieldAlert, label: "Security Finding" },
  DnsChange:       { icon: Wifi,        label: "DNS Change" },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface RecentAlertsCardProps {
  alerts: SecurityAlert[];
}

export function RecentAlertsCard({ alerts }: RecentAlertsCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-slate-400" />
          <h3 className="font-semibold text-slate-900 font-geist">
            Recent Security Alerts
          </h3>
          {alerts.length > 0 && (
            <span
              className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full text-xs font-bold text-white bg-primary"
            >
              {alerts.length}
            </span>
          )}
        </div>

        <button
          type="button"
          className="text-xs font-medium transition-opacity hover:opacity-70 text-primary"
        >
          View All Alerts →
        </button>
      </div>

      {/* Empty state */}
      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-2">
          <ShieldCheck className="h-8 w-8 text-slate-300" />
          <p className="text-sm text-slate-400">No recent alerts — all clear.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {alerts.map((alert) => {
            const sev =
              SEVERITY_CONFIG[alert.severity] ?? SEVERITY_CONFIG.Info;
            const typeInfo =
              ALERT_TYPE_CONFIG[alert.type] ?? { icon: Info, label: alert.type };
            const TypeIcon = typeInfo.icon;

            return (
              <div
                key={alert.alertId}
                className="flex items-start gap-4 py-3.5 group cursor-pointer"
              >
                {/* Icon with severity dot */}
                <div className="flex-shrink-0 relative mt-0.5">
                  <div
                    className={`h-9 w-9 rounded-full flex items-center justify-center ${sev.pill}`}
                  >
                    <TypeIcon className={`h-4 w-4 ${sev.text}`} />
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${sev.dot}`}
                  />
                </div>

                {/* Subject + meta */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 leading-snug group-hover:text-slate-900 transition-colors">
                    {alert.subject}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">
                      {typeInfo.label}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-400">
                      {formatRelativeTime(alert.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Severity pill */}
                <div className="flex-shrink-0 mt-0.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold font-geist ${sev.pill} ${sev.text}`}
                  >
                    {sev.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
