"use client";

import { useState, useEffect } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FindingsSummaryRow } from './FindingsSummaryRow';
import {
  allPassedFindings,
  failedFindings,
  findingStats,
  type FindingModule,
  type FindingSummary,
} from './scan-findings-data';
import { scanService, ScanReport, FindingDto } from '../../../../scans/services/scan.service';

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

const mapFindingDtoToSummary = (finding: FindingDto): FindingSummary => {
  let findingModule: FindingModule = "Exposure";
  const surface = finding.surface.toLowerCase();
  if (surface === "dns") findingModule = "DNS";
  if (surface === "ssl") findingModule = "SSL";
  
  // Normalize severity casing
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

export function AllFindingsTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const severityFilter = searchParams.get('severity') || 'all';
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
      .catch((err) => {
        console.error("Failed to load report", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [scanId]);

  const handleFilterToggle = (severity: string) => {
    const base = `/scan/report/findings${scanId ? `?scanId=${encodeURIComponent(scanId)}` : ''}`;
    if (severityFilter === severity) {
      router.push(base); // Clear filter if clicked again
    } else {
      router.push(`${base}${scanId ? '&' : '?'}severity=${severity}`);
    }
  };

  const handleClearFilter = () => {
    router.push(`/scan/report/findings${scanId ? `?scanId=${encodeURIComponent(scanId)}` : ''}`);
  };

  if (loading) {
    return (
      <div className="flex h-[30vh] w-full flex-col items-center justify-center gap-2 p-5 bg-white rounded-xl md:border border-neutral-200 shadow-sm">
        <Loader2 className="h-7 w-7 animate-spin text-[#072e28]" />
        <p className="text-neutral-500 font-medium text-xs">Loading scan findings...</p>
      </div>
    );
  }

  // Determine active dataset: either backend report or mock fallback
  let activeFailed = failedFindings;
  let activePassed = allPassedFindings;
  let activeStats = findingStats;

  if (report) {
    const dynamicFailed: FindingSummary[] = [];
    if (report.summary) {
      if (report.summary.criticalIssues) {
        report.summary.criticalIssues.forEach(f => {
          if (typeof f !== "string") dynamicFailed.push(mapFindingDtoToSummary(f));
        });
      }
      if (report.summary.highSeverityIssues) {
        report.summary.highSeverityIssues.forEach(f => {
          if (typeof f !== "string") dynamicFailed.push(mapFindingDtoToSummary(f));
        });
      }
      if (report.summary.mediumSeverityIssues) {
        report.summary.mediumSeverityIssues.forEach(f => {
          if (typeof f !== "string") dynamicFailed.push(mapFindingDtoToSummary(f));
        });
      }
      if (report.summary.lowSeverityIssues) {
        report.summary.lowSeverityIssues.forEach(f => {
          if (typeof f !== "string") dynamicFailed.push(mapFindingDtoToSummary(f));
        });
      }
    }
    activeFailed = dynamicFailed;

    const dynamicPassed: FindingSummary[] = [];
    if (report.subScores.ssl.score >= 80 && !dynamicFailed.some(f => f.module === 'SSL')) {
      dynamicPassed.push({
        id: 'ssl-pass',
        severity: 'Pass',
        title: 'SSL/TLS Configuration Nominal',
        module: 'SSL',
      });
    }
    if (report.subScores.dns.score >= 80 && !dynamicFailed.some(f => f.module === 'DNS')) {
      dynamicPassed.push({
        id: 'dns-pass',
        severity: 'Pass',
        title: 'DNS Records & Delegation Nominal',
        module: 'DNS',
      });
    }
    if (report.subScores.exposure.score >= 80 && !dynamicFailed.some(f => f.module === 'Exposure')) {
      dynamicPassed.push({
        id: 'exposure-pass',
        severity: 'Pass',
        title: 'Exposure & Endpoints Safe',
        module: 'Exposure',
      });
    }
    activePassed = dynamicPassed;

    const criticalCount = report.findingGroups?.criticalCount ?? 0;
    const highCount = report.findingGroups?.highCount ?? 0;
    const mediumCount = report.findingGroups?.mediumCount ?? 0;
    const lowCount = report.findingGroups?.lowCount ?? 0;
    const passCount = report.findingGroups?.passCount ?? activePassed.length;

    activeStats = [
      {
        label: 'Critical fixes',
        count: criticalCount,
        description: 'Could cause serious harm if not fixed soon',
        className: 'bg-[#FFE6EC] text-[#D92D50]',
        countClassName: 'bg-[#D92D50] text-white',
      },
      {
        label: 'High priority fixes',
        count: highCount,
        description: 'Important to fix within the next 2 weeks',
        className: 'bg-[#FFF0E6] text-[#E46B16]',
        countClassName: 'bg-[#E46B16] text-white',
      },
      {
        label: 'Medium fixes',
        count: mediumCount,
        description: 'Could cause serious harm if not fixed soon',
        className: 'bg-[#FFF8DB] text-[#B89412]',
        countClassName: 'bg-[#B89412] text-white',
      },
      {
        label: 'Low fixes',
        count: lowCount,
        description: 'Important to fix within the next 2 weeks',
        className: 'bg-[#E8EDFF] text-[#2F5BC7]',
        countClassName: 'bg-[#2F5BC7] text-white',
      },
      {
        label: 'Pass',
        count: passCount,
        description: 'These areas passed our checks',
        className: 'bg-[#DFF8EC] text-[#1FA870]',
        countClassName: 'bg-[#1FA870] text-white',
      },
    ];
  }

  const filteredFailed = activeFailed.filter((finding) => {
    if (severityFilter === 'all') return true;
    return finding.severity.toLowerCase() === severityFilter;
  });

  const filteredPassed = activePassed.filter(() => {
    return severityFilter === 'all' || severityFilter === 'pass';
  });

  // Helper to inject scanId into back/sub-page URLs dynamically
  const getFindingHref = (basePath: string) => {
    if (!scanId) return basePath;
    return `${basePath}?scanId=${encodeURIComponent(scanId)}`;
  };

  return (
    <div className='space-y-5'>
      <section className='rounded-xl bg-white md:border md:border-[#E5E7EB] md:p-6 p-4'>
        <div className="flex items-center justify-between">
          <h2 className='text-sm font-semibold text-[#111827]'>Our findings:</h2>
          {severityFilter !== 'all' && (
            <button
              onClick={handleClearFilter}
              className="text-xs font-semibold text-[#072E28] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <X size={14} /> Clear Filter
            </button>
          )}
        </div>

        <div className='mt-5 grid gap-3 md:grid-cols-2'>
          {activeStats.map((stat) => {
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
              href={getFindingHref(moduleHref[finding.module])}
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
                href={getFindingHref(moduleHref[finding.module])}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
