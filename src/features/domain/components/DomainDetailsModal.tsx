"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock, X, RefreshCw, CheckCircle2, AlertCircle, Trash2, Copy, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { domainService } from "../services/domain.service";
import type { Domain, DomainStatus, VerificationMethod } from "../types/domain.types";
import { toast } from "sonner";

interface Props {
  domain: Domain | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted?: () => void;
}

const METHOD_LABELS: Record<VerificationMethod, string> = {
  DNS_TXT: "DNS TXT Record",
  FILE_UPLOAD: "File Upload",
  EMAIL: "Email Verification",
};

const STATUS_CONFIG: Record<DomainStatus, {
  badge: string;
  dot: string;
  badgeLabel: string;
  title: string;
  iconBg: string;
  iconColor: string;
  statusRowValue: string;
}> = {
  Pending: {
    badge: "bg-[#FCF0E8] text-[#F57C00]",
    dot: "bg-[#F57C00]",
    badgeLabel: "Pending Verification",
    title: "Verification in progress",
    iconBg: "bg-[#FCF0E8]",
    iconColor: "text-[#F57C00]",
    statusRowValue: "Awaiting confirmation",
  },
  Verified: {
    badge: "bg-[#ECFDF5] text-[#10B981]",
    dot: "bg-[#10B981]",
    badgeLabel: "Verified",
    title: "Domain ownership confirmed",
    iconBg: "bg-[#ECFDF5]",
    iconColor: "text-[#10B981]",
    statusRowValue: "Verified",
  },
  Failed: {
    badge: "bg-[#FEF2F2] text-[#EF4444]",
    dot: "bg-[#EF4444]",
    badgeLabel: "Verification Failed",
    title: "We couldn't verify this domain",
    iconBg: "bg-[#FEF2F2]",
    iconColor: "text-[#EF4444]",
    statusRowValue: "Failed",
  },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

function StatusIcon({ status }: { status: DomainStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <div className={`w-16 h-16 rounded-full ${cfg.iconBg} flex items-center justify-center mx-auto`}>
      {status === "Verified" ? (
        <CheckCircle2 size={32} className={cfg.iconColor} />
      ) : status === "Failed" ? (
        <AlertCircle size={32} className={cfg.iconColor} />
      ) : (
        <Clock size={32} className={cfg.iconColor} />
      )}
    </div>
  );
}

export default function DomainDetailsModal({ domain, open, onOpenChange, onDeleted }: Props) {
  const [checkedDomain, setCheckedDomain] = useState<Domain | null>(null);
  const [checking, setChecking] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = useCallback((text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      toast.success(`${field} copied to clipboard!`);
      setTimeout(() => setCopiedField(null), 2000);
    });
  }, []);

  // Use the freshly-fetched domain when it belongs to the same ID, otherwise fall back to the prop
  const liveDomain = (checkedDomain?.id === domain?.id ? checkedDomain : null) ?? domain;

  const handleCheck = useCallback(async () => {
    if (!liveDomain) return;
    setChecking(true);
    try {
      const updated = await domainService.getDomain(liveDomain.id);
      setCheckedDomain(updated);
    } catch {
      // silently fail — domain data stays as-is
    } finally {
      setChecking(false);
    }
  }, [liveDomain]);

  // auto-refresh every 5 minutes for pending domains
  useEffect(() => {
    if (!open || liveDomain?.status !== "Pending") return;
    const id = setInterval(handleCheck, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [open, liveDomain?.status, handleCheck]);

  if (!liveDomain) return null;

  const cfg = STATUS_CONFIG[liveDomain.status];
  const method = liveDomain.verificationMethod
    ? METHOD_LABELS[liveDomain.verificationMethod]
    : "DNS TXT Record";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[522px] rounded-[12px] p-0 overflow-hidden"
      >
        {/* Close button */}
        <DialogClose className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] flex items-center justify-center transition-colors z-10">
          <X size={15} className="text-[#374151]" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="px-6 pt-8 pb-6 flex flex-col items-center text-center gap-3">
          {/* Icon */}
          <StatusIcon status={liveDomain.status} />

          {/* Status badge */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cfg.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.badgeLabel}
          </span>

          {/* Title */}
          <DialogTitle className="text-[22px] font-bold text-[#111827] leading-tight">
            {cfg.title}
          </DialogTitle>

          <DialogDescription className="sr-only">
            Domain verification details and options for {liveDomain.domain}.
          </DialogDescription>

          {/* Subtitle */}
          <p className="text-sm text-[#6B7280] max-w-xs leading-relaxed">
            {liveDomain.status === "Pending" ? (
              <>
                We&apos;re confirming ownerships of{" "}
                <span className="font-semibold text-[#111827]">{liveDomain.domain}</span>.
                {" "}This usually takes{" "}
                <span className="font-semibold text-[#111827]">5-30 minutes</span>
              </>
            ) : liveDomain.status === "Verified" ? (
              <>
                <span className="font-semibold text-[#111827]">{liveDomain.domain}</span>{" "}
                has been successfully verified and is ready to scan.
              </>
            ) : (
              <>
                We couldn&apos;t verify{" "}
                <span className="font-semibold text-[#111827]">{liveDomain.domain}</span>.
                {" "}Please check your DNS settings and try again.
              </>
            )}
          </p>
        </div>

        {/* Details card */}
        <div className="mx-6 mb-4 rounded-xl border border-[#E5E7EB] overflow-hidden">
          {(() => {
            const token = liveDomain.verificationToken || liveDomain.instructions?.value || "";
            const rawHost = liveDomain.txtRecord || liveDomain.instructions?.txtRecord || "_vulnwatch-verify";
            const domainName = liveDomain.domain || "";
            const host = (domainName && rawHost.endsWith(`.${domainName}`))
              ? rawHost.slice(0, -(domainName.length + 1))
              : rawHost;

            const showVerificationDetails = liveDomain.status !== "Verified";

            const details = [
              { label: "Domain", value: liveDomain.domain },
              { label: "Method", value: method },
              { label: "Submitted", value: timeAgo(liveDomain.createdAt) },
              ...(showVerificationDetails && host ? [{ label: "TXT Host / Name", value: host, copyable: true }] : []),
              ...(showVerificationDetails && token ? [{ label: "TXT Value", value: token, copyable: true }] : []),
              { label: "Status", value: cfg.statusRowValue },
            ];

            return details.map(({ label, value, copyable }) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-3 border-b border-[#F3F4F6] last:border-b-0"
              >
                <span className="text-sm text-[#6B7280]">{label}</span>
                <div className="flex items-center gap-2 max-w-[65%] min-w-0">
                  <span className="text-sm font-semibold text-[#111827] truncate select-all" title={value}>
                    {value}
                  </span>
                  {copyable && (
                    <button
                      onClick={() => handleCopy(value, label)}
                      className="p-1 hover:bg-[#F3F4F6] rounded text-[#6B7280] hover:text-[#111827] transition-colors shrink-0 cursor-pointer"
                    >
                      {copiedField === label ? (
                        <Check size={14} className="text-brand-green" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ));
          })()}
        </div>

        {/* Auto-refresh bar — only for pending */}
        {liveDomain.status === "Pending" && (
          <div className="mx-6 mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#6B7280]">We&apos;re checking every 5 minutes</span>
              <span className="text-xs font-medium text-[#A0E870]">Auto-refresh on</span>
            </div>
            <div className="h-1.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
              <div className="h-full w-2/5 bg-[#A0E870] rounded-full" />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="px-6 pb-6 flex items-center gap-3">
          <button
            onClick={async () => {
              if (deleting) return;
              if (confirm(`Are you sure you want to remove ${liveDomain.domain}?`)) {
                setDeleting(true);
                const toastId = toast.loading("Removing domain...", {
                  description: `Deleting ${liveDomain.domain}`,
                });
                try {
                  const res = await domainService.deleteDomain(liveDomain.id);
                  toast.success(res.message || "Domain removed successfully!", {
                    id: toastId,
                  });
                  onOpenChange(false);
                  if (onDeleted) onDeleted();
                } catch (err: unknown) {
                  const axiosError = err as { response?: { data?: { error?: { message?: string } } } };
                  const backendMessage = axiosError.response?.data?.error?.message;
                  const errMsg = backendMessage || (err instanceof Error ? err.message : "Failed to remove domain.");
                  toast.error(errMsg, {
                    id: toastId,
                  });
                } finally {
                  setDeleting(false);
                }
              }
            }}
            disabled={deleting}
            className="flex-1 h-11 rounded-xl border border-[#FCA5A5] bg-white text-sm font-medium text-[#EF4444] hover:bg-[#FEF2F2] hover:border-[#EF4444] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Trash2 size={15} />
            Remove
          </button>

          <DialogClose
            disabled={deleting}
            className="flex-1 h-11 rounded-xl border border-[#E5E7EB] bg-white text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors disabled:opacity-60"
          >
            Close
          </DialogClose>
          {liveDomain.status === "Pending" && (
            <button
              onClick={handleCheck}
              disabled={checking || deleting}
              className="flex-1 h-11 rounded-xl bg-[#072E28] text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#072E28]/90 transition-colors disabled:opacity-60"
            >
              <RefreshCw size={15} className={checking ? "animate-spin" : ""} />
              {checking ? "Checking..." : "Check now"}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
