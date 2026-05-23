'use client';

import { FindingsSummaryRow } from '../FindingsSummaryRow';
import { SecurityScoreCard } from '../SecurityScoreCard';
import { SecuritySummaryCard } from '../SecuritySummaryCard';
import { scanOverview, sslFindings } from '../scan-findings-data';

import { useSearchParams } from 'next/navigation';

export function SslTab() {
  const searchParams = useSearchParams();
  const scanId = searchParams.get('scanId');
  const detailsHref = scanId
    ? `/scan/report/findings/ssl/details?scanId=${encodeURIComponent(scanId)}`
    : '/scan/report/findings/ssl/details';

  return (
    <div className='space-y-6'>
      <div className='grid gap-4 lg:grid-cols-[18rem_1fr]'>
        <SecurityScoreCard score={scanOverview.score} />
        <SecuritySummaryCard detailsHref={detailsHref} />
      </div>

      <div className='space-y-4'>
        {sslFindings.map((finding) => (
          <FindingsSummaryRow 
            key={finding.id} 
            {...finding} 
            href={detailsHref}
          />
        ))}
      </div>
    </div>
  );
}
