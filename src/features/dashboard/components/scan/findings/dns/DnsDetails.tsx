import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { SeverityBadge, type Severity } from '../SeverityBadge';
import { scanService, ScanReport, FindingDto } from '../../../../../scans/services/scan.service';

type DnsDetailsProps = {
  backHref?: string;
  scanId?: string | null;
  findingId?: string | null;
};

interface DnsTechnicalDetail {
  error?: string;
  issues?: string[];
  hasSPF?: boolean;
  hasDMARC?: boolean;
  hasMX?: boolean;
  rawRecords?: unknown;
}

export function DnsDetails({
  backHref = '/scan/report/findings/dns',
  scanId,
  findingId,
}: DnsDetailsProps) {
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
        console.error("Failed to load report", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [scanId]);

  let finding: FindingDto | null = null;
  if (report?.summary) {
    const allIssues = [
      ...(report.summary.criticalIssues || []),
      ...(report.summary.highSeverityIssues || []),
      ...(report.summary.mediumSeverityIssues || []),
      ...(report.summary.lowSeverityIssues || []),
    ];
    finding = allIssues.find(
      (f) => typeof f !== 'string' && f.id === findingId
    ) as FindingDto | null;
  }

  const renderTechnicalDetails = (detail: unknown) => {
    if (!detail) return "No technical details available.";
    if (typeof detail === 'string') return detail;
    const d = detail as DnsTechnicalDetail;
    if (d.error) return d.error;

    return (
      <div className="space-y-2 font-mono text-xs text-[#4B5563]">
        {d.issues && d.issues.length > 0 && (
          <div>
            <span className="font-semibold text-red-600">Issues:</span>
            <ul className="list-disc pl-4 mt-1">
              {d.issues.map((issue: string, i: number) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        )}
        {d.hasSPF !== undefined && (
          <div>
            <span className="font-semibold">SPF Configuration:</span> {d.hasSPF ? 'Configured' : 'Missing'}
          </div>
        )}
        {d.hasDMARC !== undefined && (
          <div>
            <span className="font-semibold">DMARC Configuration:</span> {d.hasDMARC ? 'Configured' : 'Missing'}
          </div>
        )}
        {d.hasMX !== undefined && (
          <div>
            <span className="font-semibold">MX Configuration:</span> {d.hasMX ? 'Configured' : 'Missing'}
          </div>
        )}
        {!!d.rawRecords && (
          <div className="mt-2 pt-2 border-t border-neutral-100">
            <span className="font-semibold">Raw Records:</span>
            <pre className="mt-1 max-h-40 overflow-auto rounded bg-neutral-50 p-2 text-[10px] whitespace-pre-wrap">
              {JSON.stringify(d.rawRecords, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-neutral-500 font-medium">Loading details...</p>
      </div>
    );
  }

  if (!finding) {
    return (
      <section className='mx-auto w-full max-w-6xl px-4 py-6 md:px-6'>
        <div className="flex justify-start">
          <Link
            href={backHref}
            className='mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111827]'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to results
          </Link>
        </div>
        <div className="mt-10 rounded-xl border border-dashed border-neutral-300 p-8 bg-white max-w-md mx-auto text-center">
          <h2 className="text-lg font-bold text-neutral-800">Finding Details Not Found</h2>
          <p className="text-sm text-neutral-500 mt-2">
            The details for this scan finding could not be found or the URL is invalid.
          </p>
        </div>
      </section>
    );
  }

  const title = finding.title;
  const severity = finding.severity as Severity;
  const explanation = finding.explanation;
  const techDetail = renderTechnicalDetails(finding.technicalDetail);
  const steps = finding.remediationSteps && finding.remediationSteps.length > 0 ? finding.remediationSteps : [];

  return (
    <section className='mx-auto w-full max-w-6xl px-4 py-6 md:px-6'>
      <Link
        href={backHref}
        className='mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111827]'
      >
        <ArrowLeft className='h-4 w-4' />
        Back to results
      </Link>

      <h1 className='text-2xl font-bold text-[#111827]'>Finding Details</h1>

      <section className='mt-5 rounded-lg bg-[#EFEFEF] p-5 md:p-6'>
        <div className='flex flex-wrap items-center gap-4'>
          <SeverityBadge severity={severity} />
          <span className='text-base font-semibold text-[#303030]'>
            {title}
          </span>
        </div>
      </section>

      <div className='mt-5 space-y-5'>
        <DetailCard title='What this Means For You'>
          {explanation}
        </DetailCard>

        <DetailCard title='For Your Developer (Technical Details)'>
          {techDetail}
        </DetailCard>

        {steps.length > 0 && (
          <section className='rounded-lg border border-[#E5E7EB] bg-white p-5 md:p-6'>
            <h2 className='text-base font-semibold text-[#303030]'>
              How to Fix it
            </h2>

            <ol className='mt-6 space-y-4'>
              {steps.map((step, index) => (
                <li
                  key={step}
                  className='flex gap-4 text-sm leading-6 text-[#6B7280]'
                >
                  <span className='grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#DFF8EC] text-xs font-bold text-[#1FA870]'>
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </section>
  );
}

type DetailCardProps = {
  title: string;
  children: React.ReactNode;
};

function DetailCard({ title, children }: DetailCardProps) {
  return (
    <section className='rounded-lg border border-[#E5E7EB] bg-white p-5 md:p-6'>
      <h2 className='text-base font-semibold text-[#303030]'>{title}</h2>
      <div className='mt-6 text-sm leading-6 text-[#6B7280]'>{children}</div>
    </section>
  );
}
