"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Globe,
  Search,
  Filter,
  ArrowUpDown,
  ChevronDown,
  MoreVertical,
} from "lucide-react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DomainEmptyState from "./DomainEmptyState";
import DomainDetailsModal from "./DomainDetailsModal";
import type { Domain, DomainStatus, VerificationMethod } from "../types/domain.types";
import { toast } from "sonner";
import { domainService } from "../services/domain.service";

interface Props {
  domains: Domain[];
  loading?: boolean;
  error?: string | null;
  onAddDomain: () => void;
  onRetry?: () => void;
}

const METHOD_LABELS: Record<VerificationMethod, string> = {
  DNS_TXT: "DNS TXT",
  FILE_UPLOAD: "File Upload",
  EMAIL: "Email Verification",
};

const STATUS_COLORS: Record<DomainStatus, string> = {
  Verified: "bg-[#ECFDF5] text-[#10B981]",
  Pending: "bg-[#FFF7ED] text-[#F59E0B]",
  Failed: "bg-[#FEF2F2] text-[#EF4444]",
};

const STATUS_DOTS: Record<DomainStatus, string> = {
  Verified: "bg-[#10B981]",
  Pending: "bg-[#F59E0B]",
  Failed: "bg-[#EF4444]",
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

export default function DomainTable({ domains, loading = false, error = null, onAddDomain, onRetry }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<DomainStatus | "ALL">("ALL");
  const [filterOpen, setFilterOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [detailsDomain, setDetailsDomain] = useState<Domain | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openMenuId) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openMenuId]);

  // Only consider domains loaded once loading is done
  const hasDomains = !loading && domains.length > 0;

  const filtered = domains.filter((d) => {
    const matchesSearch = d.domain.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">

      {/* ── Top bar: always a flex row, search left (conditional), filters right ── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">

        {/* Search input — only when domains exist, sits on the left */}
        {hasDomains && (
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3C494E]"
            />
            <input
              type="text"
              placeholder="Search domains..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 h-10 text-[14px] font-medium rounded-[12px] border border-[#AABBCC] bg-white text-[#3C494E] placeholder:text-[#3C494ECC] placeholder:font-medium placeholder:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#072E28]/20"
            />
          </div>
        )}

        {/* Filters — ALWAYS visible, pushed to the right via ml-auto */}
        <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">

        {/* All Status — filter icon only on mobile */}
        <div className="relative flex-1 sm:flex-none">
          <button
            onClick={() => setFilterOpen((o) => !o)}
            className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-1.5 h-10 px-3 text-[14px] font-medium rounded-[12px] border border-[#AABBCC] bg-[#FFFFFF] text-[#3C494ECC] hover:bg-[#F9FAFB]"
          >
            <div className="flex items-center gap-1.5">
              {/* Filter icon: mobile only */}
              <Filter size={14} className="sm:hidden text-[#3C494ECC] stroke-[1.25]" />
              <span>
                {statusFilter === "ALL" ? "All Status" : statusFilter}
              </span>
            </div>
            <ChevronDown size={14} className="text-[#3C494ECC]" />
          </button>
          {filterOpen && (
            <div className="absolute left-0 sm:left-auto sm:right-0 top-11 z-10 w-full sm:w-36 bg-white rounded-[12px] border border-[#AABBCC] shadow-lg overflow-hidden">
              {(["ALL", "Verified", "Pending", "Failed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStatusFilter(s);
                    setFilterOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#374151] hover:bg-[#F9FAFB]"
                >
                  {s === "ALL" ? "All Status" : s}
                </button>
              ))}
            </div>
          )}
        </div>

          {/* All Method — mobile only */}
          <div className="relative flex-1 sm:hidden">
            <button className="flex items-center justify-between w-full gap-1.5 h-10 px-3 text-[14px] font-medium rounded-[12px] border border-[#AABBCC] bg-[#FFFFFF] text-[#3C494ECC] hover:bg-[#F9FAFB]">
              <span>All Method</span>
              <ChevronDown size={14} className="text-[#3C494ECC]" />
            </button>
          </div>

          {/* Desktop-only: Filter + Sort buttons */}
          <button className="hidden sm:flex items-center gap-1.5 h-10 px-3 text-sm rounded-[12px] border border-[#AABBCC] bg-[#FFFFFF] text-[#374151] hover:bg-[#F9FAFB]">
            <Filter size={14} />
            <span>Filter</span>
          </button>

          <button className="hidden sm:flex items-center gap-1.5 h-10 px-3 text-sm rounded-[12px] border border-[#AABBCC] bg-[#FFFFFF] text-[#374151] hover:bg-[#F9FAFB]">
            <ArrowUpDown size={14} />
            <span>Sort</span>
          </button>
        </div>
      </div>

      {/* ── Mobile Card List (hidden on sm+) ── */}
      <div className="sm:hidden flex flex-col gap-4">
        {loading ? (
          <div className="flex items-center justify-center py-16 bg-white rounded-[12px] border border-[#AABBCC]">
            <Loader2 size={24} className="animate-spin text-[#072E28]" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-[12px] border border-[#AABBCC] gap-3">
            <p className="text-sm text-[#6B7280] font-geist text-center">{error}</p>
            {onRetry && (
              <Button variant="outline" onClick={onRetry} className="text-sm">
                Retry
              </Button>
            )}
          </div>
        ) : !hasDomains ? (
          <div className="bg-white rounded-[12px] border border-[#AABBCC] p-8 shadow-sm">
            <DomainEmptyState onAddDomain={onAddDomain} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-[8px] border border-[#0000001A]">
            <p className="text-[16px] font-semibold text-[#2B2B2B] font-geist">No domains found</p>
            <p className="text-xs text-[#6B7280] font-geist mt-1 text-center">
              We couldn&apos;t find any domains matching your search or filters.
            </p>
          </div>
        ) : (
          filtered.map((domain) => (
            <div
              key={domain.id}
              className="bg-white rounded-[8px] border border-[#0000001A] p-4 flex flex-col gap-3 shadow-sm animate-in fade-in duration-200"
            >
              <p className="text-[20px] font-medium text-[#2B2B2B] font-geist leading-tight">
                {domain.domain}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-[14px] font-normal text-[#3C494E] font-geist">
                  {formatDate(domain.createdAt)}
                </p>
                <Link
                  href={`/domain/${domain.id}`}
                  className="text-[16px] font-bold text-[#2B2B2B] font-geist hover:underline cursor-pointer"
                >
                  View Domain
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Desktop Table (hidden on mobile) ── */}
      <div className="hidden sm:block bg-white rounded-[12px] border border-[#CCCCCC] overflow-hidden">
        <div className="overflow-x-auto min-h-[240px]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#CCCCCC] bg-[#F9FAFB]">
                <th className="text-left px-4 py-5 text-[14px] font-medium text-[#2B2B2B] whitespace-nowrap font-geist">
                  <span className="flex items-center gap-1">
                    Domain
                    <ArrowUpDown size={14} className="text-[#2B2B2B]" />
                  </span>
                </th>
                <th className="text-left px-4 py-5 text-[14px] font-medium text-[#2B2B2B] whitespace-nowrap font-geist">
                  Verification Method
                </th>
                <th className="text-left px-4 py-5 text-[14px] font-medium text-[#2B2B2B] whitespace-nowrap font-geist">
                  <span className="flex items-center gap-1">
                    Status
                    <ArrowUpDown size={14} className="text-[#2B2B2B]" />
                  </span>
                </th>
                <th className="text-left px-4 py-5 text-[14px] font-medium text-[#2B2B2B] whitespace-nowrap font-geist">
                  Last Scan
                </th>
                <th className="text-left px-4 py-5 text-[14px] font-medium text-[#2B2B2B] whitespace-nowrap font-geist">
                  Security Score
                </th>
                <th className="text-left px-4 py-5 text-[14px] font-medium text-[#2B2B2B] whitespace-nowrap font-geist">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="flex items-center justify-center">
                      <Loader2 size={24} className="animate-spin text-[#072E28]" />
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <p className="text-sm text-[#6B7280] font-geist">{error}</p>
                      {onRetry && (
                        <Button variant="outline" onClick={onRetry} className="text-sm">
                          Retry
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : !hasDomains ? (
                /* Empty state — no domains at all */
                <tr>
                  <td colSpan={6} className="px-4 py-8">
                    <DomainEmptyState onAddDomain={onAddDomain} />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                /* Search/filter returns nothing */
                <tr>
                  <td colSpan={6} className="text-center py-16 font-geist">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-[16px] font-semibold text-[#2B2B2B]">No domains found</p>
                      <p className="text-sm text-[#6B7280] mt-1">
                        We couldn&apos;t find any domains matching your current search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((domain, index) => (
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
                          <p className="font-medium text-[#111827]">{domain.domain}</p>
                          <p className="text-xs text-[#9CA3AF]">
                            Added on {formatDate(domain.createdAt)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      {(() => {
                        const method = domain.verificationMethod ?? "DNS_TXT";
                        return (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-[12px] text-[14px] font-medium text-[#2B2B2B] bg-[#EDEDED]"
                            style={{ padding: "4px 10px" }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#072E28] shrink-0" />
                            {METHOD_LABELS[method]}
                          </span>
                        );
                      })()}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[domain.status] ?? "bg-[#F3F4F6] text-[#6B7280]"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${STATUS_DOTS[domain.status] ?? "bg-[#9CA3AF]"}`}
                        />
                        {domain.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-[#6B7280] whitespace-nowrap">
                      {domain.lastScannedAt ? (
                        <>
                          <p>{formatDate(domain.lastScannedAt)}</p>
                          <p className="text-xs text-[#9CA3AF]">
                            {new Date(domain.lastScannedAt).toLocaleTimeString("en-US", {
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
                      {domain.lastSecurityScore !== null ? (
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold ${scoreBorderColor(domain.lastSecurityScore)} ${scoreColor(domain.lastSecurityScore)}`}
                          >
                            {domain.lastSecurityScore}
                          </div>
                          <span className={`text-sm font-medium ${scoreColor(domain.lastSecurityScore)}`}>
                            {scoreLabel(domain.lastSecurityScore)}
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
                        onClick={() => setDetailsDomain(domain)}
                        className="text-xs h-8 px-3 rounded-lg border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB]"
                      >
                        View Details
                      </Button>
                      <div className="relative" ref={openMenuId === domain.id ? menuRef : undefined}>
                        <button
                          onClick={() =>
                            setOpenMenuId(openMenuId === domain.id ? null : domain.id)
                          }
                          className="w-8 h-8 rounded-lg border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:bg-[#F9FAFB]"
                        >
                          <MoreVertical size={14} />
                        </button>
                        {openMenuId === domain.id && (
                          <div className={`absolute right-0 z-50 w-32 bg-white rounded-xl border border-[#E5E7EB] shadow-lg overflow-hidden ${index === filtered.length - 1 && filtered.length > 1 ? "bottom-9" : "top-9"}`}>
                            {domain.status !== "Verified" && (
                              <button
                                onClick={async () => {
                                  setOpenMenuId(null);
                                  const toastId = toast.loading("Checking DNS verification...", {
                                    description: `Verifying ${domain.domain}`,
                                  });
                                  try {
                                    const updatedDomain = await domainService.verifyDomain(domain.id);
                                    if (updatedDomain.status === "Verified") {
                                      toast.success("Domain verified successfully!", {
                                        id: toastId,
                                        description: `${domain.domain} is now verified.`,
                                      });
                                    } else {
                                      toast.error("Verification failed. DNS records might still be propagating.", {
                                        id: toastId,
                                        description: `${domain.domain} remains pending.`,
                                      });
                                    }
                                    if (onRetry) onRetry();
                                  } catch (err: unknown) {
                                    const axiosError = err as { response?: { data?: { error?: { message?: string } } } };
                                    const backendMessage = axiosError.response?.data?.error?.message;
                                    const errMsg = backendMessage || (err instanceof Error ? err.message : "Verification failed. DNS records might still be propagating.");
                                    toast.error(errMsg, {
                                      id: toastId,
                                    });
                                    if (onRetry) onRetry();
                                  }
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-[#374151] hover:bg-[#F9FAFB]"
                              >
                                Re-verify
                              </button>
                            )}
                            <button className="w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-[#FEF2F2]">
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

      <DomainDetailsModal
        domain={detailsDomain}
        open={detailsDomain !== null}
        onOpenChange={(open) => { if (!open) setDetailsDomain(null); }}
      />
    </div>
  );
}
