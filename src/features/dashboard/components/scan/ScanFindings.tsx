"use client";

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { AllFindingsTab } from './findings/AllFindingsTab';
import { DnsTab } from './findings/dns/DnsTab';
import { ExposureTab } from './findings/exposure/ExposureTab';
import {
  FindingsTabs,
  type FindingTab,
  type FindingTabId,
} from './findings/FindingsTabs';
import { scanOverview } from './findings/scan-findings-data';
import { SslTab } from './findings/ssl/SslTab';

const tabs: FindingTab[] = [
  { id: 'all', label: 'All Findings', href: '/scan/report/findings' },
  { id: 'exposure', label: 'Exposure', href: '/scan/exposure' },
  { id: 'ssl', label: 'SSL', href: '/scan/ssl' },
  { id: 'dns', label: 'DNS', href: '/scan/dns' },
];

type ScanFindingsProps = {
  activeTab: FindingTabId;
};

export function ScanFindings({ activeTab }: ScanFindingsProps) {
  const searchParams = useSearchParams();
  const scanId = searchParams.get('scanId');
  
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
    switch (activeTab) {
      case 'all':
        return <AllFindingsTab />;
      case 'exposure':
        return <ExposureTab />;
      case 'ssl':
        return <SslTab />;
      case 'dns':
        return <DnsTab />;
      default:
        return null;
    }
  };

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
          {scanOverview.issueCount} issues across {scanOverview.moduleCount}{' '}
          modules
        </p>
      </div>

      <FindingsTabs tabs={dynamicTabs} activeTab={activeTab} />

      <div className='mt-5'>{renderActiveTab()}</div>
    </section>
  );
}
