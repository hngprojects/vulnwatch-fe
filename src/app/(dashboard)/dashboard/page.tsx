'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { dashboardService } from '@/features/dashboard/services/dashboard.service';
import { domainService } from '@/features/domain/services/domain.service';
import type { Domain } from '@/features/domain/types/domain.types';

import { EmptyDashboard } from '@/features/dashboard/components/EmptyDashboard';
import { NoScansDashboard } from '@/features/dashboard/components/states/NoScansDashboard';
import { FilledDashboard } from '@/features/dashboard/components/states/FilledDashboard';

const SELECTED_DOMAIN_KEY = 'selected_dashboard_domain';

export default function DashboardController() {
  const router = useRouter();

  // ── State ───────────────────────────────────────────────────────────────
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(SELECTED_DOMAIN_KEY);
    }
    return null;
  });

  const handleDomainChange = (domain: Domain) => {
    setSelectedDomainId(domain.id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SELECTED_DOMAIN_KEY, domain.id);
    }
  };

  // ── 1. Fetch Verified Domains (For DomainSelector + Onboarding Check) ───
  const {
    data: allDomainsRes,
    isLoading: isDomainsLoading,
  } = useQuery({
    queryKey: ['domains'],
    queryFn: () => domainService.getDomains(),
  });

  const verifiedDomains = (allDomainsRes?.data ?? []).filter(
    (d) => d.status === 'Verified'
  );

  // Determine currently selected domain object
  const selectedDomain = verifiedDomains.find((d) => d.id === selectedDomainId) ?? verifiedDomains[0];

  // ── 2. Fetch Global Dashboard Stats (Banner, Stat Cards, SSL, Alerts) ───
  // We only fetch these if there is at least one verified domain.
  const { data: summaryRes } = useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: () => dashboardService.getDashboardSummary(),
    enabled: verifiedDomains.length > 0,
  });

  const { data: dashboardDomainsRes } = useQuery({
    queryKey: ['dashboard', 'domains'],
    queryFn: () => dashboardService.getDashboardDomains({ pageSize: 20 }),
    enabled: verifiedDomains.length > 0,
  });

  const { data: alertsRes } = useQuery({
    queryKey: ['dashboard', 'alerts'],
    queryFn: () => dashboardService.getDashboardAlerts({ limit: 5 }),
    enabled: verifiedDomains.length > 0,
  });

  const hasScans = selectedDomain && selectedDomain.lastScannedAt !== null;

  // ── Routing Logic ───────────────────────────────────────────────────────

  if (isDomainsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-[#072E28]" />
        <p className="text-sm text-[#6B7280] font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  // State 1: No Verified Domains
  if (verifiedDomains.length === 0) {
    return (
      <div className="px-4 md:px-6 py-6">
        <EmptyDashboard />
      </div>
    );
  }

  // State 2: Domain Exists, but never scanned
  if (!hasScans) {
    return (
      <NoScansDashboard
        domainsForSelector={verifiedDomains}
        selectedDomain={selectedDomain}
        onDomainChange={handleDomainChange}
      />
    );
  }

  // State 3: Filled Dashboard (Scans Exist)
  return (
    <FilledDashboard
      // Global Data
      summary={summaryRes}
      domainRows={dashboardDomainsRes?.data ?? []}
      totalDomainsCount={dashboardDomainsRes?.totalCount ?? 0}
      alerts={alertsRes ?? []}
      
      onAddDomain={() => router.push('/domain?add=true')}
    />
  );
}
