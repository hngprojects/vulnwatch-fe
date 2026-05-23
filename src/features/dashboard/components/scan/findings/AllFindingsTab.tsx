"use client";

import { Check, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
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

const getSeverityFromLabel = (label: string) => {
  if (label.toLowerCase().includes("critical")) return "critical";
  if (label.toLowerCase().includes("high")) return "high";
  if (label.toLowerCase().includes("medium")) return "medium";
  if (label.toLowerCase().includes("low")) return "low";
  if (label.toLowerCase().includes("pass")) return "pass";
  return "all";
};

export function AllFindingsTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const severityFilter = searchParams.get('severity') || 'all';

  const handleFilterToggle = (severity: string) => {
    if (severityFilter === severity) {
      router.push('/scan/findings'); // Clear filter if clicked again
    } else {
      router.push(`/scan/findings?severity=${severity}`);
    }
  };

  const filteredFailed = failedFindings.filter((finding) => {
    if (severityFilter === 'all') return true;
    return finding.severity.toLowerCase() === severityFilter;
  });

  const filteredPassed = allPassedFindings.filter(() => {
    return severityFilter === 'all' || severityFilter === 'pass';
  });

  return (
    <div className='space-y-5'>
      <section className='rounded-xl bg-white md:border md:border-[#E5E7EB] md:p-6 p-4'>
        <div className="flex items-center justify-between">
          <h2 className='text-sm font-semibold text-[#111827]'>Our findings:</h2>
          {severityFilter !== 'all' && (
            <button
              onClick={() => router.push('/scan/findings')}
              className="text-xs font-semibold text-[#072E28] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <X size={14} /> Clear Filter
            </button>
          )}
        </div>

        <div className='mt-5 grid gap-3 md:grid-cols-2'>
          {findingStats.map((stat) => {
            const severity = getSeverityFromLabel(stat.label);
            const isActive = severityFilter === severity;
            return (
              <button
                key={stat.label}
                onClick={() => handleFilterToggle(severity)}
                className={[
                  'rounded-md px-4 py-4 text-sm font-medium md:py-3 text-left transition-all duration-200 cursor-pointer border-2',
                  isActive 
                    ? 'border-[#072E28] ring-2 ring-[#072E28]/10' 
                    : 'border-transparent hover:border-neutral-300',
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
              </button>
            );
          })}
        </div>
      </section>

      {/* Failed Findings List */}
      {(severityFilter === 'all' || (severityFilter !== 'pass' && filteredFailed.length > 0)) && (
        <div className='space-y-3'>
          {filteredFailed.map((finding) => (
            <FindingsSummaryRow
              key={finding.id}
              {...finding}
              href={moduleHref[finding.module]}
            />
          ))}
        </div>
      )}

      {/* No Failed Findings placeholder if filtered out */}
      {severityFilter !== 'all' && severityFilter !== 'pass' && filteredFailed.length === 0 && (
        <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 text-sm bg-white">
          No failed findings found for this severity.
        </div>
      )}

      {/* Passed Checked List */}
      {(severityFilter === 'all' || severityFilter === 'pass') && (
        <div className='pt-1'>
          <p className='mb-3 text-xs font-medium text-[#6B7280]'>
            <Check className='mr-2 inline h-3.5 w-3.5 text-[#1FA870]' />
            Passed Checked ({filteredPassed.length})
          </p>

          <div className='space-y-3'>
            {filteredPassed.map((finding) => (
              <FindingsSummaryRow
                key={finding.id}
                {...finding}
                href={moduleHref[finding.module]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
