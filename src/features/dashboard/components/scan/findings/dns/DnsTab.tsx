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

export function DnsTab() {
  return (
    <div className='space-y-6'>
      <div className='grid gap-4 lg:grid-cols-[18rem_1fr]'>
        <SecurityScoreCard score={scanOverview.score} />
        <SecuritySummaryCard detailsHref='/scan/dns/details' />
      </div>

      <div className='space-y-4'>
        {dnsFindings.map((finding) => (
          <FindingsSummaryRow key={finding.id} {...finding} />
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
