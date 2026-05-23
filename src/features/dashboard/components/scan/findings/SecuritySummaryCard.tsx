import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { scanService, ScanReport } from '../../../../scans/services/scan.service';

type SecuritySummaryCardProps = {
  detailsHref: string;
  module?: 'dns' | 'ssl' | 'exposure' | 'all';
};

export function SecuritySummaryCard({ detailsHref, module = 'all' }: SecuritySummaryCardProps) {
  const searchParams = useSearchParams();
  const scanId = searchParams.get('scanId');

  const [report, setReport] = useState<ScanReport | null>(null);
  const [loading, setLoading] = useState(!!scanId);

  useEffect(() => {
    if (!scanId) return;

    let active = true;
    scanService.getScanReport(scanId)
      .then((res) => {
        if (active && res.isSuccess && res.value) {
          setReport(res.value);
        }
      })
      .catch((err: unknown) => {
        console.error("Failed to load report in SecuritySummaryCard", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [scanId]);

  if (loading) {
    return (
      <section className='rounded-xl border border-[#E5E7EB] bg-white p-5 md:p-6 flex flex-col justify-center items-center h-full min-h-[180px]'>
        <Loader2 className="h-6 w-6 animate-spin text-[#072e28]" />
        <p className="text-neutral-500 font-medium text-xs mt-2">Loading security summary...</p>
      </section>
    );
  }

  if (!report) {
    return (
      <section className='rounded-xl border border-[#E5E7EB] bg-white p-5 md:p-6 flex flex-col justify-center items-center h-full min-h-[180px] text-center'>
        <p className="text-neutral-500 font-medium text-sm">
          {!scanId ? "No active scan report. Please select or run a scan." : "Failed to load scan report."}
        </p>
      </section>
    );
  }

  const criticalCount = report.findingGroups?.criticalCount ?? 0;
  const highCount = report.findingGroups?.highCount ?? 0;

  const firstCritical = report.summary?.criticalIssues?.[0];
  const criticalText = firstCritical
    ? (typeof firstCritical === "string" ? firstCritical : firstCritical.title)
    : "No critical issues detected on your domain.";

  const firstHigh = report.summary?.highSeverityIssues?.[0];
  const highText = firstHigh
    ? (typeof firstHigh === "string" ? firstHigh : firstHigh.title)
    : "No high-severity issues detected on your domain.";

  const goodNewsText = report.summary?.goodNews || "Your domain shows good base security configurations.";

  // Extract subscore for specific module
  const subScore = module !== 'all' ? report.subScores[module] : null;
  const isSubScorePass = subScore?.status.toLowerCase() === 'pass';

  return (
    <section className='rounded-xl border border-[#E5E7EB] bg-white p-5 md:p-6 flex flex-col justify-between h-full'>
      <div>
        <h2 className='text-sm font-semibold text-[#111827]'>
          Your security summary:
        </h2>

        <div className='mt-5 space-y-4'>
          {module !== 'all' ? (
            subScore ? (
              <div className='flex gap-4 text-sm leading-6'>
                <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${isSubScorePass ? 'fill-[#1FA870]' : 'fill-[#D92D50]'} text-white`} />
                <p className='text-[#6B7280]'>
                  <strong className={`${isSubScorePass ? 'text-[#1FA870]' : 'text-[#D92D50]'} font-semibold`}>
                    {subScore.title || (isSubScorePass ? 'Check Passed' : 'Issues Detected')}
                  </strong>{' '}
                  — {subScore.explanation || (isSubScorePass ? 'This scan category passed all checks with no warnings.' : 'We detected potential vulnerabilities that require attention.')}
                </p>
              </div>
            ) : (
              <p className="text-sm text-neutral-500">No category summary available.</p>
            )
          ) : (
            <>
              {/* Critical */}
              <div className='flex gap-4 text-sm leading-6'>
                <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 fill-[#1FA870] text-white' />
                <p className='text-[#6B7280]'>
                  Your domain has{' '}
                  <strong className='text-[#D92D50] font-semibold'>
                    {criticalCount} Critical {criticalCount === 1 ? 'Issue' : 'Issues'}
                  </strong>{' '}
                  that {criticalCount === 1 ? 'needs' : 'need'} immediate attention:{' '}
                  {criticalText}
                </p>
              </div>

              {/* High */}
              <div className='hidden md:flex gap-4 text-sm leading-6'>
                <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 fill-[#1FA870] text-white' />
                <p className='text-[#6B7280]'>
                  <strong className='text-[#D92D50] font-semibold'>
                    {highCount} high-severity {highCount === 1 ? 'finding' : 'findings'}
                  </strong>{' '}
                  compound the risk:{' '}
                  {highText}
                </p>
              </div>

              {/* Good News */}
              <div className='hidden md:flex gap-4 text-sm leading-6'>
                <CheckCircle2 className='mt-0.5 h-5 w-5 shrink-0 fill-[#1FA870] text-white' />
                <p className='text-[#6B7280]'>
                  <strong className='text-[#1FA870] font-semibold'>
                    The good news:
                  </strong>{' '}
                  {goodNewsText}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className='mt-4 flex justify-end md:mt-6'>
        <Link
          href={detailsHref}
          className={[
            'inline-flex items-center gap-2 text-sm font-medium',
            'text-[#073B32] transition-colors hover:text-[#111827]',
          ].join(' ')}
        >
          View Details
          <ChevronRight className='h-5 w-5' />
        </Link>
      </div>
    </section>
  );
}
