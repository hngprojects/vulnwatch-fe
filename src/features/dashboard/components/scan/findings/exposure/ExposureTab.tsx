'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { SecurityScoreCard } from '../SecurityScoreCard';
import { SecuritySummaryCard } from '../SecuritySummaryCard';
import { SeverityBadge } from '../SeverityBadge';
import {
  exposureFindings,
  scanOverview,
  type ExposureFinding,
} from '../scan-findings-data';

export function ExposureTab() {
  return (
    <div className='space-y-5 md:space-y-6'>
      <div className='grid gap-4 lg:grid-cols-[18rem_1fr]'>
        <SecurityScoreCard score={scanOverview.score} />
        <SecuritySummaryCard detailsHref='/scan/exposure/details' />
      </div>

      <section>
        <div className='mb-4 hidden md:block'>
          <h2 className='text-base font-semibold text-[#111827]'>
            Exposed Files and Pages
          </h2>
          <p className='mt-2 text-sm text-[#6B7280]'>
            4 things needs attention on {scanOverview.domain}
          </p>
        </div>

        <div className='rounded-xl bg-white md:border md:border-[#E5E7EB] md:p-5'>
          <div className='space-y-4 md:space-y-2'>
            {exposureFindings.map((finding) => (
              <ExposureFindingCard key={finding.id} finding={finding} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ExposureFindingCard({ finding }: { finding: ExposureFinding }) {
  const Icon = finding.icon;
  const checks = finding.checks;

  return (
    <article>
      <button
        type='button'
        className={[
          'grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-3 gap-y-3',
          'rounded-xl border border-[#E5E7EB] bg-white px-4 py-4 text-left',
          'transition-colors hover:border-[#D1D5DB]',
          'md:flex md:gap-4 md:border-0 md:px-3 md:py-3',
          'md:hover:bg-[#F9FAFB]',
        ].join(' ')}
      >
        <span className='grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#FFF0E6] text-[#E46B16]'>
          <Icon className='h-5 w-5' />
        </span>

        <span className='min-w-0 flex-1'>
          <span className='block text-base font-medium text-[#303030]'>
            {finding.title}
          </span>
          <span className='mt-1 block text-sm text-[#6B7280]'>
            {finding.description}
          </span>
        </span>

        <span className='col-start-2 flex shrink-0 items-center justify-end gap-4 md:col-start-auto'>
          <SeverityBadge severity={finding.severity} />
          {finding.isOpen ? (
            <ChevronDown className='h-5 w-5 text-[#111827]' />
          ) : (
            <ChevronRight className='h-5 w-5 text-[#111827]' />
          )}
        </span>
      </button>

      {finding.isOpen && checks ? (
        <div className='mt-1 space-y-4 bg-[#EFEFEF] px-4 py-5 md:px-8'>
          <p className='text-sm font-semibold leading-6 text-[#303030] md:text-base md:leading-7'>
            Directory listing allows anyone to browse your server&apos;s file
            system. Checked 3 common directories
          </p>

          <div className='space-y-3'>
            {checks.map((check) => (
              <button
                key={check.path}
                type='button'
                className='flex w-full items-center gap-4 rounded-lg bg-white px-4 py-4 text-left md:px-5'
              >
                <span className='flex-1 text-base font-medium text-[#303030]'>
                  {check.path}
                </span>
                <span className='hidden text-xs font-semibold text-[#303030] md:inline'>
                  {check.status}
                </span>
                {check.note ? (
                  <span className='hidden rounded-md bg-[#FFE6EC] px-3 py-1 text-xs font-semibold text-[#D92D50] md:inline'>
                    {check.note}
                  </span>
                ) : null}
                <span className='hidden md:inline-flex'>
                  <SeverityBadge severity={check.severity} />
                </span>
                <ChevronRight className='h-5 w-5 text-[#111827]' />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
