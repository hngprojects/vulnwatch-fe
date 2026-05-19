'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { AllFindingsTab } from './findings/AllFindingsTab';
import { DnsDetails } from './findings/dns/DnsDetails';
import { DnsTab } from './findings/dns/DnsTab';
import { ExposureDetails } from './findings/exposure/ExposureDetails';
import { ExposureTab } from './findings/exposure/ExposureTab';
import { FindingsTabs, type FindingTab } from './findings/FindingsTabs';
import { type FindingModule, scanOverview } from './findings/scan-findings-data';
import { SslDetails } from './findings/ssl/SslDetails';
import { SslTab } from './findings/ssl/SslTab';

const tabs: FindingTab[] = [
  { id: 'all', label: 'All Findings' },
  { id: 'exposure', label: 'Exposure' },
  { id: 'ssl', label: 'SSL' },
  { id: 'dns', label: 'DNS' },
];

type DetailView = null | 'exposure' | 'ssl' | 'dns';

export function ScanFindings() {
  const [activeTab, setActiveTab] = useState('all');
  const [detailView, setDetailView] = useState<DetailView>(null);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setDetailView(null);
  };

  const handleModuleSelect = (module: FindingModule) => {
    const tabByModule: Record<FindingModule, string> = {
      Exposure: 'exposure',
      SSL: 'ssl',
      DNS: 'dns',
    };

    handleTabChange(tabByModule[module]);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'all':
        return <AllFindingsTab onModuleSelect={handleModuleSelect} />;
      case 'exposure':
        return <ExposureTab onViewDetails={() => setDetailView('exposure')} />;
      case 'ssl':
        return <SslTab onViewDetails={() => setDetailView('ssl')} />;
      case 'dns':
        return <DnsTab onViewDetails={() => setDetailView('dns')} />;
      default:
        return null;
    }
  };

  if (detailView === 'exposure') {
    return <ExposureDetails onBack={() => setDetailView(null)} />;
  }

  if (detailView === 'ssl') {
    return <SslDetails onBack={() => setDetailView(null)} />;
  }

  if (detailView === 'dns') {
    return <DnsDetails onBack={() => setDetailView(null)} />;
  }

  return (
    <section className='mx-auto w-full max-w-6xl bg-white px-4 py-4 md:bg-transparent md:px-6 md:py-6'>
      <button
        type='button'
        className='mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111827] md:mb-6'
      >
        <ArrowLeft className='h-4 w-4' />
        Back
      </button>

      <div
        className={['mb-4', activeTab === 'all' ? '' : 'md:hidden'].join(' ')}
      >
        <h1 className='text-xl font-bold text-[#111827]'>All Findings</h1>
        <p className='mt-1 text-sm text-[#6B7280]'>
          {scanOverview.issueCount} issues across {scanOverview.moduleCount}{' '}
          modules
        </p>
      </div>

      <FindingsTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className='mt-5'>{renderActiveTab()}</div>
    </section>
  );
}
