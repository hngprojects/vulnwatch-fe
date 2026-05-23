import { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { FindingsSummaryRow } from '../FindingsSummaryRow';
import { SecurityScoreCard } from '../SecurityScoreCard';
import { SecuritySummaryCard } from '../SecuritySummaryCard';
import { type FindingSummary } from '../scan-findings-data';

import { useSearchParams } from 'next/navigation';
import { scanService, ScanReport, FindingDto } from '../../../../../scans/services/scan.service';

const mapFindingDtoToSummary = (finding: FindingDto): FindingSummary => {
  let findingModule: 'Exposure' | 'SSL' | 'DNS' = "SSL";
  const surface = finding.surface.toLowerCase();
  if (surface === "dns") findingModule = "DNS";
  if (surface === "ssl") findingModule = "SSL";
  
  let severity: "Critical" | "High" | "Medium" | "Low" | "Pass" = "Medium";
  const sev = finding.severity.toLowerCase();
  if (sev === "critical") severity = "Critical";
  else if (sev === "high") severity = "High";
  else if (sev === "medium") severity = "Medium";
  else if (sev === "low") severity = "Low";

  return {
    id: finding.id,
    severity,
    title: finding.title,
    module: findingModule,
  };
};

export function SslTab() {
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
        console.error("Failed to load report", err);
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
      <div className="flex h-[30vh] w-full flex-col items-center justify-center gap-2 p-5 bg-white rounded-xl md:border border-neutral-200 shadow-sm">
        <Loader2 className="h-7 w-7 animate-spin text-[#072e28]" />
        <p className="text-neutral-500 font-medium text-xs">Loading SSL findings...</p>
      </div>
    );
  }

  if (!scanId) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 text-sm bg-white">
        No active scan. Please select or run a scan to see SSL details.
      </div>
    );
  }

  if (!report) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 text-sm bg-white">
        Failed to load scan report. The scan may still be in progress or does not exist.
      </div>
    );
  }

  const activeScore = report.subScores.ssl.score;
  
  const activeFailed: FindingSummary[] = [];
  if (report.summary) {
    const allIssues = [
      ...(report.summary.criticalIssues || []),
      ...(report.summary.highSeverityIssues || []),
      ...(report.summary.mediumSeverityIssues || []),
      ...(report.summary.lowSeverityIssues || []),
    ];
    allIssues.forEach(f => {
      if (typeof f !== "string" && f.surface.toLowerCase() === "ssl") {
        activeFailed.push(mapFindingDtoToSummary(f));
      }
    });
  }

  const activePassed: FindingSummary[] = [];
  if (report.subScores.ssl.score >= 80 && activeFailed.length === 0) {
    activePassed.push({
      id: 'ssl-pass',
      severity: 'Pass',
      title: 'SSL/TLS Configuration Nominal',
      module: 'SSL',
    });
  }

  const getDetailsHref = (findingId: string) => {
    return `/scan/report/findings/ssl/details?scanId=${encodeURIComponent(scanId)}&findingId=${encodeURIComponent(findingId)}`;
  };

  const mainDetailsHref = activeFailed.length > 0
    ? getDetailsHref(activeFailed[0].id)
    : `/scan/report/findings/ssl/details?scanId=${encodeURIComponent(scanId)}`;

  return (
    <div className='space-y-6'>
      <div className='grid gap-4 lg:grid-cols-[18rem_1fr]'>
        <SecurityScoreCard score={activeScore} />
        <SecuritySummaryCard detailsHref={mainDetailsHref} module="ssl" />
      </div>

      {activeFailed.length > 0 && (
        <div className='space-y-4'>
          {activeFailed.map((finding) => (
            <FindingsSummaryRow 
              key={finding.id} 
              {...finding} 
              href={getDetailsHref(finding.id)}
            />
          ))}
        </div>
      )}

      {activeFailed.length === 0 && (
        <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 text-sm bg-white">
          No SSL/TLS configuration issues detected.
        </div>
      )}

      {activePassed.length > 0 && (
        <div className='pt-1'>
          <p className='mb-3 text-xs font-medium text-[#6B7280]'>
            <Check className='mr-2 inline h-3.5 w-3.5 text-[#1FA870]' />
            Passed Checked ({activePassed.length})
          </p>

          <div className='space-y-4'>
            {activePassed.map((finding) => (
              <FindingsSummaryRow key={finding.id} {...finding} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
