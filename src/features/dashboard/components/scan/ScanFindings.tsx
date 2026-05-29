"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { AllFindingsTab } from './findings/AllFindingsTab';
import { DnsTab } from './findings/dns/DnsTab';
import { ExposureTab } from './findings/exposure/ExposureTab';
import {
  FindingsTabs,
  type FindingTab,
  type FindingTabId,
} from './findings/FindingsTabs';
import { SslTab } from './findings/ssl/SslTab';
import { scanService, ScanReport } from '@/features/scans/services/scan.service';

const tabs: FindingTab[] = [
  { id: 'all', label: 'All Findings', href: '/scan/report/findings' },
  { id: 'exposure', label: 'Exposure', href: '/scan/report/findings/exposure' },
  { id: 'ssl', label: 'SSL', href: '/scan/report/findings/ssl' },
  { id: 'dns', label: 'DNS', href: '/scan/report/findings/dns' },
];

type ScanFindingsProps = {
  activeTab: FindingTabId;
};

export function ScanFindings({ activeTab }: ScanFindingsProps) {
  const searchParams = useSearchParams();
  const scanId = searchParams.get('scanId');
  
  const [report, setReport] = useState<ScanReport | null>(null);
  const [loading, setLoading] = useState(!!scanId);
  const [error, setError] = useState<string | null>(scanId ? null : "No Scan ID provided.");

  useEffect(() => {
    if (!scanId) return;

    let active = true;
    scanService.getScanReport(scanId)
      .then((res) => {
        if (active) {
          if (res.isSuccess && res.value) {
            setReport(res.value);
            setError(null);
          } else {
            setError(res.error?.message || "Failed to retrieve the scan report.");
          }
        }
      })
      .catch((err: unknown) => {
        if (active) {
          const axiosError = err as { response?: { status?: number; data?: { isSuccess?: boolean; error?: { message?: string } } } };
          const responseData = axiosError.response?.data;
          if (responseData && responseData.error?.message) {
            setError(responseData.error.message);
          } else {
            const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
            setError(msg);
          }
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [scanId]);
  
  // Keep the scanId and severity filters in sub-tabs
  const getTabHref = (href: string) => {
    if (!scanId) return href;
    return `${href}?scanId=${encodeURIComponent(scanId)}`;
  };

  const dynamicTabs = tabs.map(tab => ({
    ...tab,
    href: getTabHref(tab.href)
  }));

  const backHref = scanId
    ? `/scan/report?scanId=${encodeURIComponent(scanId)}`
    : '/scan/report';

  const renderActiveTab = () => {
    if (!report) return null;
    switch (activeTab) {
      case 'all':
        return <AllFindingsTab report={report} />;
      case 'exposure':
        return <ExposureTab report={report} />;
      case 'ssl':
        return <SslTab report={report} />;
      case 'dns':
        return <DnsTab report={report} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <section className='mx-auto w-full max-w-6xl bg-white px-4 py-4 md:bg-transparent md:px-6 md:py-6'>
        <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-2 p-5">
          <Loader2 className="h-8 w-8 animate-spin text-[#072e28]" />
          <p className="text-neutral-500 font-medium text-sm">Loading security findings...</p>
        </div>
      </section>
    );
  }

  if (error || !report) {
    return (
      <section className='mx-auto w-full max-w-6xl bg-white px-4 py-4 md:bg-transparent md:px-6 md:py-6'>
        <div className="p-5 max-w-md mx-auto mt-16 font-geist">
          <div className="rounded-xl border border-neutral-200 bg-white p-8 flex flex-col items-center text-center gap-5 shadow-sm">
            <div className="rounded-full bg-red-50 p-3.5">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#111827]">Failed to load report</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {error || "The report could not be found."}
              </p>
            </div>
            <Button asChild className="w-full mt-2 bg-[#072e28] text-white hover:bg-[#072e28]/90 font-semibold h-11">
              <Link href={backHref}>Back to Summary</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const issueCount = 
    (report.findingGroups?.criticalCount || 0) +
    (report.findingGroups?.highCount || 0) +
    (report.findingGroups?.mediumCount || 0) +
    (report.findingGroups?.lowCount || 0);
    
  // Dynamic module count is 3 (Exposure, SSL, DNS)
  const moduleCount = 3;

  return (
    <section className='mx-auto w-full max-w-6xl bg-white px-4 py-4 md:bg-transparent md:px-6 md:py-6'>
      <Link
        href={backHref}
        className={[
          'mb-5 inline-flex items-center gap-2 text-sm font-medium',
          'text-[#6B7280] transition-colors hover:text-[#111827] md:mb-6',
        ].join(' ')}
      >
        <ArrowLeft className='h-4 w-4' />
        Back
      </Link>

      <div
        className={['mb-4', activeTab === 'all' ? '' : 'md:hidden'].join(' ')}
      >
        <h1 className='text-xl font-bold text-[#111827]'>All Findings</h1>
        <p className='mt-1 text-sm text-[#6B7280]'>
          {issueCount} issues across {moduleCount} modules
        </p>
      </div>

      <FindingsTabs tabs={dynamicTabs} activeTab={activeTab} />

      <div className='mt-5'>{renderActiveTab()}</div>
    </section>
  );
}
