import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleGauge,
  Globe2,
  RotateCw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldEllipsis,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type RiskLevel = "Low" | "High" | "Critical";

type ReportRow = {
  id: string;
  date: string;
  time: string;
  scanType: "Quick Scan" | "Full Scan";
  riskLevel: RiskLevel;
  status: string;
};

type SummaryCard = {
  label: string;
  value: number;
  icon: React.ElementType;
  iconClassName: string;
  iconWrapClassName: string;
};

const summaryCards: SummaryCard[] = [
  {
    label: "Total Scans",
    value: 24,
    icon: CircleGauge,
    iconClassName: "text-brand-info",
    iconWrapClassName: "bg-brand-info-bg",
  },
  {
    label: "High Risk Found",
    value: 7,
    icon: ShieldAlert,
    iconClassName: "text-brand-risk-critical",
    iconWrapClassName: "bg-brand-risk-critical-bg",
  },
  {
    label: "Medium Risk Found",
    value: 13,
    icon: ShieldEllipsis,
    iconClassName: "text-brand-risk-high",
    iconWrapClassName: "bg-brand-risk-high-bg",
  },
  {
    label: "Low Risk Found",
    value: 32,
    icon: ShieldCheck,
    iconClassName: "text-brand-risk-low",
    iconWrapClassName: "bg-brand-risk-low-bg",
  },
];

const reportRows: ReportRow[] = [
  {
    id: "report-2026-04-29",
    date: "April 29, 2026",
    time: "10:24 AM",
    scanType: "Quick Scan",
    riskLevel: "Low",
    status: "Good",
  },
  {
    id: "report-2026-04-20",
    date: "April 20, 2026",
    time: "10:04 AM",
    scanType: "Full Scan",
    riskLevel: "High",
    status: "Action Needed",
  },
  {
    id: "report-2026-04-10",
    date: "April 10, 2026",
    time: "09:28 AM",
    scanType: "Full Scan",
    riskLevel: "Low",
    status: "Good",
  },
  {
    id: "report-2026-04-07",
    date: "April 07, 2026",
    time: "11:34 AM",
    scanType: "Quick Scan",
    riskLevel: "Critical",
    status: "Immediate Action Required",
  },
  {
    id: "report-2026-04-02",
    date: "April 02, 2026",
    time: "01:40 PM",
    scanType: "Quick Scan",
    riskLevel: "High",
    status: "Action Needed",
  },
];

const riskDotClassName: Record<RiskLevel, string> = {
  Low: "bg-brand-risk-low",
  High: "bg-brand-risk-high",
  Critical: "bg-brand-risk-critical",
};

const currentPage = 1;
const pageSize = 5;
const totalReports = 24;
const totalPages = Math.ceil(totalReports / pageSize);

function ScanTypeIcon({ scanType }: { scanType: ReportRow["scanType"] }) {
  const Icon = scanType === "Quick Scan" ? RotateCw : Shield;

  return <Icon className="h-4 w-4 shrink-0 text-gray-700" strokeWidth={1.8} />;
}

function RiskIndicator({ level, status }: { level: RiskLevel; status: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span
          className={cn("h-2 w-2 rounded-full", riskDotClassName[level])}
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-brand-dark">{level}</span>
      </div>
      <p className="text-sm text-brand-gray">{status}</p>
    </div>
  );
}

function SummaryCards() {
  return (
    <section
      aria-label="Report summary"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-20"
    >
      {summaryCards.map(
        ({ label, value, icon: Icon, iconClassName, iconWrapClassName }) => (
          <article
            key={label}
            className="flex min-h-14 items-center justify-between rounded-md border border-brand-border-light bg-white px-3 py-2 shadow-[0_1px_4px_rgba(17,24,39,0.03)]"
          >
            <div>
              <p className="text-sm leading-5 text-brand-gray">{label}</p>
              <p className="text-base leading-5 font-semibold text-brand-dark">
                {value}
              </p>
            </div>
            <span
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full",
                iconWrapClassName,
              )}
              aria-hidden="true"
            >
              <Icon className={cn("h-4 w-4", iconClassName)} strokeWidth={1.8} />
            </span>
          </article>
        ),
      )}
    </section>
  );
}

