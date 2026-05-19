'use client';

import { FindingsSummaryRow } from '../FindingsSummaryRow';
import { SecurityScoreCard } from '../SecurityScoreCard';
import { SecuritySummaryCard } from '../SecuritySummaryCard';
import { scanOverview, sslFindings } from '../scan-findings-data';

export function SslTab() {
  return (
    <div className='space-y-6'>
      <div className='grid gap-4 lg:grid-cols-[18rem_1fr]'>
        <SecurityScoreCard score={scanOverview.score} />
        <SecuritySummaryCard detailsHref='/scan/ssl/details' />
      </div>

      <div className='space-y-4'>
        {sslFindings.map((finding) => (
          <FindingsSummaryRow key={finding.id} {...finding} />
        ))}
      </div>
    </div>
  );
}
