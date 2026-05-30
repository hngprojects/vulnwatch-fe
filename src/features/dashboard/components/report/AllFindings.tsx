"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Severity = "High" | "Medium" | "Low";
type FindingType = "Exposure" | "SSL";
type FindingTab = "All Findings" | "Monitoring" | "Compliance";

type Finding = {
  id: string;
  severity: Severity;
  title: string;
  description: string;
  type: FindingType;
  domain: string;
  tab: FindingTab[];
};

const findings: Finding[] = [
  {
    id: "f1",
    severity: "High",
    title: "SQL Injection Vulnerability",
    description: "Unsanitized user input detected in query parameters that could allow SQL injection attacks.",
    type: "Exposure",
    domain: "app.mycompany.com",
    tab: ["All Findings", "Monitoring"],
  },
  {
    id: "f2",
    severity: "High",
    title: "Open Redirect Detected",
    description: "Redirect URL parameter accepts arbitrary external domains without validation.",
    type: "Exposure",
    domain: "app.mycompany.com",
    tab: ["All Findings", "Monitoring"],
  },
  {
    id: "f3",
    severity: "High",
    title: "Broken Authentication",
    description: "Session tokens not invalidated after logout, allowing session replay attacks.",
    type: "Exposure",
    domain: "api.mycompany.com",
    tab: ["All Findings", "Compliance"],
  },
  {
    id: "f4",
    severity: "Medium",
    title: "Cross-Site Scripting (XSS)",
    description: "Reflected XSS found in search input field — user data rendered without encoding.",
    type: "Exposure",
    domain: "www.mycompany.com",
    tab: ["All Findings", "Monitoring"],
  },
  {
    id: "f5",
    severity: "Medium",
    title: "CSRF Token Missing",
    description: "State-changing POST endpoints lack CSRF token validation.",
    type: "Exposure",
    domain: "app.mycompany.com",
    tab: ["All Findings", "Compliance"],
  },
  {
    id: "f6",
    severity: "Medium",
    title: "Sensitive Information Disclosure",
    description: "Server error responses expose stack traces and internal paths.",
    type: "Exposure",
    domain: "api.mycompany.com",
    tab: ["All Findings", "Monitoring"],
  },
  {
    id: "f7",
    severity: "Low",
    title: "Missing Security Headers",
    description: "Content-Security-Policy and X-Frame-Options headers are not configured.",
    type: "Exposure",
    domain: "www.mycompany.com",
    tab: ["All Findings", "Compliance"],
  },
  {
    id: "f8",
    severity: "Low",
    title: "SSL Certificate Expiry Soon",
    description: "TLS certificate for the primary domain expires in 14 days.",
    type: "SSL",
    domain: "www.mycompany.com",
    tab: ["All Findings", "Monitoring"],
  },
];

const severityStyles: Record<Severity, { badge: string; dot: string }> = {
  High: {
    badge: "bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]",
    dot: "bg-[#EF4444]",
  },
  Medium: {
    badge: "bg-[#FFFBEB] text-[#F59E0B] border border-[#FDE68A]",
    dot: "bg-[#F59E0B]",
  },
  Low: {
    badge: "bg-[#F0FDF4] text-[#22C55E] border border-[#BBF7D0]",
    dot: "bg-[#22C55E]",
  },
};

const typeStyles: Record<FindingType, string> = {
  Exposure: "bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD]",
  SSL: "bg-[#FAF5FF] text-[#7C3AED] border border-[#DDD6FE]",
};

const TABS: FindingTab[] = ["All Findings", "Monitoring", "Compliance"];

function FindingCard({ finding }: { finding: Finding }) {
  const { badge } = severityStyles[finding.severity];
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_4px_rgba(17,24,39,0.03)] sm:flex-row sm:items-start sm:gap-4">
      {/* Severity badge */}
      <span
        className={cn(
          "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold shrink-0",
          badge,
        )}
      >
        {finding.severity}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#2B2B2B]">{finding.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">{finding.description}</p>
        <p className="mt-2 text-xs text-[#9CA3AF]">{finding.domain}</p>
      </div>

      {/* Type chip */}
      <span
        className={cn(
          "inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium shrink-0 border",
          typeStyles[finding.type],
        )}
      >
        {finding.type}
      </span>
    </article>
  );
}

export default function AllFindings() {
  const [activeTab, setActiveTab] = useState<FindingTab>("All Findings");

  const visible = findings.filter((f) => f.tab.includes(activeTab));

  return (
    <div className="px-4 py-5 md:px-6 lg:px-4 lg:py-3">
      <div className="space-y-6">
        {/* Back link */}
        <Link
          href="/report"
          className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] transition-colors hover:text-[#2B2B2B]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
          Back to Report Overview
        </Link>

        {/* Header */}
        <header>
          <h1 className="text-2xl font-bold text-[#2B2B2B] sm:text-3xl">All Findings</h1>
          <p className="mt-1 text-sm text-[#6B7280]">8 issues across 5 modules</p>
        </header>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-[#E5E7EB]">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 pb-3 pt-1 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "border-b-2 border-[#072E28] text-[#072E28]"
                  : "text-[#6B7280] hover:text-[#2B2B2B]",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-sm text-[#6B7280]">
          {visible.length} {visible.length === 1 ? "finding" : "findings"}
        </p>

        {/* Findings list */}
        <div className="space-y-3">
          {visible.map((finding) => (
            <FindingCard key={finding.id} finding={finding} />
          ))}
        </div>
      </div>
    </div>
  );
}
