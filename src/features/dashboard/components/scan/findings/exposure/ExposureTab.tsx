"use client";

import { Check } from 'lucide-react';
import { SecurityScoreCard } from '../SecurityScoreCard';
import { SecuritySummaryCard } from '../SecuritySummaryCard';
import { FindingsSummaryRow } from '../FindingsSummaryRow';
import { type FindingSummary } from '../scan-findings.types';
import { ScanReport, FindingDto } from '../../../../../scans/services/scan.service';

const mapFindingDtoToSummary = (finding: FindingDto): FindingSummary => {
  let findingModule: 'Exposure' | 'SSL' | 'DNS' = "Exposure";
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

type ExposureTabProps = {
  report: ScanReport;
};

export function ExposureTab({ report }: ExposureTabProps) {
  const scanId = report.scanId;
  const activeScore = report.subScores.exposure.score;
  
  const activeFailed: FindingSummary[] = [];
  if (report.summary) {
    const allIssues = [
      ...(report.summary.criticalIssues || []),
      ...(report.summary.highSeverityIssues || []),
      ...(report.summary.mediumSeverityIssues || []),
      ...(report.summary.lowSeverityIssues || []),
    ];
    allIssues.forEach(f => {
      if (typeof f !== "string" && (f.surface.toLowerCase() === "exposure" || f.surface.toLowerCase() === "httpheaders")) {
        activeFailed.push(mapFindingDtoToSummary(f));
      }
    });
  }

  const activePassed: FindingSummary[] = [];
  if (report.subScores.exposure.score >= 80 && activeFailed.length === 0) {
    activePassed.push({
      id: 'exposure-pass',
      severity: 'Pass',
      title: 'Exposure & Endpoints Safe',
      module: 'Exposure',
    });
  }

  const getDetailsHref = (findingId: string) => {
    return `/scan/report/findings/exposure/details?scanId=${encodeURIComponent(scanId)}&findingId=${encodeURIComponent(findingId)}`;
  };

  const detailsHref = `/scan/report/findings/exposure/details?scanId=${encodeURIComponent(scanId)}`;

  const mainDetailsHref = activeFailed.length > 0
    ? getDetailsHref(activeFailed[0].id)
    : detailsHref;

  return (
    <div className='space-y-5 md:space-y-6'>
      <div className='grid gap-4 lg:grid-cols-[18rem_1fr]'>
        <SecurityScoreCard score={activeScore} />
        <SecuritySummaryCard detailsHref={mainDetailsHref} module="exposure" />
      </div>

      <section>
        <div className='mb-4 hidden md:block'>
          <h2 className='text-base font-semibold text-[#111827]'>
            Exposed Files and Pages
          </h2>
          <p className='mt-2 text-sm text-[#6B7280]'>
            {activeFailed.length} {activeFailed.length === 1 ? 'thing needs' : 'things need'} attention on {report.domainName}
          </p>
        </div>

        <div className='rounded-xl bg-white md:border md:border-[#E5E7EB] md:p-5 p-0 border-0'>
          <div className='space-y-4 md:space-y-2'>
            {activeFailed.map((finding) => (
              <FindingsSummaryRow 
                key={finding.id} 
                {...finding} 
                href={getDetailsHref(finding.id)}
              />
            ))}
            
            {activeFailed.length === 0 && (
              <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500 text-sm bg-white">
                No exposure or endpoints vulnerabilities detected.
              </div>
            )}
          </div>
        </div>
      </section>

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
