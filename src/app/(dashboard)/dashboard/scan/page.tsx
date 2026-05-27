'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { ScanLine, Loader2 } from 'lucide-react';
import { DomainSelector } from '@/features/dashboard/components/DomainSelector';
import { DomainEmptyState } from '@/features/dashboard/components/DomainEmptyState';
import { WhatToFixFirst } from '@/features/dashboard/components/WhatToFixFirst';
import { SecurityPosture } from '@/features/dashboard/components/SecurityPosture';
import { AISecurityAssistant } from '@/features/dashboard/components/AISecurityAssistant';
import { RecentScans } from '@/features/dashboard/components/RecentScans';
import { domainService } from '@/features/domain/services/domain.service';
import { scanService } from '@/features/scans/services/scan.service';
import type { Domain } from '@/features/domain/types/domain.types';
import type { ScanHistoryItem } from '@/features/scans/services/scan.service';
import { mockDashboardData } from '@/features/dashboard/constants/mock-data';

const SELECTED_DOMAIN_KEY = 'selected_dashboard_domain';

function getStoredDomainId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(SELECTED_DOMAIN_KEY);
}

function storeSelectedDomainId(domainId: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SELECTED_DOMAIN_KEY, domainId);
}

type PageState =
  | { phase: 'loading' }
  | { phase: 'no-scans'; domains: Domain[]; selectedDomain: Domain }
  | { phase: 'has-scans'; domains: Domain[]; selectedDomain: Domain; scans: ScanHistoryItem[]; pagination: { currentPage: number; totalPages: number } };

export default function ScanDashboardPage() {
  const [state, setState] = useState<PageState>({ phase: 'loading' });
  const latestFetchIdRef = useRef(0);

  const fetchScansForDomain = useCallback(async (domain: Domain, allDomains: Domain[], page: number = 1) => {
    setState({ phase: 'loading' });
    const currentFetchId = ++latestFetchIdRef.current;
    
    try {
      const historyRes = await scanService.getScanHistory(domain.id, { 
        page_size: 10,
        page,
        sort_by: "createdAt",
        order: "desc"
      });
      if (currentFetchId !== latestFetchIdRef.current) return;

      if (historyRes.isSuccess && historyRes.value && historyRes.value.totalCount > 0) {
        setState({
          phase: 'has-scans',
          domains: allDomains,
          selectedDomain: domain,
          scans: historyRes.value.data,
          pagination: {
            currentPage: historyRes.value.page,
            totalPages: historyRes.value.totalPages,
          }
        });
      } else {
        setState({
          phase: 'no-scans',
          domains: allDomains,
          selectedDomain: domain,
        });
      }
    } catch {
      if (currentFetchId !== latestFetchIdRef.current) return;

      setState({
        phase: 'no-scans',
        domains: allDomains,
        selectedDomain: domain,
      });
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const domainsResult = await domainService.getDomains();
        if (!mounted) return;

        if (!domainsResult.data || domainsResult.data.length === 0) {
          // If no domains, redirect to main dashboard which handles the onboarding state
          if (typeof window !== 'undefined') {
            window.location.href = '/dashboard';
          }
          return;
        }

        const domains = domainsResult.data;
        const verifiedDomains = domains.filter((d) => d.status === "Verified");

        if (verifiedDomains.length === 0) {
          if (typeof window !== 'undefined') {
            window.location.href = '/dashboard';
          }
          return;
        }

        const storedId = getStoredDomainId();
        const selectedDomain = verifiedDomains.find((d) => d.id === storedId) ?? verifiedDomains[0];

        await fetchScansForDomain(selectedDomain, domains, 1);
      } catch {
        if (!mounted) return;
        if (typeof window !== 'undefined') {
          window.location.href = '/dashboard';
        }
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [fetchScansForDomain]);

  const handleDomainChange = useCallback(
    (domain: Domain) => {
      storeSelectedDomainId(domain.id);
      if (state.phase === 'has-scans' || state.phase === 'no-scans') {
        fetchScansForDomain(domain, state.domains, 1);
      }
    },
    [state, fetchScansForDomain],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (state.phase === 'has-scans') {
        fetchScansForDomain(state.selectedDomain, state.domains, page);
      }
    },
    [state, fetchScansForDomain],
  );

  if (state.phase === 'loading') {
    return (
      <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] gap-3'>
        <Loader2 className='h-8 w-8 animate-spin text-[#072E28]' />
        <p className='text-sm text-[#6B7280] font-medium'>Loading your dashboard...</p>
      </div>
    );
  }

  if (state.phase === 'no-scans') {
    return (
      <div className="px-4 md:px-6 py-6 space-y-5">
        {/* Page header */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-geist font-semibold text-[32px] leading-[24px] tracking-[0.5%] text-[#2B2B2B]">
                Dashboard
              </h1>
              <p className="font-geist font-normal text-[16px] leading-[16px] tracking-[2%] text-[#5C5C5C] mt-2">
                Overview of your security posture
              </p>
            </div>
          </div>

          <div className="flex w-full">
            <DomainSelector
              domains={state.domains}
              selected={state.selectedDomain}
              onChange={handleDomainChange}
            />
          </div>
        </div>

        <DomainEmptyState
          domainName={state.selectedDomain.domain}
          domainId={state.selectedDomain.id}
        />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-6 space-y-5">

      {/* Page header */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-geist font-semibold text-[32px] leading-[24px] tracking-[0.5%] text-[#2B2B2B]">
              Dashboard
            </h1>
            <p className="font-geist font-normal text-[16px] leading-[16px] tracking-[2%] text-[#5C5C5C] mt-2">
              Overview of your security posture
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 h-10 px-4 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity shrink-0 font-geist"
          >
            <ScanLine className="h-4 w-4" />
            <span className="hidden sm:inline">Run new scan</span>
          </button>
        </div>

        {/* Domain selector — always full width */}
        <div className="flex w-full">
          <DomainSelector
            domains={state.domains}
            selected={state.selectedDomain}
            onChange={handleDomainChange}
          />
        </div>
      </div>

      {/* Row 1: What to fix first + Security Posture */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WhatToFixFirst issue={mockDashboardData.primaryAlert} />
        <SecurityPosture score={mockDashboardData.securityScore} />
      </div>

      {/* Row 2: AI Security Assistant */}
      <AISecurityAssistant actions={mockDashboardData.aiActions} />

      {/* Row 3: Recent Scans — real data */}
      <RecentScans 
        scans={state.scans} 
        domainName={state.selectedDomain.domain} 
        pagination={state.pagination}
        onPageChange={handlePageChange}
      />

    </div>
  );
}
