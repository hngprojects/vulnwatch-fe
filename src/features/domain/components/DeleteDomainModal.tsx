"use client";

import { BookX, Clock9, Unlink, AlertTriangle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import type { Domain } from "../types/domain.types";

interface Props {
  domain: Domain | null;
  open: boolean;
  deleting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const WARNINGS = [
  {
    icon: BookX,
    title: "Scanning History",
    description: "All previous vulnerability reports will be permanently deleted.",
  },
  {
    icon: Clock9,
    title: "Remediation Logs",
    description: "Pending patches and fix verifications will no longer be tracked.",
  },
  {
    icon: Unlink,
    title: "Integration Links",
    description: "Webhooks and integrations for this domain will be deactivated.",
  },
];

export default function DeleteDomainModal({
  domain,
  open,
  deleting = false,
  onConfirm,
  onCancel,
}: Props) {
  if (!domain) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o && !deleting) onCancel(); }}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[460px] rounded-[12px] p-0 overflow-hidden"
      >
        {/* Close button */}
        <DialogClose
          disabled={deleting}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-light-gray hover:bg-brand-border flex items-center justify-center transition-colors z-10 disabled:opacity-50"
        >
          <X size={15} className="text-brand-dark" />
          <span className="sr-only">Close</span>
        </DialogClose>

        {/* Header */}
        <div className="px-6 pt-7 pb-4 flex flex-col items-center text-center gap-2.5">
          <div className="w-12 h-12 rounded-full bg-brand-failed-bg flex items-center justify-center">
            <AlertTriangle size={22} className="text-brand-failed-text" />
          </div>

          <DialogTitle className="text-xl font-bold text-brand-dark leading-tight">
            Remove Domain Asset?
          </DialogTitle>

          <DialogDescription className="text-sm text-brand-gray leading-relaxed max-w-[320px]">
            You are about to remove{" "}
            <span className="font-semibold text-brand-dark">{domain.domain}</span>{" "}
            from your monitoring perimeter.
          </DialogDescription>
        </div>

        {/* Warning card */}
        <div className="mx-6 mb-4 rounded-xl border border-brand-border overflow-hidden">
          <p className="px-4 pt-2.5 pb-1.5 text-[10px] font-semibold text-brand-muted uppercase tracking-widest bg-brand-medium-gray">
            Historical Data at Risk
          </p>
          {WARNINGS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex items-start gap-3 px-4 py-2.5 border-t border-brand-border-light"
            >
              <Icon size={16} className="text-brand-failed-text mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-brand-dark">{title}</p>
                <p className="text-xs text-brand-gray leading-snug mt-0.5">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="px-6 pb-4 flex items-center gap-3">
          <DialogClose
            disabled={deleting}
            className="flex-1 h-10 rounded-xl border border-brand-border bg-white text-sm font-medium text-brand-dark hover:bg-brand-medium-gray transition-colors disabled:opacity-60"
          >
            Cancel, Keep Asset
          </DialogClose>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 h-10 rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {deleting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Removing…
              </>
            ) : (
              <>Confirm Removal →</>
            )}
          </button>
        </div>

        {/* Fine print */}
        <p className="text-xs text-center text-brand-muted leading-relaxed pb-5 px-6">
          Removal is <strong className="text-brand-gray">irreversible</strong>. This action
          will take effect immediately across all regional clusters.
        </p>
      </DialogContent>
    </Dialog>
  );
}
