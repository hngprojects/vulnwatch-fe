import { useRouter } from 'next/navigation';
import type { Domain } from '@/features/domain/types/domain.types';
import type { ScanHistoryItem } from '@/features/scans/services/scan.service';
import type {
  DashboardSummary,
  DashboardDomainRow,
  DashboardAlert,
} from '@/features/dashboard/types/dashboard-api.types';

import { MonitoringStatusBanner } from '@/features/dashboard/components/monitoring/MonitoringStatusBanner';
import { DashboardStatCards } from '@/features/dashboard/components/monitoring/DashboardStatCards';
import { SecurityScoreTrend } from '@/features/dashboard/components/monitoring/SecurityScoreTrend';
import { RiskSeverityBreakdown } from '@/features/dashboard/components/monitoring/RiskSeverityBreakdown';
import { SslCertificatesList, SslCertItem } from '@/features/dashboard/components/monitoring/SslCertificatesList';
import { DashboardRecentAlerts, DashboardAlertItem } from '@/features/dashboard/components/monitoring/DashboardRecentAlerts';
import { MonitoredDomains, MonitoredDomainCard } from '@/features/dashboard/components/monitoring/MonitoredDomains';
import { RecentActivity } from '@/features/dashboard/components/monitoring/RecentActivity';
import { DomainSelector } from '@/features/dashboard/components/DomainSelector';
import { RecentScans } from '@/features/dashboard/components/RecentScans';
import { ScanLine } from 'lucide-react';

// ── Mapping helpers ────────────────────────────────────────────────────────────

function sslDaysToStatus(days: number | null): SslCertItem['status'] {
  if (days === null || days <= 0) return 'Expired';
  if (days <= 30) return 'ExpiringSoon';
  return 'Valid';
}

function sslDaysToSubtitle(days: number | null): string {
  if (days === null || days <= 0) return 'Certificate expired';
  if (days <= 30) return `Expires in ${days} days`;
  return `Valid for ${days} days`;
}

function domainRowToSslItem(row: DashboardDomainRow): SslCertItem {
  return {
    domain: row.domainName,
    subtitle: sslDaysToSubtitle(row.sslDaysRemaining),
    status: sslDaysToStatus(row.sslDaysRemaining),
  };
}

function domainRowToCard(row: DashboardDomainRow): MonitoredDomainCard {
  let monitoringStatus: MonitoredDomainCard['monitoringStatus'] = 'Inactive';
  if (row.monitoringEnabled) {
    monitoringStatus = row.criticalFindings > 0 ? 'Warning' : 'Active';
  }

  let sslStatus: MonitoredDomainCard['sslStatus'] = 'Valid';
  if (row.sslDaysRemaining === null || row.sslDaysRemaining <= 0) {
    sslStatus = 'Expired';
  } else if (row.sslDaysRemaining <= 30) {
    sslStatus = 'Expiring Soon';
  }

  return {
    domainId: row.domainId,
    domainName: row.domainName,
    monitoringStatus,
    securityScore: row.securityScore,
    sslStatus,
  };
}

function formatTimeAgo(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr !== 1 ? 's' : ''} ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
}

