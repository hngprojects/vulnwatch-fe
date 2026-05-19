import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SeverityBadge } from './SeverityBadge';

type FindingsSummaryRowProps = {
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Pass';
  title: string;
  module: string;
  href?: string;
};

export function FindingsSummaryRow({
  severity,
  title,
  module,
  href,
}: FindingsSummaryRowProps) {
  const content = (
    <>
      <SeverityBadge severity={severity} />
      <span className='min-w-0 text-sm font-medium leading-5 text-[#303030] sm:flex-1'>
        {title}
      </span>
      <span
        className={[
          'col-start-2 inline-flex items-center justify-end gap-2',
          'text-sm text-[#6B7280] sm:col-start-auto',
        ].join(' ')}
      >
        <span>{module}</span>
        <ChevronRight className='h-5 w-5 text-[#111827]' />
      </span>
    </>
  );

  const className = [
    'grid w-full grid-cols-[auto_1fr] items-start gap-x-3 gap-y-3',
    'rounded-xl border border-[#E5E7EB] bg-white px-4 py-4 text-left',
    'transition-colors hover:border-[#D1D5DB]',
    'sm:flex sm:items-center sm:gap-4',
  ].join(' ');

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type='button' className={className}>
      {content}
    </button>
  );
}
