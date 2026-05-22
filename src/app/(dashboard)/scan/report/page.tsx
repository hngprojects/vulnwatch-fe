"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FindingsItemCard from "@/features/scans/scan-report/ui/FindingsItemCard";
import ScanReportPageHeader from "@/features/scans/scan-report/ui/ScanReportPageHeader";
import ScanReportScoreStatCard from "@/features/scans/scan-report/ui/ScanReportStatCard";
import Card from "@/features/scans/shared/ui/Card";
import PageHeader from "@/features/scans/shared/ui/PageHeader";
import { ChevronRight, Loader2, AlertCircle } from "lucide-react";
import SecurityScoreCard from "@/features/scans/scan-report/ui/SecurityScoreCard";
import { scanService, ScanReport } from "@/features/scans/services/scan.service";

const CustomCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.12042 1.74595C5.8921 1.68437 6.62469 1.38092 7.21389 0.878803C8.58886 -0.292934 10.6111 -0.292934 11.9861 0.878803C12.5753 1.38092 13.3079 1.68437 14.0796 1.74595C15.8804 1.88965 17.3103 3.31963 17.4541 5.12042C17.5156 5.8921 17.8191 6.62469 18.3212 7.21389C19.4929 8.58886 19.4929 10.6111 18.3212 11.9861C17.8191 12.5753 17.5156 13.3079 17.4541 14.0796C17.3103 15.8804 15.8804 17.3103 14.0796 17.4541C13.3079 17.5156 12.5753 17.8191 11.9861 18.3212C10.6111 19.4929 8.58886 19.4929 7.21389 18.3212C6.62469 17.8191 5.8921 17.5156 5.12042 17.4541C3.31963 17.3103 1.88965 15.8804 1.74595 14.0796C1.68437 13.3079 1.38092 12.5753 0.878803 11.9861C-0.292934 10.6111 -0.292934 8.58886 0.878803 7.21389C1.38092 6.62469 1.68437 5.8921 1.74595 5.12042C1.88965 3.31963 3.31963 1.88965 5.12042 1.74595ZM14.0485 8.04853C14.5172 7.5799 14.5172 6.8201 14.0485 6.35147C13.5799 5.88284 12.8201 5.88284 12.3515 6.35147L8.4 10.3029L6.84853 8.75147C6.3799 8.28284 5.6201 8.28284 5.15147 8.75147C4.68284 9.2201 4.68284 9.9799 5.15147 10.4485L7.55147 12.8485C8.0201 13.3172 8.7799 13.3172 9.24853 12.8485L14.0485 8.04853Z" fill="currentColor" />
  </svg>
);

const formatScannedDate = (dateString?: string) => {
  if (!dateString) return "Scanned date unknown";
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    
    const suffix = (day: number) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
      }
    };
    
    return `Scanned ${day}${suffix(day)} ${month} ${year}`;
  } catch {
    return "Scanned date unknown";
  }
};

function ScanReportContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scanId = searchParams.get("scanId");
  const [report, setReport] = useState<ScanReport | null>(null);
  const [loading, setLoading] = useState(!!scanId);
  const [error, setError] = useState<string | null>(scanId ? null : "No Scan ID provided.");

  useEffect(() => {
    if (!scanId) return;

    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await scanService.getScanReport(scanId);
        if (res.isSuccess && res.value) {
          setReport(res.value);
        } else {
          const errorMsg = res.error?.message || "";
          if (errorMsg.includes("Scan is not complete") || (res.error?.code === "Validation" && errorMsg.toLowerCase().includes("not complete"))) {
            router.push(`/scan/progress?scanId=${encodeURIComponent(scanId)}`);
            return;
          }
          setError(errorMsg || "Failed to retrieve the scan report.");
        }
      } catch (err: unknown) {
        const axiosError = err as { response?: { status?: number; data?: { isSuccess?: boolean; error?: { message?: string } } } };
        const responseData = axiosError.response?.data;
        if (responseData && responseData.error) {
          const apiError = responseData.error;
          if (apiError.message && apiError.message.includes("Scan is not complete")) {
            router.push(`/scan/progress?scanId=${encodeURIComponent(scanId)}`);
            return;
          }
          setError(apiError.message || `Request failed with status code ${axiosError.response?.status || 'unknown'}`);
        } else {
          const msg = err instanceof Error ? err.message : "An unexpected error occurred while loading the report.";
          setError(msg);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [scanId, router]);

  if (loading) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-2 p-5">
        <Loader2 className="h-8 w-8 animate-spin text-[#072e28]" />
        <p className="text-neutral-500 font-medium text-sm">Loading security report...</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="p-5 max-w-md mx-auto mt-16 font-geist">
        <div className="rounded-xl border border-neutral-200 bg-white p-8 flex flex-col items-center text-center gap-5 shadow-sm">
          <div className="rounded-full bg-red-50 p-3.5">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-[#111827]">Failed to load report</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {error || "The report could not be found."}
            </p>
          </div>
          <Button asChild className="w-full mt-2 bg-[#072e28] text-white hover:bg-[#072e28]/90 font-semibold h-11">
            <Link href="/scan">Back to Scan Setup</Link>
          </Button>
        </div>
      </div>
    );
  }

  const detailsHref = scanId
    ? `/scan/${encodeURIComponent(scanId)}/ai-summary`
    : null;

  const criticalCount = report.findingGroups?.criticalCount ?? 0;
  const highCount = report.findingGroups?.highCount ?? 0;
  const criticalText = report.summary?.criticalIssues?.[0] || "No critical issues detected on your domain.";
  const highText = report.summary?.highSeverityIssues?.[0] || "No high-severity issues detected on your domain.";
  const goodNewsText = report.summary?.goodNews || "Your domain shows good base security configurations.";

  const findings = [
    {
      findingsCount: report.findingGroups?.criticalCount ?? 0,
      description: "Could cause serious harm if not fixed soon",
      score: 12, // Critical range (0-20)
    },
    {
      findingsCount: report.findingGroups?.highCount ?? 0,
      description: "Important to fix within the next 2 weeks",
      score: 32, // High priority range (21-40)
    },
    {
      findingsCount: report.findingGroups?.mediumCount ?? 0,
      description: "Important to fix within the next 2 weeks",
      score: 55, // Medium range (41-60)
    },
    {
      findingsCount: report.findingGroups?.lowCount ?? 0,
      description: "Important to fix within the next 2 weeks",
      score: 76, // Low range (61-80)
    },
    {
      findingsCount: report.findingGroups?.passCount ?? 0,
      description: "These areas passed our checks",
      score: 98, // Pass range (81-100)
    },
  ];

  return (
    <div className="space-y-5 p-5">
      <ScanReportPageHeader 
        domain={report.domainName} 
        scanId={report.scanId} 
        domainStatus={report.domainStatus} 
      />
      <PageHeader
        title="Security Scan Report"
        description={
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Scan type: </span>
            <span className="font-semibold">{report.coverage || "Quick Scan"}</span>
            <div className="size-1.5 bg-neutral-300 rounded-full"></div>
            <span className="text-neutral-500">{formatScannedDate(report.completedAt || report.initiatedAt)}</span>
          </div>
        }
      />
      <div className="grid sm:grid-cols-[250px_1fr] gap-5">
        <SecurityScoreCard score={report.securityScore} />
        <Card>
          <div className="space-y-6">
            <h2 className="font-semibold text-[#111827] text-[18px]">
              Your Security Summary:
            </h2>
            <div className="space-y-4 font-geist font-normal text-[16px]">
              <div className="flex items-start gap-4">
                <CustomCheckIcon className="text-[#1DAF61] shrink-0 mt-0.5" />
                <p>
                  <span className="text-[#2B2B2B]">
                    Your domain has <span className="text-[#D00416] font-semibold">{criticalCount} Critical {criticalCount === 1 ? "Issue" : "Issues"}</span> that {criticalCount === 1 ? "needs" : "need"} immediate attention:
                  </span>
                  <span className="text-[#919191]">
                    {" "}{criticalText}
                  </span>
                </p>
              </div>
              <div className="flex items-start gap-4">
                <CustomCheckIcon className="text-[#1DAF61] shrink-0 mt-0.5" />
                <p>
                  <span className="text-[#2B2B2B]">
                    <span className="text-[#D00416] font-semibold">{highCount} high-severity {highCount === 1 ? "finding" : "findings"}</span> compound the risk:
                  </span>
                  <span className="text-[#919191]">
                    {" "}{highText}
                  </span>
                </p>
              </div>
              <div className="flex items-start gap-4">
                <CustomCheckIcon className="text-[#1DAF61] shrink-0 mt-0.5" />
                <p>
                  <span className="text-[#0BA352] font-semibold">The good news:</span>
                  <span className="text-[#919191]">
                    {" "}{goodNewsText}{" "}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              {detailsHref ? (
                <Button
                  asChild
                  variant={"ghost"}
                  className="p-0! h-auto! flex gap-1.5 text-[#0C2B21] hover:bg-transparent text-[16px] font-medium"
                >
                  <Link href={detailsHref}>
                    View Details <ChevronRight size={18} />
                  </Link>
                </Button>
              ) : (
                <Button
                  variant={"ghost"}
                  disabled
                  className="p-0! h-auto! flex gap-1.5 text-[#9CA3AF] hover:bg-transparent text-[16px] font-medium"
                >
                  View Details <ChevronRight size={18} />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
      <Card>
        <div className="space-y-5">
          <h2 className="font-semibold text-neutral-800">Our findings:</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {findings.map((result, idx) => (
              <FindingsItemCard
                key={idx}
                score={result.score}
                severityCount={result.findingsCount}
                description={result.description}
              />
            ))}
          </div>
        </div>
      </Card>
      <div className="grid md:grid-cols-3 gap-4">
        <ScanReportScoreStatCard
          score={report.subScores.exposure.score}
          type="Exposure"
          description={report.subScores.exposure.detail || "Exposed assets and public endpoints check."}
        />
        <ScanReportScoreStatCard
          score={report.subScores.ssl.score}
          type="SSL"
          description={report.subScores.ssl.detail || "TLS/SSL configuration and cipher suite safety."}
        />
        <ScanReportScoreStatCard
          score={report.subScores.dns.score}
          type="DNS"
          description={report.subScores.dns.detail || "MX, SPF, DMARC, and DNS record delegation."}
        />
      </div>
    </div>
  );
}

export default function ScanReportPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0BA352]" />
      </div>
    }>
      <ScanReportContent />
    </Suspense>
  );
}
