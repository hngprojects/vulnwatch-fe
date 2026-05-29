import { AlertTriangle, ChevronRight, Loader2, Shield } from "lucide-react";
import Link from "next/link";
import { ScanHistoryItem } from "@/features/scans/services/scan.service";
import { parseDateTime, ScanTypeIcon, RiskIndicator } from "./report-utils";
import { ReportPagination } from "./ReportPagination";

interface ReportScansTableProps {
  history: ScanHistoryItem[];
  loading: boolean;
  domainId: string | null;
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export function ReportScansTable({
  history,
  loading,
  domainId,
  page,
  totalPages,
  onPageChange,
}: ReportScansTableProps) {
  return (
    <section aria-label="Recent scans">
      <h2 className="mb-4 text-lg font-semibold text-[#2B2B2B]">Recent Scans</h2>

      {loading ? (
        <div className="flex h-40 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white">
          <Loader2 className="h-6 w-6 animate-spin text-[#072e28]" />
        </div>
      ) : !domainId ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-white text-center">
          <AlertTriangle className="mb-2 h-6 w-6 text-[#9CA3AF]" />
          <p className="text-sm text-[#6B7280]">Select a domain to view scan history</p>
        </div>
      ) : history.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-[#E5E7EB] bg-white text-center">
          <Shield className="mb-2 h-6 w-6 text-[#9CA3AF]" strokeWidth={1.8} />
          <p className="text-sm font-medium text-[#2B2B2B]">No scans yet</p>
          <p className="mt-1 text-xs text-[#9CA3AF]">Run a scan on this domain to see history here</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white md:block">
            <table className="w-full table-fixed text-left">
              <thead className="bg-gray-50 text-sm font-semibold text-[#2B2B2B]">
                <tr>
                  <th scope="col" className="w-[33%] px-8 py-5">Scan Date &amp; Time</th>
                  <th scope="col" className="w-[25%] px-8 py-5">Scan Type</th>
                  <th scope="col" className="w-[25%] px-8 py-5">Risk Level</th>
                  <th scope="col" className="w-[17%] px-8 py-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {history.map((run) => {
                  const { date, time } = parseDateTime(run.createdAt);
                  const isCompleted = run.status.toLowerCase() === "completed";
                  return (
                    <tr key={run.scanId} className="align-top">
                      <td className="px-8 py-4">
                        <p className="text-sm font-medium text-[#2B2B2B]">{date}</p>
                        <p className="mt-1 text-sm text-[#9CA3AF]">{time}</p>
                      </td>
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-[#2B2B2B]">
                          <ScanTypeIcon coverage={run.coverage} />
                          {run.coverage || "Quick"} Scan
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <RiskIndicator level={run.riskLevel} />
                      </td>
                      <td className="px-8 py-4">
                        {isCompleted ? (
                          <Link
                            href={`/scan/report?scanId=${encodeURIComponent(run.scanId)}`}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2B2B2B] transition-colors hover:text-primary"
                            aria-label={`View details for scan on ${date}`}
                          >
                            View Details
                            <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
                          </Link>
                        ) : (
                          <Link
                            href={`/scan/progress?scanId=${encodeURIComponent(run.scanId)}&domain=${encodeURIComponent(run.domainName)}&initiatedAt=${encodeURIComponent(run.createdAt)}`}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-pending-text transition-colors hover:opacity-80"
                          >
                            Track Progress
                            <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {history.map((run) => {
              const { date, time } = parseDateTime(run.createdAt);
              const isCompleted = run.status.toLowerCase() === "completed";
              return (
                <article
                  key={run.scanId}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_4px_rgba(17,24,39,0.03)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[#2B2B2B]">{date}</p>
                      <p className="mt-1 text-sm text-[#9CA3AF]">{time}</p>
                    </div>
                    <Link
                      href={
                        isCompleted
                          ? `/scan/report?scanId=${encodeURIComponent(run.scanId)}`
                          : `/scan/progress?scanId=${encodeURIComponent(run.scanId)}&domain=${encodeURIComponent(run.domainName)}&initiatedAt=${encodeURIComponent(run.createdAt)}`
                      }
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#E5E7EB] text-[#2B2B2B] transition-colors hover:bg-gray-50"
                      aria-label={`${isCompleted ? "View details" : "Track progress"} for scan on ${date}`}
                    >
                      <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
                    </Link>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#9CA3AF]">Scan Type</p>
                      <div className="mt-2 flex items-center gap-2 text-sm font-medium text-[#2B2B2B]">
                        <ScanTypeIcon coverage={run.coverage} />
                        {run.coverage || "Quick"} Scan
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#9CA3AF]">Risk Level</p>
                      <div className="mt-2">
                        <RiskIndicator level={run.riskLevel} />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <ReportPagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
        </>
      )}
    </section>
  );
}
