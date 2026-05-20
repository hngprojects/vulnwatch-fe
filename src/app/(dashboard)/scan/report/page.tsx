import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SCAN_RESULTS,
  SCAN_RESULTS_STATS,
} from "@/features/scans/scan-report/lib/constants";
import FindingsItemCard from "@/features/scans/scan-report/ui/FindingsItemCard";
import ScanReportPageHeader from "@/features/scans/scan-report/ui/ScanReportPageHeader";
import ScanReportScoreStatCard from "@/features/scans/scan-report/ui/ScanReportStatCard";
import Card from "@/features/scans/shared/ui/Card";
import PageHeader from "@/features/scans/shared/ui/PageHeader";
import { ChevronRight } from "lucide-react";
import SecurityScoreCard from "@/features/scans/scan-report/ui/SecurityScoreCard";

const CustomCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.12042 1.74595C5.8921 1.68437 6.62469 1.38092 7.21389 0.878803C8.58886 -0.292934 10.6111 -0.292934 11.9861 0.878803C12.5753 1.38092 13.3079 1.68437 14.0796 1.74595C15.8804 1.88965 17.3103 3.31963 17.4541 5.12042C17.5156 5.8921 17.8191 6.62469 18.3212 7.21389C19.4929 8.58886 19.4929 10.6111 18.3212 11.9861C17.8191 12.5753 17.5156 13.3079 17.4541 14.0796C17.3103 15.8804 15.8804 17.3103 14.0796 17.4541C13.3079 17.5156 12.5753 17.8191 11.9861 18.3212C10.6111 19.4929 8.58886 19.4929 7.21389 18.3212C6.62469 17.8191 5.8921 17.5156 5.12042 17.4541C3.31963 17.3103 1.88965 15.8804 1.74595 14.0796C1.68437 13.3079 1.38092 12.5753 0.878803 11.9861C-0.292934 10.6111 -0.292934 8.58886 0.878803 7.21389C1.38092 6.62469 1.68437 5.8921 1.74595 5.12042C1.88965 3.31963 3.31963 1.88965 5.12042 1.74595ZM14.0485 8.04853C14.5172 7.5799 14.5172 6.8201 14.0485 6.35147C13.5799 5.88284 12.8201 5.88284 12.3515 6.35147L8.4 10.3029L6.84853 8.75147C6.3799 8.28284 5.6201 8.28284 5.15147 8.75147C4.68284 9.2201 4.68284 9.9799 5.15147 10.4485L7.55147 12.8485C8.0201 13.3172 8.7799 13.3172 9.24853 12.8485L14.0485 8.04853Z" fill="currentColor"/>
  </svg>
);

export default async function ScanReportPage({
  searchParams,
}: {
  searchParams: Promise<{ scanId?: string | string[] }>;
}) {
  const { scanId } = await searchParams;
  const activeScanId = Array.isArray(scanId) ? scanId[0] : scanId;
  const detailsHref = activeScanId
    ? `/scan/${encodeURIComponent(activeScanId)}/ai-summary`
    : null;

  return (
    <div className="space-y-5 p-5">
      <ScanReportPageHeader />
      <PageHeader
        title="Security Scan Report"
        description={
          <div className="flex items-center gap-2">
            <span className="font-semibold">Scan type: </span>
            <span className="font-semibold">Quick Scan</span>
            <div className="size-2 bg-neutral-300 rounded-full"></div>
            <span className="text-neutral-500">Scanned 25th April 2026</span>
          </div>
        }
      />
      <div className="grid sm:grid-cols-[250px_1fr] gap-5">
        <SecurityScoreCard score={54} />
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
                    Your domain has <span className="text-[#D00416]">1 Critical Issue</span> that need immediate attention:
                  </span>
                  <span className="text-[#919191]">
                    {" "}The missing HSTS header leaves every visitor exposed to potential traffic interception, especially on public networks.
                  </span>
                </p>
              </div>
              <div className="hidden md:flex items-start gap-4">
                <CustomCheckIcon className="text-[#1DAF61] shrink-0 mt-0.5" />
                <p>
                  <span className="text-[#2B2B2B]">
                    <span className="text-[#D00416]">2 high-severity findings</span> compound the risk:
                  </span>
                  <span className="text-[#919191]">
                    {" "}Your admin panel is publicly reachable and being actively targeted by automated bots, and your robots.txt file is advertising internal paths.
                  </span>
                </p>
              </div>
              <div className="hidden md:flex items-start gap-4">
                <CustomCheckIcon className="text-[#1DAF61] shrink-0 mt-0.5" />
                <p>
                  <span className="text-[#0BA352]">The good news:</span>
                  <span className="text-[#919191]">
                    {" "}All three of these are configuration fixes donâ€™t require code changes and can typically be resolved in under an hour.{" "}
                  </span>
                  <span className="text-[#2B2B2B]">
                    Prioritise the HSTS header and admin panel restriction first.
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
            {SCAN_RESULTS.map((result, idx) => (
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
        {SCAN_RESULTS_STATS.map((stat, idx) => (
          <ScanReportScoreStatCard
            key={idx}
            score={stat.score}
            type={stat.type}
            description={stat.description}
          />
        ))}
      </div>
    </div>
  );
}
