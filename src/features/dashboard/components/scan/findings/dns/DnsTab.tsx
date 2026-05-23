'use client';

import { Check } from 'lucide-react';
import { FindingsSummaryRow } from '../FindingsSummaryRow';
import { SecurityScoreCard } from '../SecurityScoreCard';
import { SecuritySummaryCard } from '../SecuritySummaryCard';
import {
  dnsFindings,
  dnsPassedFindings,
  scanOverview,
} from '../scan-findings-data';

import { useSearchParams } from 'next/navigation';

export function DnsTab() {
  const searchParams = useSearchParams();
  const scanId = searchParams.get('scanId');
  const detailsHref = scanId
    ? `/scan/report/findings/dns/details?scanId=${encodeURIComponent(scanId)}`
    : '/scan/report/findings/dns/details';

  return (
    <div className='space-y-6'>
      <div className='grid gap-4 lg:grid-cols-[18rem_1fr]'>
        <SecurityScoreCard score={scanOverview.score} />
        <SecuritySummaryCard detailsHref={detailsHref} />
      </div>

      <div className='space-y-4'>
        {dnsFindings.map((finding) => (
          <FindingsSummaryRow 
            key={finding.id} 
            {...finding} 
            href={detailsHref}
          />
        ))}
      </div>

      <div className='pt-1'>
        <p className='mb-3 text-xs font-medium text-[#6B7280]'>
          <Check className='mr-2 inline h-3.5 w-3.5 text-[#1FA870]' />
          Passed Checked (1)
        </p>

        <div className='space-y-4'>
          {dnsPassedFindings.map((finding) => (
            <FindingsSummaryRow key={finding.id} {...finding} />
          ))}
        </div>
      </div>
    </div>
  );
}
