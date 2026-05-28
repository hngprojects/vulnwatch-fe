"use client";

import { use, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Shield, Key, AlertTriangle, Play, RefreshCw, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { domainService } from "@/features/domain/services/domain.service";
import type { Domain } from "@/features/domain/types/domain.types";
import { toast } from "sonner";

export default function DomainDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const [domain, setDomain] = useState<Domain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDomainDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await domainService.getDomain(id);
      setDomain(data);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to load domain details. Please try again.");
      toast.error("Failed to load domain details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void fetchDomainDetails();
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [fetchDomainDetails]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-3">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-slate-500 font-geist">Loading domain profile...</p>
      </div>
    );
  }

  if (error || !domain) {
    return (
      <div className="p-6 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[70vh] gap-4">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
          <AlertTriangle size={24} />
        </div>
        <h2 className="text-xl font-semibold text-slate-800 font-geist">Something went wrong</h2>
        <p className="text-sm text-slate-500 font-geist text-center max-w-md">{error || "Domain not found."}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.push("/domain")} className="rounded-xl">
            <ArrowLeft size={16} className="mr-1.5" /> Back to Domains
          </Button>
          <Button onClick={fetchDomainDetails} className="bg-primary hover:bg-primary/95 text-white rounded-xl">
            <RefreshCw size={16} className="mr-1.5" /> Retry
          </Button>
        </div>
      </div>
    );
  }

  const scoreLabel = (score: number | null) => {
    if (score === null) return "Not available";
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Poor";
  };

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-slate-400 bg-slate-50 border-slate-200";
    if (score >= 70) return "text-brand-success bg-[#E8FFF3] border-brand-green/20";
    if (score >= 50) return "text-brand-pending-text bg-[#FFF1E7] border-brand-pending-text/20";
    return "text-brand-failed-text bg-[#FFE8EF] border-brand-failed-text/20";
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/domain")}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors font-geist cursor-pointer group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Domains</span>
        </button>
        <span className="text-xs font-semibold text-slate-400 font-geist uppercase tracking-wider">
          Domain Profile
        </span>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center flex-wrap gap-2.5">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 font-geist tracking-tight">
              {domain.domain}
            </h1>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8FFF3] text-brand-success border border-brand-green/10">
              <Check size={12} strokeWidth={2.5} />
              Verified
            </span>
          </div>
          <p className="text-sm font-normal text-slate-500 font-geist">
            Added on {formatDate(domain.createdAt)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.push("/scan")}
            className="bg-[#072E28] hover:bg-[#072E28]/95 text-white font-medium h-11 px-5 rounded-xl cursor-pointer flex items-center gap-2"
          >
            <Play size={16} fill="currentColor" />
            <span>Configure Scan</span>
          </Button>
        </div>
      </div>

      {/* Stats and Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Security Score */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center gap-4 shadow-sm">
          <span className="text-sm font-semibold text-slate-500 font-geist flex items-center gap-1.5">
            <Shield size={16} className="text-primary" />
            Security Score
          </span>
          <div className="relative flex items-center justify-center">
            {domain.lastSecurityScore !== null ? (
              <div className={`w-28 h-28 rounded-full border-[6px] flex flex-col items-center justify-center text-center shadow-inner ${getScoreColor(domain.lastSecurityScore)}`}>
                <span className="text-3xl font-extrabold font-geist">{domain.lastSecurityScore}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">
                  {scoreLabel(domain.lastSecurityScore)}
                </span>
              </div>
            ) : (
              <div className="w-28 h-28 rounded-full border-[6px] border-slate-100 bg-slate-50 flex flex-col items-center justify-center text-slate-400 text-center">
                <span className="text-2xl font-bold font-geist">—</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider mt-0.5">No Scans</span>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400 font-geist max-w-[200px]">
            {domain.lastSecurityScore !== null
              ? "Calculated based on the latest compliance and vulnerability scans."
              : "Scan this domain to check for critical security vulnerabilities."}
          </p>
        </div>

        {/* Verification Info */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between gap-6 shadow-sm col-span-1 md:col-span-2">
          <div className="space-y-4">
            <span className="text-sm font-semibold text-slate-500 font-geist flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <Key size={16} className="text-primary" />
              Ownership & Verification
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-geist block">Verification Method</span>
                <span className="text-sm font-semibold text-slate-800 font-geist">
                  {domain.verificationMethod === "DNS_TXT"
                    ? "DNS TXT Record"
                    : domain.verificationMethod === "FILE_UPLOAD"
                    ? "File Upload Verification"
                    : "Email Verification"}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-geist block">Identity Reference Token</span>
                <span className="text-xs font-mono bg-slate-50 border border-slate-200 text-slate-600 px-2 py-1 rounded select-all block truncate max-w-[240px]">
                  {domain.verificationToken || "Verified"}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-geist block">Verification Status</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-success bg-[#E8FFF3] px-2.5 py-0.5 rounded-full mt-0.5">
                  Active & Verified
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-geist block">Last Verification Update</span>
                <span className="text-sm font-semibold text-slate-800 font-geist">
                  {formatDate(domain.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-100 rounded-xl">
            <Shield size={16} className="text-blue-500 shrink-0" />
            <span className="text-xs text-blue-800 font-medium font-geist">
              This domain is fully authenticated. Vulnerability scanner processes are authorized to scan its endpoints.
            </span>
          </div>
        </div>
      </div>

      {/* Vulnerability Scanning Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-800 font-geist flex items-center gap-2">
              <BarChart2 size={18} className="text-primary" />
              Vulnerability History
            </h2>
            <p className="text-xs text-slate-500 font-geist">
              History of security posture checks and assessments.
            </p>
          </div>
        </div>

        {domain.lastScannedAt ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl gap-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-800 font-geist">Latest Audit Completed</p>
                <p className="text-xs text-slate-500 font-geist">Completed on {formatDate(domain.lastScannedAt)}</p>
              </div>
              <Button
                onClick={() => router.push("/report")}
                variant="outline"
                className="text-xs font-semibold h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer"
              >
                View Latest Report
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-12 px-4 gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
              <Shield size={22} />
            </div>
            <div className="space-y-1 max-w-sm">
              <p className="text-sm font-semibold text-slate-800 font-geist">No scans performed yet</p>
              <p className="text-xs text-slate-500 font-geist">
                Configure and run a scan on this domain to start receiving security details, vulnerabilities, and grading.
              </p>
            </div>
            <Button
              onClick={() => router.push("/scan")}
              className="bg-primary hover:bg-primary/95 text-white font-medium h-10 px-4 rounded-xl cursor-pointer"
            >
              Start First Scan
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
