import { Check } from 'lucide-react';
import { FindingsSummaryRow } from './FindingsSummaryRow';
import {
  allPassedFindings,
  failedFindings,
  findingStats,
  type FindingModule,
} from './scan-findings-data';

const moduleHref: Record<FindingModule, string> = {
  Exposure: '/scan/exposure',
  SSL: '/scan/ssl',
  DNS: '/scan/dns',
};

export function AllFindingsTab() {
  return (
    <div className='space-y-5'>
      <section className='rounded-xl bg-white md:border md:border-[#E5E7EB] md:p-6'>
        <h2 className='text-sm font-semibold text-[#111827]'>Our findings:</h2>

        <div className='mt-5 grid gap-3 md:grid-cols-2'>
          {findingStats.map((stat) => (
            <div
              key={stat.label}
              className={[
                'rounded-md px-4 py-4 text-sm font-medium md:py-3',
                stat.className,
              ].join(' ')}
            >
              <span className='font-bold underline'>{stat.label}</span>
              <span
                className={[
                  'ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold',
                  stat.countClassName,
                ].join(' ')}
              >
                {stat.count}
              </span>
              <span className='ml-3'>{stat.description}</span>
            </div>
          ))}
        </div>
      </section>

      <div className='space-y-3'>
        {failedFindings.map((finding) => (
          <FindingsSummaryRow
            key={finding.id}
            {...finding}
            href={moduleHref[finding.module]}
          />
        ))}
      </div>

      <div className='pt-1'>
        <p className='mb-3 text-xs font-medium text-[#6B7280]'>
          <Check className='mr-2 inline h-3.5 w-3.5 text-[#1FA870]' />
          Passed Checked (3)
        </p>

        <div className='space-y-3'>
          {allPassedFindings.map((finding) => (
            <FindingsSummaryRow
              key={finding.id}
              {...finding}
              href={moduleHref[finding.module]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
