"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Globe, ScanLine, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { ScanType } from "./domain-detail.types";
import { WHAT_HAPPENS_NEXT } from "@/features/scans/configure-new-scan/lib/constants";

interface RunScanModalProps {
  domainName: string;
  onClose: () => void;
  onStart: (scanType: ScanType) => void;
}

export function RunScanModal({ domainName, onClose, onStart }: RunScanModalProps) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="run-scan-title"
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-gray-200">
          <div>
            <h2 id="run-scan-title" className="text-lg font-bold text-slate-900 font-geist">Run Security Scan</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Initiate a manual on-demand scan for this domain.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-4 flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Target domain */}
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold text-slate-700">Target Domain</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={domainName}
                readOnly
                disabled
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-slate-500 bg-brand-bg cursor-not-allowed select-none"
              />
            </div>
          </div>

          {/* What will happen next */}
          <div className="space-y-4 pt-2">
            <h3 className="text-sm font-semibold text-slate-700">What will happen next?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WHAT_HAPPENS_NEXT.map((item) => (
                <div key={item.title} className="flex gap-3 items-start">
                  <div className="flex items-center justify-center bg-slate-100 w-8 h-8 rounded-full text-slate-600 shrink-0">
                    {item.icon}
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-semibold text-slate-900 text-xs">{item.title}</p>
                    <p className="text-xs text-slate-500 leading-snug">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Authorization checkbox */}
          <div className="flex items-start gap-3 p-3.5 bg-brand-bg border border-gray-200 rounded-lg">
            <Checkbox
              id="modal-authorization"
              checked={authorized}
              onCheckedChange={(v) => setAuthorized(!!v)}
              className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label
              htmlFor="modal-authorization"
              className="text-sm text-slate-700 leading-snug cursor-pointer"
            >
              I confirm I have authorization to scan this domain.
            </Label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-200 text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            disabled={!authorized}
            onClick={() => onStart("quick")}
            className="bg-primary hover:bg-primary/90 text-white px-5 font-semibold disabled:opacity-50"
          >
            <ScanLine className="h-4 w-4 mr-2" />
            Start Scan
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