function apiAlertToItem(alert: DashboardAlert): DashboardAlertItem {
  const typeMap: Record<string, string> = {
    SslExpiry: 'SSL',
    SecurityFinding: 'Security',
    DnsChange: 'DNS',
    VerificationFailed: 'Verification',
  };
  return {
    id: alert.alertId,
    type: typeMap[alert.type] ?? alert.type,
    timeAgo: formatTimeAgo(alert.createdAt),
    title: alert.subject,
    domain: alert.domainName,
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

interface FilledDashboardProps {
  summary: DashboardSummary | null | undefined;
  domainRows: DashboardDomainRow[];
  totalDomainsCount: number;
  alerts: DashboardAlert[];
  
  // Scans context
  domainsForSelector: Domain[];
  selectedDomain: Domain;
  onDomainChange: (domain: Domain) => void;
  scans: ScanHistoryItem[];
  pagination: { currentPage: number; totalPages: number };
  onPageChange: (page: number) => void;
}

export function FilledDashboard({
  summary,
  domainRows,
  totalDomainsCount,
  alerts,
  domainsForSelector,
  selectedDomain,
  onDomainChange,
  scans,
  pagination,
  onPageChange,
}: FilledDashboardProps) {
  const router = useRouter();

  const isMonitoringActive = (summary?.monitoringActiveDomains ?? 0) > 0;
  const lastScanText = summary?.mostRecentScan
    ? formatTimeAgo(summary.mostRecentScan.completedAt)
    : '—';

  const sslItems: SslCertItem[] = domainRows.map(domainRowToSslItem);
  const domainCards: MonitoredDomainCard[] = domainRows.map(domainRowToCard);

  const sslExpiringSoon = domainRows.filter(
    (d) => d.sslDaysRemaining !== null && d.sslDaysRemaining <= 30,
  ).length;

  const allVerified =
    summary != null &&
    summary.totalDomains > 0 &&
    summary.verifiedDomains === summary.totalDomains;

  const alertItems: DashboardAlertItem[] = alerts.map(apiAlertToItem);

  return (
    <div className="flex flex-col gap-6 p-8 min-h-screen" style={{ background: '#F9F9F9' }}>
      
      {/* ── Global Monitoring Header ────────────────────────────────────────── */}
      <MonitoringStatusBanner
        isActive={isMonitoringActive}
        statusText={isMonitoringActive ? 'All systems operational' : 'Monitoring inactive'}
        lastScanText={lastScanText}
      />

      <DashboardStatCards
        securityScore={summary?.avgSecurityScore ?? 0}
        scoreTrend="from last week"
        totalIssues={summary?.totalOpenFindings ?? 0}
        criticalCount={summary?.totalCriticalFindings ?? 0}
        highCount={0}
        sslCount={domainRows.length}
        sslExpiringSoon={sslExpiringSoon}
        monitoredDomains={summary?.monitoringActiveDomains ?? 0}
        allVerified={allVerified}
      />

      <div className="flex flex-row gap-6 items-stretch">
        <div className="flex-1 min-w-0">
          <SecurityScoreTrend />
        </div>
        <div className="flex-1 min-w-0">
          <RiskSeverityBreakdown />
        </div>
      </div>

      <MonitoredDomains
        domains={domainCards}
        onAddDomain={() => router.push('/domain')}
      />

      <div className="flex flex-row gap-6 items-stretch">
        <div className="flex-1 min-w-0">
          <SslCertificatesList items={sslItems} totalCount={totalDomainsCount} />
        </div>
        <div className="flex-1 min-w-0">
          <DashboardRecentAlerts alerts={alertItems} onViewAll={() => router.push('/report')} />
        </div>
      </div>

      <RecentActivity />

      {/* ── Per-Domain Scans Section ───────────────────────────────────────── */}
      <div className="mt-8 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#111827]">Domain Scans</h2>
            <p className="text-sm text-[#6B7280] mt-0.5">Recent scan history for your domains</p>
          </div>
          <button
            onClick={() => router.push(`/scan?domainId=${encodeURIComponent(selectedDomain.id)}&domainName=${encodeURIComponent(selectedDomain.domain)}`)}
            className="hidden md:inline-flex items-center gap-2 h-10 px-4 bg-[#072E28] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity shrink-0"
          >
            <ScanLine className="h-4 w-4" />
            <span className="hidden sm:inline">Run New Scan</span>
          </button>
        </div>

        <div className="flex w-full md:w-80">
          <DomainSelector
            domains={domainsForSelector}
            selected={selectedDomain}
            onChange={onDomainChange}
          />
        </div>

        <RecentScans 
          scans={scans} 
          domainName={selectedDomain.domain} 
          pagination={pagination}
          onPageChange={onPageChange}
        />
      </div>

    </div>
  );
}
