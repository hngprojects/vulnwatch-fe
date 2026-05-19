'use client';

import { CheckCircle2, ChevronRight } from 'lucide-react';
import { securitySummaryItems } from './scan-findings-data';

type SecuritySummaryCardProps = {
  onViewDetails: () => void;
};

export function SecuritySummaryCard({ onViewDetails }: SecuritySummaryCardProps) {
  return (
    <section className='rounded-xl border border-[#E5E7EB] bg-white p-5 md:p-6'>
      <h2 className='text-sm font-semibold text-[#111827]'>
        Your security summary:
      </h2>

      <div className='mt-5 space-y-4'>
        {securitySummaryItems.map((item, index) => (
          <div
            key={item.id}
            className={[
              'gap-4 text-sm leading-6',
              index === 0 ? 'flex' : 'hidden md:flex',
            ].join(' ')}
          >
            <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 fill-[#1FA870] text-white' />
            <p className='text-[#6B7280]'>
              {item.before}
              <strong className={item.emphasisClassName}>
                {item.emphasis}
              </strong>
              {item.after}
            </p>
          </div>
        ))}
      </div>

      <button
        type='button'
        onClick={onViewDetails}
        className='mt-4 ml-auto flex cursor-pointer items-center gap-2 text-sm font-medium text-[#073B32] transition-colors hover:text-[#111827] md:mt-6'
      >
        View Details
        <ChevronRight className='h-5 w-5' />
      </button>
    </section>
  );
}
