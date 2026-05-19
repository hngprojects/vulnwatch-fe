"use client";

import { useState } from "react";
import {
  Globe,
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  MoreVertical,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DomainEmptyState from "./DomainEmptyState";
import type { Domain, DomainStatus, VerificationMethod } from "../types/domain.types";

interface Props {
  domains: Domain[];
  onAddDomain: () => void;
}

const METHOD_LABELS: Record<VerificationMethod, string> = {
  DNS_TXT: "DNS TXT",
  FILE_UPLOAD: "File Upload",
  EMAIL: "Email Verification",
};

const METHOD_COLORS: Record<VerificationMethod, string> = {
  DNS_TXT: "bg-[#EFF6FF] text-[#3B82F6]",
  FILE_UPLOAD: "bg-[#F5F3FF] text-[#7C3AED]",
  EMAIL: "bg-[#FFF7ED] text-[#F59E0B]",
};

const STATUS_COLORS: Record<DomainStatus, string> = {
  VERIFIED: "bg-[#ECFDF5] text-[#10B981]",
  PENDING: "bg-[#FFF7ED] text-[#F59E0B]",
  FAILED: "bg-[#FEF2F2] text-[#EF4444]",
};

const STATUS_DOTS: Record<DomainStatus, string> = {
  VERIFIED: "bg-[#10B981]",
  PENDING: "bg-[#F59E0B]",
  FAILED: "bg-[#EF4444]",
};

function scoreLabel(score: number | null): string {
  if (score === null) return "Not available";
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";
  return "Poor";
}

function scoreColor(score: number | null): string {
  if (score === null) return "text-[#9CA3AF]";
  if (score >= 90) return "text-[#10B981]";
  if (score >= 70) return "text-[#3B82F6]";
  if (score >= 50) return "text-[#F59E0B]";
  return "text-[#EF4444]";
}

function scoreBorderColor(score: number | null): string {
  if (score === null) return "border-[#E5E7EB]";
  if (score >= 90) return "border-[#10B981]";
  if (score >= 70) return "border-[#3B82F6]";
  if (score >= 50) return "border-[#F59E0B]";
  return "border-[#EF4444]";
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function DomainTable({ domains, onAddDomain }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<DomainStatus | "ALL">("ALL");
  const [filterOpen, setFilterOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filtered = domains.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-[#E5E7EB]">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          />
          <input
            type="text"
            placeholder="Search domains..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 h-9 text-sm rounded-lg border border-[#E5E7EB] bg-white text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#072E28]/20"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <button
              onClick={() => setFilterOpen((o) => !o)}
              className="flex items-center gap-1.5 h-9 px-3 text-sm rounded-lg border border-[#E5E7EB] bg-white text-[#374151] hover:bg-[#F9FAFB]"
            >
              <span>
                {statusFilter === "ALL"
                  ? "All Status"
                  : statusFilter.charAt(0) + statusFilter.slice(1).toLowerCase()}
              </span>
              <ChevronDown size={14} />
            </button>
            {filterOpen && (
              <div className="absolute right-0 top-10 z-10 w-36 bg-white rounded-xl border border-[#E5E7EB] shadow-lg overflow-hidden">
                {(["ALL", "VERIFIED", "PENDING", "FAILED"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setStatusFilter(s);
                      setFilterOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[#374151] hover:bg-[#F9FAFB]"
                  >
                    {s === "ALL" ? "All Status" : s.charAt(0) + s.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center gap-1.5 h-9 px-3 text-sm rounded-lg border border-[#E5E7EB] bg-white text-[#374151] hover:bg-[#F9FAFB]">
            <Filter size={14} />
            <span>Filter</span>
          </button>

          <button className="flex items-center gap-1.5 h-9 px-3 text-sm rounded-lg border border-[#E5E7EB] bg-white text-[#374151] hover:bg-[#F9FAFB]">
            <ArrowUpDown size={14} />
            <span>Sort</span>
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <DomainEmptyState onAddDomain={onAddDomain} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    Domain
                    <ArrowUpDown size={12} className="text-[#9CA3AF]" />
                  </span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] whitespace-nowrap">
                  Verification Method
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    Status
                    <ArrowUpDown size={12} className="text-[#9CA3AF]" />
                  </span>
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] whitespace-nowrap">
                  Last Scan
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] whitespace-nowrap">
                  Security Score
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((domain) => (
                <tr
                  key={domain.id}
                  className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-[#F9FAFB]"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#F3F4F6] flex items-center justify-center shrink-0">
                        <Globe size={14} className="text-[#6B7280]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#111827]">{domain.name}</p>
                        <p className="text-xs text-[#9CA3AF]">
                          Added on {formatDate(domain.createdAt)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${METHOD_COLORS[domain.verificationMethod]}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {METHOD_LABELS[domain.verificationMethod]}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[domain.status]}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${STATUS_DOTS[domain.status]}`}
                      />
                      {domain.status.charAt(0) + domain.status.slice(1).toLowerCase()}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-[#6B7280] whitespace-nowrap">
                    {domain.lastScan ? (
                      <>
                        <p>{formatDate(domain.lastScan)}</p>
                        <p className="text-xs text-[#9CA3AF]">
                          {new Date(domain.lastScan).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </>
                    ) : (
                      <span className="text-[#9CA3AF] text-xs">Not scanned yet</span>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    {domain.securityScore !== null ? (
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold ${scoreBorderColor(domain.securityScore)} ${scoreColor(domain.securityScore)}`}
                        >
                          {domain.securityScore}
                        </div>
                        <span className={`text-sm font-medium ${scoreColor(domain.securityScore)}`}>
                          {scoreLabel(domain.securityScore)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#9CA3AF]">Not available</span>
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-8 px-3 rounded-lg border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB]"
                      >
                        View Details
                      </Button>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenuId(openMenuId === domain.id ? null : domain.id)
                          }
                          className="w-8 h-8 rounded-lg border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB]"
                        >
                          <MoreVertical size={14} />
                        </button>
                        {openMenuId === domain.id && (
                          <div className="absolute right-0 top-9 z-10 w-32 bg-white rounded-xl border border-[#E5E7EB] shadow-lg overflow-hidden">
                            <button className="w-full text-left px-4 py-2 text-sm text-[#374151] hover:bg-[#F9FAFB]">
                              Re-verify
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-[#FEF2F2]">
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
