"use client";

import { useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const DOMAINS = [
  "www.mycompany.com",
  "api.mycompany.com",
  "staging.mycompany.com",
];

interface DomainSelectorProps {
  selected: string;
  onChange?: (domain: string) => void;
}

export function DomainSelector({ selected, onChange }: DomainSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm font-medium text-[#374151] hover:border-[#D1D5DB] transition-colors"
      >
        <Globe className="h-4 w-4 text-[#6B7280] shrink-0" />
        <span className="max-w-[180px] truncate">{selected}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-[#9CA3AF] transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-20 py-1">
            {DOMAINS.map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={() => {
                  onChange?.(domain);
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-[#374151] hover:bg-[#F9FAFB] transition-colors"
              >
                <span className="truncate">{domain}</span>
                {domain === selected && (
                  <Check className="h-4 w-4 text-primary shrink-0 ml-2" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}