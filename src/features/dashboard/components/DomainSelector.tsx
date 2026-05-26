"use client";

import { useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Domain } from "@/features/domain/types/domain.types";

interface DomainSelectorProps {
  domains: Domain[];
  selected: Domain;
  onChange?: (domain: Domain) => void;
}

export function DomainSelector({ domains, selected, onChange }: DomainSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between bg-white border-2 border-[#EBE5E7] rounded-xl px-4 py-2.5 hover:border-[#D1D5DB] transition-colors w-full"
      >
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-[#2B2B2B] shrink-0" />
          <span className="font-geist font-normal text-[18px] leading-[100%] tracking-[0%] text-[#2B2B2B] truncate">
            {selected.domain}
          </span>
        </div>
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
          <div className="absolute left-0 top-full mt-1 w-full bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-20 py-1">
            {domains.map((domain) => (
              <button
                key={domain.id}
                type="button"
                onClick={() => {
                  onChange?.(domain);
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-[#374151] hover:bg-[#F9FAFB] transition-colors"
              >
                <span className="truncate">{domain.domain}</span>
                {domain.id === selected.id && (
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