"use client";

import {
  Globe,
  Calendar,
  Clock,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import type { Domain, DomainStatus, VerificationMethod } from "../types/domain.types";

interface Props {
  domain: Domain | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

const METHOD_LABELS: Record<VerificationMethod, string> = {
  DNS_TXT: "DNS TXT Record",
  FILE_UPLOAD: "File Upload",
  EMAIL: "Email Verification",
};

const METHOD_COLORS: Record<VerificationMethod, string> = {
  DNS_TXT: "bg-[#EFF6FF] text-[#3B82F6]",
  FILE_UPLOAD: "bg-[#F5F3FF] text-[#7C3AED]",
  EMAIL: "bg-[#FFF7ED] text-[#F59E0B]",
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

function scoreBg(score: number | null): string {
  if (score === null) return "bg-[#F3F4F6]";
  if (score >= 90) return "bg-[#ECFDF5]";
  if (score >= 70) return "bg-[#EFF6FF]";
  if (score >= 50) return "bg-[#FFF7ED]";
  return "bg-[#FEF2F2]";
}

function scoreBorder(score: number | null): string {
  if (score === null) return "border-[#E5E7EB]";
  if (score >= 90) return "border-[#10B981]";
  if (score >= 70) return "border-[#3B82F6]";
  if (score >= 50) return "border-[#F59E0B]";
  return "border-[#EF4444]";
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return (
    d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
    " at " +
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-[#F3F4F6] last:border-b-0">
      <span className="text-sm text-[#6B7280] shrink-0 w-36">{label}</span>
      <span className="text-sm font-medium text-[#111827] text-right">{children}</span>
    </div>
  );
}

export default function DomainDetailsModal({ domain, open, onOpenChange }: Props) {
  if (!domain) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-w-[480px] rounded-2xl p-0 overflow-hidden">
        <div className="bg-[#072E28] px-6 py-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Globe size={18} className="text-white" />
              </div>
              <div>
                <DialogTitle className="text-base font-semibold text-white leading-tight">
                  {domain.domain}
                </DialogTitle>
                <p className="text-xs text-white/60 mt-0.5">Domain Details</p>
              </div>
            </div>
            <DialogClose className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors">
              <X size={14} className="text-white" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[domain.status]}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOTS[domain.status]}`} />
            {domain.status}
          </span>
        </div>

        <div className="px-6 py-2">
          <Row label="Domain">{domain.domain}</Row>

          <Row label="Verification Method">
            {domain.verificationMethod ? (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${METHOD_COLORS[domain.verificationMethod]}`}
              >
                {METHOD_LABELS[domain.verificationMethod]}
              </span>
            ) : (
              <span className="text-[#9CA3AF] font-normal">Not set</span>
            )}
          </Row>

          <Row label="Security Score">
            {domain.lastSecurityScore !== null ? (
              <div className="flex items-center gap-2 justify-end">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${scoreBorder(domain.lastSecurityScore)} ${scoreBg(domain.lastSecurityScore)} ${scoreColor(domain.lastSecurityScore)}`}
                >
                  {domain.lastSecurityScore}
                </div>
                <span className={`text-sm font-medium ${scoreColor(domain.lastSecurityScore)}`}>
                  {scoreLabel(domain.lastSecurityScore)}
                </span>
              </div>
            ) : (
              <span className="text-[#9CA3AF] font-normal">Not available</span>
            )}
          </Row>

          <Row label="Date Added">
            <span className="flex items-center gap-1.5 justify-end">
              <Calendar size={13} className="text-[#9CA3AF]" />
              {formatDate(domain.createdAt)}
            </span>
          </Row>

          <Row label="Last Scanned">
            <span className="flex items-center gap-1.5 justify-end">
              <Clock size={13} className="text-[#9CA3AF]" />
              {domain.lastScannedAt ? formatDateTime(domain.lastScannedAt) : (
                <span className="text-[#9CA3AF] font-normal">Not scanned yet</span>
              )}
            </span>
          </Row>

          <Row label="Last Updated">
            {domain.updatedAt ? formatDateTime(domain.updatedAt) : (
              <span className="text-[#9CA3AF] font-normal">—</span>
            )}
          </Row>
        </div>

        <div className="px-6 py-3 bg-[#F9FAFB] border-t border-[#E5E7EB] flex items-center gap-1.5">
          <ShieldCheck size={13} className="text-[#10B981]" />
          <p className="text-xs text-[#6B7280]">Domain information is secure and encrypted</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
