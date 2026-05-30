'use client';

import { startTransition, useEffect, useEffectEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Check, Loader2, RefreshCw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  scanService,
  type FindingDto,
  type ScanReport,
} from "@/features/scans/services/scan.service";
import { AskAiButton } from "@/features/ai-chat/components/AskAiButton";
import { AIChatbot } from "@/features/ai-chat/components/AIChatbot";

interface AISecuritySummaryProps {
  scanId: string;
  backHref?: string;
}

type SummaryTone = "critical" | "high" | "good" | "neutral";

type SummaryItem = {
  tone: SummaryTone;
  text: string;
};

const FALLBACK_BASIC_SUMMARY: SummaryItem[] = [
  {
    tone: "critical",
    text: "Your domain has 1 critical issue that needs immediate attention: missing HSTS protection may expose visitor traffic to interception on untrusted networks.",
  },
  {
    tone: "high",
    text: "High-severity findings compound the risk: sensitive paths may be exposed publicly and should be reviewed first.",
  },
  {
    tone: "good",
    text: "The good news: these are typically configuration-level fixes that can often be addressed without application code changes.",
  },
];

const FALLBACK_TECHNICAL_SUMMARY = [
  "Finding counts are not available yet from the backend report. This view is temporarily showing the design-time summary content.",
  "Once the scan completes, this page will replace the placeholder copy with live scan findings, counts, and sub-score details.",
];

function ExecutiveBriefIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#A0E870] shrink-0">
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M8.454 2.75C8.641 2.75 8.804 2.878 8.848 3.06L9.587 6.138C9.816 7.091 10.559 7.835 11.513 8.063L14.59 8.803C14.773 8.847 14.9 9.009 14.9 9.197C14.9 9.385 14.773 9.547 14.59 9.591L11.513 10.33C10.559 10.559 9.816 11.302 9.587 12.256L8.848 15.333C8.804 15.516 8.641 15.644 8.454 15.644C8.266 15.644 8.103 15.516 8.059 15.333L7.32 12.256C7.091 11.302 6.348 10.559 5.394 10.33L2.317 9.591C2.134 9.547 2.007 9.385 2.007 9.197C2.007 9.009 2.134 8.847 2.317 8.803L5.394 8.063C6.348 7.835 7.091 7.091 7.32 6.138L8.059 3.06C8.103 2.878 8.266 2.75 8.454 2.75Z"
          fill="#08342D"
        />
        <path
          d="M16.862 10.514C17 10.514 17.119 10.607 17.151 10.741L17.528 12.311C17.646 12.801 18.028 13.183 18.518 13.301L20.088 13.678C20.222 13.71 20.315 13.829 20.315 13.967C20.315 14.105 20.222 14.224 20.088 14.256L18.518 14.633C18.028 14.751 17.646 15.133 17.528 15.623L17.151 17.193C17.119 17.327 17 17.42 16.862 17.42C16.724 17.42 16.605 17.327 16.573 17.193L16.196 15.623C16.078 15.133 15.696 14.751 15.206 14.633L13.636 14.256C13.502 14.224 13.409 14.105 13.409 13.967C13.409 13.829 13.502 13.71 13.636 13.678L15.206 13.301C15.696 13.183 16.078 12.801 16.196 12.311L16.573 10.741C16.605 10.607 16.724 10.514 16.862 10.514Z"
          fill="#08342D"
        />
        <circle cx="15.208" cy="5.718" r="1.563" fill="#08342D" />
      </svg>
    </div>
  );
}