function ReportsTable() {
  return (
    <div className="hidden overflow-hidden rounded-md border border-brand-border-light bg-white lg:block">
      <table className="w-full table-fixed text-left">
        <thead className="bg-gray-50 text-sm font-semibold text-brand-dark">
          <tr>
            <th scope="col" className="w-[33%] px-8 py-5">
              Scan Date &amp; Time
            </th>
            <th scope="col" className="w-[25%] px-8 py-5">
              Scan Type
            </th>
            <th scope="col" className="w-[25%] px-8 py-5">
              Risk Level
            </th>
            <th scope="col" className="w-[17%] px-8 py-5">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-border-light">
          {reportRows.map((report) => (
            <tr key={report.id} className="align-top">
              <td className="px-8 py-3.5">
                <p className="text-sm font-medium text-brand-dark">
                  {report.date}
                </p>
                <p className="mt-4 text-sm font-medium text-brand-muted">{report.time}</p>
              </td>
              <td className="px-8 py-3.5">
                <div className="flex items-center gap-2 text-sm font-medium text-brand-dark">
                  <ScanTypeIcon scanType={report.scanType} />
                  {report.scanType}
                </div>
              </td>
              <td className="px-8 py-3.5">
                <RiskIndicator level={report.riskLevel} status={report.status} />
              </td>
              <td className="px-8 py-3.5">
                <Link
                  href="/scan/report"
                  className="inline-flex items-center gap-3 text-sm font-medium text-brand-dark transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label={`View details for ${report.date} ${report.scanType}`}
                >
                  View Details
                  <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}

function MobileReportCards() {
  return (
    <div className="space-y-3 lg:hidden">
      {reportRows.map((report) => (
        <article
          key={report.id}
          className="rounded-lg border border-brand-border-light bg-white p-4 shadow-[0_1px_4px_rgba(17,24,39,0.03)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-brand-dark">
                {report.date}
              </p>
              <p className="mt-1 text-sm text-brand-gray">{report.time}</p>
            </div>
            <Link
              href="/scan/report"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-brand-border-light text-brand-dark transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`View details for ${report.date} ${report.scanType}`}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.04em] text-brand-text-light">
                Scan Type
              </p>
              <div className="mt-2 flex items-center gap-2 text-sm font-medium text-brand-dark">
                <ScanTypeIcon scanType={report.scanType} />
                {report.scanType}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.04em] text-brand-text-light">
                Risk Level
              </p>
              <div className="mt-2">
                <RiskIndicator level={report.riskLevel} status={report.status} />
              </div>
            </div>
          </div>
        </article>
      ))}
      <Pagination />
    </div>
  );
}

function Pagination() {
  const firstItem = (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalReports);
  const pageNumbers = ["1", "2", "3", "...", String(totalPages)];

  return (
    <nav
      aria-label="Report pagination"
      className="flex flex-col gap-4 border-t border-brand-border-light px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8"
    >
      <p className="text-sm text-brand-gray">
        Showing {firstItem} to {lastItem} of {totalReports} reports
      </p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand-sidebar-bg text-brand-disabled disabled:cursor-not-allowed"
          aria-label="Previous page"
          disabled
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
        </button>
        {pageNumbers.map((page) =>
          page === "..." ? (
            <span key={page} className="px-1 text-sm text-brand-gray">
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-md border text-sm transition-colors disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                page === "1"
                  ? "border-primary text-brand-dark"
                  : "border-brand-sidebar-bg text-brand-gray",
              )}
              aria-current={page === "1" ? "page" : undefined}
              disabled
            >
              {page}
            </button>
          ),
        )}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand-sidebar-bg text-brand-disabled disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Next page"
          disabled
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>
    </nav>
  );
}

export default function Report() {
  return (
    <div className="px-4 py-5 md:px-6 lg:px-4 lg:py-3">
      <div className="space-y-6">
        <header>
          <h1 className="text-xl font-bold leading-7 text-brand-dark">Reports</h1>
          <p className="mt-1 text-sm text-brand-gray">
            View and manage all your security scan reports
          </p>
        </header>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-dark"
              aria-hidden="true"
            >
              <Globe2 className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div>
              <h2 className="text-base font-semibold text-brand-dark">Domain</h2>
              <p className="mt-1 text-sm text-brand-gray">www.mycompany.com</p>
            </div>
          </div>

          <button
            type="button"
            className="flex h-12 w-full items-center justify-between rounded-md border border-brand-border-light bg-white px-5 text-sm font-medium text-brand-dark shadow-[0_1px_4px_rgba(17,24,39,0.03)] disabled:cursor-not-allowed disabled:opacity-75 md:w-72"
            disabled
          >
            <span className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5" strokeWidth={1.8} />
              Date Range
            </span>
            <ChevronDown className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        <SummaryCards />

        <section aria-label="Scan reports" className="pt-3">
          <ReportsTable />
          <MobileReportCards />
        </section>
      </div>
    </div>
  );
}
