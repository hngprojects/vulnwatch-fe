'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { ScanLine, Loader2 } from 'lucide-react';
import { EmptyDashboard } from '@/features/dashboard/components/EmptyDashboard';
import { DomainEmptyState } from '@/features/dashboard/components/DomainEmptyState';
import { DomainSelector } from '@/features/dashboard/components/DomainSelector';
import { WhatToFixFirst } from '@/features/dashboard/components/WhatToFixFirst';
import { SecurityPosture } from '@/features/dashboard/components/SecurityPosture';
import { AISecurityAssistant } from '@/features/dashboard/components/AISecurityAssistant';
import { RecentScans } from '@/features/dashboard/components/RecentScans';
import { TourProvider } from '@/features/dashboard/components/tour/TourProvider';
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

type DashboardState =
  | { phase: 'loading' }
  | { phase: 'no-domains' }
  | { phase: 'no-scans'; domains: Domain[]; selectedDomain: Domain }
  | { phase: 'has-scans'; domains: Domain[]; selectedDomain: Domain; scans: ScanHistoryItem[]; pagination: { currentPage: number; totalPages: number } };

export default function DashboardPage() {
  const [state, setState] = useState<DashboardState>({ phase: 'loading' });
  const latestFetchTokenRef = useRef<number>(0);

  // Fetch scan history for a given domain and update state accordingly
  const fetchScansForDomain = useCallback(async (domain: Domain, allDomains: Domain[], page: number = 1) => {
    const fetchToken = ++latestFetchTokenRef.current;
    
    setState({ phase: 'loading' });
    try {
      const historyRes = await scanService.getScanHistory(domain.id, { 
        page_size: 10,
        page,
        sort_by: "createdAt",
        order: "desc"
      });
      
      if (fetchToken !== latestFetchTokenRef.current) return;

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
      if (fetchToken !== latestFetchTokenRef.current) return;
      // On error, treat as no scans — user can retry or run a scan
      setState({
        phase: 'no-scans',
        domains: allDomains,
        selectedDomain: domain,
      });
    }
  }, []);

  // Initial load: fetch domains, then scan history
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const domainsResult = await domainService.getDomains();
        if (!mounted) return;

        if (!domainsResult.data || domainsResult.data.length === 0) {
          setState({ phase: 'no-domains' });
          return;
        }

        const domains = domainsResult.data;
        const storedId = getStoredDomainId();
        const selectedDomain = domains.find((d) => d.id === storedId) ?? domains[0];

        await fetchScansForDomain(selectedDomain, domains, 1);
      } catch {
        if (!mounted) return;
        setState({ phase: 'no-domains' });
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [fetchScansForDomain]);

  // Handle domain change from the selector
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

  // --- STATE 1: Loading ---
  if (state.phase === 'loading') {
    return (
      <div className='flex flex-col items-center justify-center min-h-[calc(100vh-200px)] gap-3'>
        <Loader2 className='h-8 w-8 animate-spin text-[#072E28]' />
        <p className='text-sm text-[#6B7280] font-medium'>Loading your dashboard...</p>
      </div>
    );
  }

  // --- STATE 2: No Domains (Full Onboarding) ---
  if (state.phase === 'no-domains') {
    return (
      <div className='px-4 md:px-6 py-6'>
        <TourProvider />
        <div className='mb-6'>
          <h1 className='font-geist text-[40px] font-bold text-[#111827]'>
            Your dashboard
          </h1>
          <p className='font-inter text-[20px] font-normal text-[#6B7280] mt-1'>
            Your security overview will be displayed here
          </p>
        </div>
        <EmptyDashboard />
      </div>
    );
  }

  // --- STATE 3: Has Domains, But Selected Domain Has No Scans ---
  if (state.phase === 'no-scans') {
    return (
      <div className='px-4 md:px-6 py-6 space-y-5 max-w-7xl mx-auto'>
        <TourProvider />
        {/* Page header */}
        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-xl font-bold text-[#111827]'>Dashboard</h1>
              <p className='text-sm text-[#6B7280] mt-0.5'>
                Overview of your security posture
              </p>
            </div>
          </div>

          <div className='flex'>
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

  // --- STATE 4: Filled Dashboard ---
  return (
    <div className='px-4 md:px-6 py-6 space-y-5 max-w-7xl mx-auto'>
      <TourProvider />
      {/* Page header */}
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-xl font-bold text-[#111827]'>Dashboard</h1>
            <p className='text-sm text-[#6B7280] mt-0.5'>
              Overview of your security posture
            </p>
          </div>
          <button
            type='button'
            className='hidden md:inline-flex items-center gap-2 h-10 px-4 bg-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity shrink-0'
          >
            <ScanLine className='h-4 w-4' />
            <span className='hidden sm:inline'>Run New Scan</span>
          </button>
        </div>

        <div className='flex'>
          <DomainSelector
            domains={state.domains}
            selected={state.selectedDomain}
            onChange={handleDomainChange}
          />
        </div>
      </div>

      {/* Row 1: What to fix + Security Posture */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
