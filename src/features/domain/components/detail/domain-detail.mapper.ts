import type {
  MonitoringDomain,
  MonitoringSettings as ApiMonitoringSettings,
  MonitoringAlert,
} from "@/features/monitoring/types/monitoring.types";
import type { Domain } from "../../types/domain.types";
import type {
  DomainDetailData,
  ActivityEvent,
  RiskLevel,
  MonitoringSettings,
  SecurityAlert,
} from "./domain-detail.types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toRiskLevel(raw: string | null | undefined): RiskLevel {
  const s = (raw ?? "").toLowerCase();
  if (s === "safe") return "safe";
  if (s === "moderate" || s === "medium" || s === "low") return "moderate";
  if (s === "critical" || s === "high") return "critical";
  return "unknown";
}

function formatRelativeTime(iso: string | null): string {
  if (!iso) return "Unknown";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "Unknown";

  const diff = Math.max(0, Date.now() - d.getTime());
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} minutes ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours === 1 ? "1 hour" : `${hours} hours`} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDate(iso: string | null): string {
  if (!iso) return "Unknown";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Map monitoring alerts → UI SecurityAlert list */
function buildAlerts(alerts: MonitoringAlert[]): SecurityAlert[] {
  return alerts.map((a) => ({
    alertId: a.alertId,
    type: a.type,
    severity: a.severity as SecurityAlert["severity"],
    subject: a.subject,
    createdAt: a.createdAt,
  }));
}

/** Map API sslAlertThresholds (number[]) → UI string[] (e.g. "30 Days") */
function formatSslThresholds(thresholds: number[]): string[] {
  return thresholds.map((n) => `${n} Days`);
}

// ---------------------------------------------------------------------------
// Synthesized Timeline Activity
// ---------------------------------------------------------------------------

function synthesizeActivity(
  baseDomain: Domain,
  monitoring: MonitoringDomain,
  settings: ApiMonitoringSettings,
): ActivityEvent[] {
  const events: ActivityEvent[] = [];
  let idCounter = 1;

  // 1. Scan Completed (Newest)
  if (monitoring.latestScan?.status === "Completed") {
    const counts = monitoring.findingCounts;
    const totalFindings =
      (counts?.critical ?? 0) +
      (counts?.high ?? 0) +
      (counts?.medium ?? 0) +
      (counts?.low ?? 0);

    let detailText = "All endpoints checked. No new vulnerabilities detected.";
    if (totalFindings > 0) {
      const parts = [];
      if (counts?.critical) parts.push(`${counts.critical} critical`);
      if (counts?.high) parts.push(`${counts.high} high`);
      if (counts?.medium) parts.push(`${counts.medium} medium`);
      if (counts?.low) parts.push(`${counts.low} low`);
      detailText = `${parts.join(", ")} vulnerabilities identified.`;
    }

    events.push({
      id: idCounter++,
      iconType: "scan",
      title: "Scan Completed",
      detail: detailText,
      time: formatRelativeTime(monitoring.latestScan.completedAt),
      colorVariant: totalFindings > 0 ? "amber" : "green",
    });
  }

  // 2. SSL Certificate Checked
  if (monitoring.ssl?.hasCertificate) {
    const expiresText =
      monitoring.ssl.daysRemaining !== null
        ? ` Expires in ${monitoring.ssl.daysRemaining} days.`
        : "";

    events.push({
      id: idCounter++,
      iconType: "ssl",
      title: "SSL Certificate Checked",
      detail: `Certificate valid.${expiresText}`,
      time: settings.lastMonitoredAt
        ? formatRelativeTime(settings.lastMonitoredAt)
        : "Recently",
      colorVariant: "blue",
    });
  }

  // 3. Domain Added (Oldest)
  if (baseDomain.createdAt) {
    events.push({
      id: idCounter++,
      iconType: "domain",
      title: "Domain Added",
      detail: "Domain verified and monitoring activated.",
      time: formatDate(baseDomain.createdAt),
      colorVariant: "slate",
    });
  }

  return events;
}

// ---------------------------------------------------------------------------
// Main mapper
// ---------------------------------------------------------------------------

/**
 * Maps the monitoring API responses into the DomainDetailData shape
 * consumed by DomainDetailPage.
 */
export function mapToDomainDetailData(
  baseDomain: Domain,
  monitoring: MonitoringDomain,
  settings: ApiMonitoringSettings,
): DomainDetailData {
  const activity = synthesizeActivity(baseDomain, monitoring, settings);

  const monitoringSettings: MonitoringSettings = {
    scanFrequency: settings.scanFrequency,
    sslAlertThresholds: formatSslThresholds(settings.sslAlertThresholds ?? []),
    emailAlerts: settings.notificationChannels?.includes("Email") ?? false,
    slackAlerts: settings.notificationChannels?.includes("Slack") ?? false,
  };

  return {
    domainName: monitoring.domainName,
    domainStatus: monitoring.verificationStatus as DomainDetailData["domainStatus"],
    monitoringActive: settings.monitoringEnabled,
    securityScore: monitoring.securityScore,
    riskLevel: toRiskLevel(monitoring.riskLevel),
    vulnerabilityBreakdown: {
      critical: monitoring.findingCounts?.critical ?? 0,
      high: monitoring.findingCounts?.high ?? 0,
      medium: monitoring.findingCounts?.medium ?? 0,
      low: monitoring.findingCounts?.low ?? 0,
    },
    ssl: {
      isValid: monitoring.ssl?.hasCertificate ?? false,
      expiresInDays: monitoring.ssl?.daysRemaining ?? null,
    },
    nextScanIn: settings.nextScanIn ?? null,
    lastMonitoredAt: settings.lastMonitoredAt
      ? formatRelativeTime(settings.lastMonitoredAt)
      : null,
    recentActivity: activity,
    monitoringSettings,
    recentAlerts: buildAlerts(monitoring.recentAlerts ?? []),
    tokenExpiringSoon: monitoring.ownership?.tokenExpiringSoon ?? false,
  };
}
