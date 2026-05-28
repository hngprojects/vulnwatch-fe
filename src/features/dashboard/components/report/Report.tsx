import {
  AlertTriangle,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Globe2,
  RotateCw,
  Shield,
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

function ScanTypeIcon({ scanType }: { scanType: ReportRow["scanType"] }) {
  const Icon = scanType === "Quick Scan" ? RotateCw : Shield;
  return <Icon className="h-4 w-4 shrink-0 text-gray-700" strokeWidth={1.8} />;
}

function RiskIndicator({ level, status }: { level: RiskLevel; status: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className={cn("h-2 w-2 rounded-full", riskDotClassName[level])} aria-hidden="true" />
        <span className="text-sm font-medium text-brand-dark">{level}</span>
      </div>
      <p className="text-sm text-brand-gray">{status}</p>
    </div>
  );
}

function TopSummaryCards() {
  const cards = [
    { label: "Security Score", value: "78", suffix: "/100", trend: "+12% vs last month" },
    { label: "Monitored Domains", value: "2", suffix: "", trend: "+12% vs last month" },
    { label: "Resolved", value: "10", suffix: "", trend: "+12% vs last month" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_4px_rgba(17,24,39,0.03)]"
        >
          <p className="text-sm text-[#6B7280]">{card.label}</p>
          <p className="mt-1 text-2xl font-bold text-[#2B2B2B]">
            {card.value}
            {card.suffix && (
              <span className="text-base font-normal text-[#9CA3AF]">{card.suffix}</span>
            )}
          </p>
          <p className="mt-2 flex items-center gap-1 text-xs font-medium text-[#22C55E]">
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
            {card.trend}
          </p>
        </div>
      ))}
    </div>
  );
}

function RiskCards() {
  const risks = [
    { label: "High Risk Found", value: 2, color: "#EF4444", bg: "#FEF2F2" },
    { label: "Medium Risk Found", value: 0, color: "#F59E0B", bg: "#FFFBEB" },
    { label: "Low Risk Found", value: 5, color: "#22C55E", bg: "#F0FDF4" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {risks.map((risk) => (
        <div
          key={risk.label}
          className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_4px_rgba(17,24,39,0.03)]"
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: risk.bg }}
          >
            <AlertTriangle className="h-5 w-5" style={{ color: risk.color }} strokeWidth={1.8} />
          </div>
          <p className="mt-3 text-2xl font-bold text-[#2B2B2B]">{risk.value}</p>
          <p className="mt-1 text-sm text-[#6B7280]">{risk.label}</p>
        </div>
      ))}
    </div>
  );
}

function RecentScansTable() {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white lg:block">
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
          {reportRows.map((report) => (
            <tr key={report.id} className="align-top">
              <td className="px-8 py-4">
                <p className="text-sm font-medium text-[#2B2B2B]">{report.date}</p>
                <p className="mt-1 text-sm text-[#9CA3AF]">{report.time}</p>
              </td>
              <td className="px-8 py-4">
                <div className="flex items-center gap-2 text-sm font-medium text-[#2B2B2B]">
                  <ScanTypeIcon scanType={report.scanType} />
                  {report.scanType}
                </div>
              </td>
              <td className="px-8 py-4">
                <RiskIndicator level={report.riskLevel} status={report.status} />
              </td>
              <td className="px-8 py-4">
                <Link
                  href="/scan/report"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2B2B2B] transition-colors hover:text-primary"
                  aria-label={`View details for ${report.date} ${report.scanType}`}
                >
                  View Details
                  <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RecentScansMobileCards() {
  return (
    <div className="space-y-3 lg:hidden">
      {reportRows.map((report) => (
        <article
          key={report.id}
          className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_4px_rgba(17,24,39,0.03)]"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#2B2B2B]">{report.date}</p>
              <p className="mt-1 text-sm text-[#9CA3AF]">{report.time}</p>
            </div>
            <Link
              href="/scan/report"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#E5E7EB] text-[#2B2B2B] transition-colors hover:bg-gray-50"
              aria-label={`View details for ${report.date} ${report.scanType}`}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#9CA3AF]">Scan Type</p>
              <div className="mt-2 flex items-center gap-2 text-sm font-medium text-[#2B2B2B]">
                <ScanTypeIcon scanType={report.scanType} />
                {report.scanType}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#9CA3AF]">Risk Level</p>
              <div className="mt-2">
                <RiskIndicator level={report.riskLevel} status={report.status} />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Report() {
  return (
    <div className="px-4 py-5 md:px-6 lg:px-4 lg:py-3">
      <div className="space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-bold text-[#2B2B2B] sm:text-3xl">Report Overview</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Summary of all security report</p>
        </header>

        {/* Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            disabled
            className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm font-medium text-[#2B2B2B] shadow-[0_1px_4px_rgba(17,24,39,0.03)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Globe2 className="h-4 w-4" strokeWidth={1.8} />
            All Domain
            <ChevronDown className="h-4 w-4" strokeWidth={1.8} />
          </button>
          <Link
            href="/report/findings"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#072E28] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            View all findings
          </Link>
        </div>

        {/* Top summary cards */}
        <TopSummaryCards />

        {/* Risk cards */}
        <RiskCards />

        {/* Recent Scans */}
        <section aria-label="Recent scans">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#2B2B2B]">Recent Scans</h2>
            <Link
              href="/report/findings"
              className="flex items-center gap-1 text-sm font-medium text-[#072E28] transition-colors hover:opacity-80"
            >
              View all
              <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
          <RecentScansTable />
          <RecentScansMobileCards />
        </section>
      </div>
    </div>
  );
}