function formatDateLabel(iso?: string | null) {
  if (!iso) {
    return new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatCoverage(value?: string | null) {
  if (!value) return "Scan";
  return `${value} Scan`;
}

function titleCase(value?: string | null) {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function getSummaryText(item: string | FindingDto) {
  if (typeof item === "string") {
    return item;
  }

  return item.explanation || item.title || "Security finding detected.";
}

function buildBasicSummary(report: ScanReport) {
  const criticalIssues = report.summary?.criticalIssues?.filter(Boolean) ?? [];
  const highIssues = report.summary?.highSeverityIssues?.filter(Boolean) ?? [];
  const items: SummaryItem[] = [
    ...criticalIssues.map((issue) => ({
      tone: "critical" as const,
      text: getSummaryText(issue),
    })),
    ...highIssues.map((issue) => ({
      tone: "high" as const,
      text: getSummaryText(issue),
    })),
  ];

  if (report.summary?.goodNews) {
    items.push({
      tone: "good" as const,
      text: report.summary.goodNews,
    });
  }

  if (items.length === 0 && report.findingGroups) {
    items.push({
      tone: "neutral" as const,
      text: `This ${formatCoverage(report.coverage).toLowerCase()} found ${report.findingGroups.criticalCount} critical, ${report.findingGroups.highCount} high, ${report.findingGroups.mediumCount} medium, and ${report.findingGroups.lowCount} low findings.`,
    });
  }

  if (items.length === 0 && report.securityScore !== null) {
    items.push({
      tone: "neutral" as const,
      text: `This scan completed with a security score of ${report.securityScore}${report.riskLevel ? ` and an overall ${report.riskLevel.toLowerCase()} risk level` : ""}.`,
    });
  }

  return items;
}

function buildTechnicalSummary(report: ScanReport) {
  const sections: string[] = [];

  if (report.findingGroups) {
    sections.push(
      `Finding counts: ${report.findingGroups.criticalCount} critical, ${report.findingGroups.highCount} high, ${report.findingGroups.mediumCount} medium, ${report.findingGroups.lowCount} low, ${report.findingGroups.passCount} pass.`,
    );
  }

  const subScoreEntries = [
    ["Exposure", report.subScores?.exposure],
    ["SSL", report.subScores?.ssl],
    ["DNS", report.subScores?.dns],
  ] as const;

  for (const [label, item] of subScoreEntries) {
    if (!item) continue;

    const detail = item.detail ? ` ${item.detail}` : "";
    sections.push(
      `${label}: score ${item.score}, status ${titleCase(item.status)}.${detail}`,
    );
  }

  if (sections.length === 0 && report.summary?.goodNews) {
    sections.push(report.summary.goodNews);
  }

  return sections;
}

function getToneClasses(tone: SummaryTone) {
  if (tone === "critical" || tone === "high") {
    return {
      wrap: "bg-[#57D132]/10",
      icon: "text-[#2E7D32]",
      text: "text-[#4B5563]",
    };
  }

  if (tone === "good") {
    return {
      wrap: "bg-[#57D132]/10",
      icon: "text-[#2E7D32]",
      text: "text-[#4B5563]",
    };
  }

  return {
    wrap: "bg-[#EEF2F7]",
    icon: "text-[#6B7280]",
    text: "text-[#6B7280]",
  };
}

async function fetchReportOutcome(scanId: string) {
  const response = await scanService.getScanReport(scanId);

  if (!response.isSuccess || !response.value) {
    return {
      type: "error" as const,
      message: response.error?.message ?? "Unable to load AI security summary.",
    };
  }

  return {
    type: "success" as const,
    report: response.value,
  };
}

export function AISecuritySummary({
  scanId,
  backHref = "/scan/report",
}: AISecuritySummaryProps) {
  const [isTechnical, setIsTechnical] = useState(false);
  const [copied, setCopied] = useState(false);
  const [report, setReport] = useState<ScanReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFallbackSummary, setShowFallbackSummary] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const isReportPendingMessage = (message: string) =>
    /scan is not complete|current status:\s*(queued|running)/i.test(message);

  const loadReport = useEffectEvent(async () => {
    startTransition(() => {
      setLoading(true);
      setError(null);
      setShowFallbackSummary(false);
    });

    try {
      const outcome = await fetchReportOutcome(scanId);

      if (outcome.type === "success") {
        startTransition(() => {
          setReport(outcome.report);
        });
      } else if (isReportPendingMessage(outcome.message)) {
        startTransition(() => {
          setShowFallbackSummary(true);
          setReport(null);
        });
      } else {
        startTransition(() => {
          setError(outcome.message);
        });
      }
    } finally {
      startTransition(() => {
        setLoading(false);
      });
    }
  });

  useEffect(() => {
    queueMicrotask(() => {
      void loadReport();
    });
  }, [scanId]);

  const handleRetry = async () => {
    setLoading(true);
    setError(null);
    setShowFallbackSummary(false);

    const outcome = await fetchReportOutcome(scanId);

    if (outcome.type === "success") {
      setReport(outcome.report);
    } else if (isReportPendingMessage(outcome.message)) {
      setShowFallbackSummary(true);
      setReport(null);
    } else {
      setError(outcome.message);
    }

    setLoading(false);
  };

  const currentDateLabel = formatDateLabel(report?.completedAt);
  const basicSummary = useMemo(
    () => (report ? buildBasicSummary(report) : []),
    [report],
  );
  const technicalSummary = useMemo(
    () => (report ? buildTechnicalSummary(report) : []),
    [report],
  );
  const isSummaryReady = report?.status === "Completed";
  const isUsingFallback = showFallbackSummary && !report;
  const displayedBasicSummary = isUsingFallback
    ? FALLBACK_BASIC_SUMMARY
    : basicSummary;
  const displayedTechnicalSummary = isUsingFallback
    ? FALLBACK_TECHNICAL_SUMMARY
    : technicalSummary;

  const handleCopy = () => {
    if (!report && !isUsingFallback) return;

    const domainLabel = report?.domainName ?? "this domain";
    let copyText = "";
    if (!isTechnical) {
      copyText =
        `EXECUTIVE BRIEF - ${currentDateLabel}\n\n` +
        `${domainLabel}\n` +
        `${report ? `Coverage: ${formatCoverage(report.coverage)}\n` : ""}` +
        `${report ? `Status: ${report.status}\n` : "Status: Pending backend report\n"}` +
        `${report?.securityScore !== null && report?.securityScore !== undefined ? `Security Score: ${report.securityScore}\n` : ""}` +
        `${report?.riskLevel ? `Risk Level: ${report.riskLevel}\n` : ""}\n` +
        displayedBasicSummary.map((item) => `- ${item.text}`).join("\n");
    } else {
      copyText =
        `EXECUTIVE BRIEF - ${currentDateLabel}\n\nWHAT WE FOUND:\n` +
        displayedTechnicalSummary.map((item) => `- ${item}`).join("\n");
    }

    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch((error) => {
      setCopied(false);
      console.error("Failed to copy AI security summary", error);
    });
  };

  const renderStateCard = (
    title: string,
    description: string,
    actionLabel?: string,
    onAction?: () => void,
  ) => (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F3F4F6] text-[#4B5563]">
          <TriangleAlert className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-semibold text-[#111827]">{title}</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#6B7280]">
          {description}
        </p>
        {actionLabel && onAction ? (
          <Button
            type="button"
            onClick={onAction}
            variant="outline"
            className="mt-5 rounded-xl"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );

  return (
    <div className="px-4 md:px-8 py-6 max-w-6xl mx-auto">
      {/* Back Button */}
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm font-bold text-[#6B7280] hover:text-[#111827] transition-colors mb-5"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[28px] font-bold text-[#111827] leading-tight">
          AI Security Summary
        </h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Auto-generated from your latest scan, written for humans.
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm">
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <Loader2 className="h-7 w-7 animate-spin text-[#08342D]" />
            <p className="text-sm text-[#6B7280]">
              Loading the latest scan summary...
            </p>
          </div>
        </div>
      ) : error ? (
        renderStateCard(
          "We couldn't load this scan summary",
          error,
          "Try Again",
          () => void handleRetry(),
        )
      ) : !report && !isUsingFallback ? (
        renderStateCard(
          "No scan summary found",
          "This scan report is not available yet or may have been removed.",
        )
      ) : (
        <>

      {isUsingFallback ? (
        <div className="mb-6 rounded-2xl border border-[#F2D7A1] bg-[#FFF8E8] px-4 py-3 text-sm text-[#7A5A16]">
          This scan report is not ready from the backend yet, so you are seeing the AI summary page with fallback content for now.
        </div>
      ) : null}

      {/* Executive Brief Card */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 md:p-6 mb-8 shadow-sm">
        {/* Card Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F3F4F6] mb-6">
          <div className="flex items-center gap-3">
            <ExecutiveBriefIcon />
            <div>
              <h2 className="text-sm font-bold text-[#111827] tracking-wide uppercase leading-none">
                EXECUTIVE BRIEF
              </h2>
              <span className="text-xs text-[#9CA3AF] block mt-1 font-medium">
                {currentDateLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* View Switch Toggle */}
            <div className="flex items-center gap-1.5 select-none">
              <button
                type="button"
                onClick={() => setIsTechnical(false)}
                className={`min-w-[28px] text-left text-[10px] leading-none font-medium transition-colors focus:outline-none ${
                  !isTechnical
                    ? "text-[#7E8694]"
                    : "text-[#B3BAC5] hover:text-[#8F97A5]"
                }`}
              >
                Basic
              </button>
              <button
                type="button"
                role="switch"
                aria-checked={isTechnical}
                aria-label={`Switch summary view to ${isTechnical ? "basic" : "technical"}`}
                onClick={() => setIsTechnical((prev) => !prev)}
                className={`relative h-[18px] w-[30px] rounded-full transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#08342D]/15 ${
                  isTechnical ? "bg-[#0A3B34]" : "bg-[#8A8A8A]"
                }`}
              >
                <span
                  className={`absolute top-[1px] left-[1px] h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(17,24,39,0.2)] transition-transform duration-200 ease-out ${
                    isTechnical ? "translate-x-3" : "translate-x-0"
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={() => setIsTechnical(true)}
                className={`min-w-[40px] text-left text-[10px] leading-none font-medium transition-colors focus:outline-none ${
                  isTechnical
                    ? "text-[#7E8694]"
                    : "text-[#B3BAC5] hover:text-[#8F97A5]"
                }`}
              >
                Technical
              </button>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              disabled={!isSummaryReady && !isUsingFallback}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all select-none ${copied ? "bg-green-50 border-green-200 text-green-700" : "bg-white border-[#E5E7EB] text-[#4B5563] hover:border-[#111827] hover:text-[#111827]"}`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Summary Content */}
        {!isTechnical ? (
          /* BASIC VIEW */
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-[#111827] tracking-wide uppercase">
              Your Security Summary
            </h3>
            <ul className="space-y-4">
              {displayedBasicSummary.map((item, index) => {
                const toneClasses = getToneClasses(item.tone);

                return (
                  <li key={`${item.tone}-${index}`} className="flex items-start gap-3">
                    <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${toneClasses.wrap}`}>
                      <Check className={`h-3.5 w-3.5 ${toneClasses.icon}`} strokeWidth={3} />
                    </div>
                    <p className={`text-[13px] leading-relaxed ${toneClasses.text}`}>
                      {item.text}
                    </p>
                  </li>
                );
              })}
            </ul>
            <p className="text-[13px] text-[#6B7280] leading-relaxed pt-3 border-t border-[#F3F4F6]">
              {report?.securityScore !== null && report?.securityScore !== undefined
                ? `Security score: ${report.securityScore}${report.riskLevel ? ` with ${report.riskLevel.toLowerCase()} overall risk` : ""}.`
                : "Use this summary alongside the scan findings to prioritize the next fixes while the backend report finishes processing."}
            </p>
          </div>
        ) : (
          /* TECHNICAL VIEW */
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-[#111827] tracking-wide uppercase">
              WHAT WE FOUND
            </h3>
            <ul className="space-y-4">
              {displayedTechnicalSummary.map((item, index) => (
                <li key={`technical-${index}`} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-[#57D132]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-[#2E7D32]" strokeWidth={3} />
                  </div>
                  <p className="text-[13px] text-[#6B7280] leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* "WHAT IS MORE IMPORTANT" Section */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-[#111827] tracking-widest uppercase mb-4">
          WHAT IS MORE IMPORTANT
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 flex flex-col gap-3 min-h-[110px]">
            <div>
              <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]">
                SSL
              </span>
            </div>
            <p className="text-[13px] font-medium text-[#4B5563] leading-snug">
              {report?.subScores?.ssl?.detail ?? "Review SSL findings and address the highest-impact certificate or transport issues first."}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 flex flex-col gap-3 min-h-[110px]">
            <div>
              <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]">
                Header
              </span>
            </div>
            <p className="text-[13px] font-medium text-[#4B5563] leading-snug">
              {report?.summary?.criticalIssues?.[0]
                ? getSummaryText(report.summary.criticalIssues[0])
                : "Tackle the first critical issue from the report to reduce immediate risk."}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 flex flex-col gap-3 min-h-[110px]">
            <div>
              <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]">
                Exposure
              </span>
            </div>
            <p className="text-[13px] font-medium text-[#4B5563] leading-snug">
              {report?.subScores?.exposure?.detail ??
                (report?.summary?.highSeverityIssues?.[0]
                  ? getSummaryText(report.summary.highSeverityIssues[0])
                  : "Review externally exposed services and access controls next.")}
            </p>
          </div>
        </div>
      </div>

      {/* "WHAT COMES FIRST" Section */}
      <div>
        <h3 className="text-xs font-bold text-[#111827] tracking-widest uppercase mb-4">
          WHAT COMES FIRST
        </h3>
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex gap-4">
            <span className="text-xs font-bold text-[#2E7D32] bg-[#57D132]/10 h-6 w-6 rounded-full flex items-center justify-center shrink-0 select-none">
              1
            </span>
            <p className="text-[13px] text-[#4B5563] leading-relaxed">
              <strong>Start with the first critical issue.</strong>{" "}
              {report?.summary?.criticalIssues?.[0]
                ? getSummaryText(report.summary.criticalIssues[0])
                : "Use the scan findings page to address the most urgent item first."}
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <span className="text-xs font-bold text-[#2E7D32] bg-[#57D132]/10 h-6 w-6 rounded-full flex items-center justify-center shrink-0 select-none">
              2
            </span>
            <p className="text-[13px] text-[#4B5563] leading-relaxed">
              <strong>Then work through the high-severity items.</strong> {report?.summary?.highSeverityIssues?.[0] ? getSummaryText(report.summary.highSeverityIssues[0]) : "Review the remaining high-risk findings and sequence the fastest configuration fixes next."}
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <span className="text-xs font-bold text-[#2E7D32] bg-[#57D132]/10 h-6 w-6 rounded-full flex items-center justify-center shrink-0 select-none">
              3
            </span>
            <p className="text-[13px] text-[#4B5563] leading-relaxed">
              <strong>Close by validating the supporting controls.</strong> {report?.summary?.goodNews ?? "After the urgent fixes, re-run the scan and validate improvements across DNS, SSL, and exposure."}
            </p>
          </div>
        </div>
      </div>
      </>
      )}

      {/* Floating Ask AI button */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <AskAiButton onClick={() => setIsChatOpen(true)} />
        </div>
      )}

      {/* AI Chatbot overlay */}
      {isChatOpen && (
        <AIChatbot scanId={scanId} onClose={() => setIsChatOpen(false)} />
      )}
    </div>
  );
}
