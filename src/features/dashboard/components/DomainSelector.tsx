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
        className="flex items-center justify-between bg-white border-2 border-[#EBE5E7] rounded-xl h-[46px] pr-4 hover:border-[#D1D5DB] transition-colors w-full overflow-hidden"
      >
        <div className="flex items-center h-full">
          <div className="px-3.5 flex items-center justify-center h-full">
            <Globe className="h-[22px] w-[22px] text-[#2B2B2B]" />
          </div>
          <div className="w-[2px] h-full bg-[#EBE5E7]" />
          <span className="font-geist font-normal text-[18px] leading-[100%] tracking-[0%] text-[#2B2B2B] truncate ml-3.5">
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
            {domains
              .filter((domain) => domain.status === "Verified")
              .map((domain) => (
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