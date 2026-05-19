import { Button } from "@/components/ui/button";
import {
  SCAN_RESULTS,
  SCAN_RESULTS_STATS,
} from "@/features/scans/scan-report/lib/constants";
import FindingsItemCard from "@/features/scans/scan-report/ui/FindingsItemCard";
import ScanReportPageHeader from "@/features/scans/scan-report/ui/ScanReportPageHeader";
import ScanReportScoreStatCard from "@/features/scans/scan-report/ui/ScanReportStatCard";
import Card from "@/features/scans/shared/ui/Card";
import ScanningProgress from "@/features/scans/shared/ui/ScanningProgress";
import PageHeader from "@/features/scans/shared/ui/PageHeader";
import { CheckCircle, ChevronRight } from "lucide-react";
import { CircularProgress } from "@/features/scans/shared/ui/CircularProgress";
import SecurityScoreCard from "@/features/scans/scan-report/ui/SecurityScoreCard";

export default function ScanReportPage() {
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
            <h2 className="font-medium text-neutral-800">
              Your security summary:
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-scan-green-400" size={52} />

                <p>
                  Your domain has{" "}
                  <span className="text-scan-red-400">1 Critical</span> Issue
                  that need immediate attention: The missing HSTS header leaves
                  every visitor exposed to potential traffic interception,
                  especially on public networks.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={52} className="text-scan-green-400" />
                <p>
                  <span className="text-scan-red-400">
                    2 high-severity findings
                  </span>{" "}
                  compound the risk: Your admin panel is publicly reachable and
                  being actively targeted by automated bots, and your robots.txt
                  file is advertising internal paths.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={52} className="text-scan-green-400" />
                <p>
                  <span className="text-scan-green-400">The good news:</span>{" "}
                  All three of these are configuration fixes don’t require code
                  changes and can typically be resolved in under an hour.
                  Prioritise the HSTS header and admin panel restriction first.
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button variant={"ghost"} className="p-0! h-auto! flex gap-2">
                View Details <ChevronRight />
              </Button>
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
