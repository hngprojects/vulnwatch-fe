"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Shield } from "lucide-react";

interface Props {
  onAddDomain: () => void;
}

export default function DomainEmptyState({ onAddDomain }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-[#F3F4F6] flex items-center justify-center">
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="22" cy="22" r="22" fill="#E5E7EB" />
            <path
              d="M22 10C15.373 10 10 15.373 10 22C10 28.627 15.373 34 22 34C28.627 34 34 28.627 34 22C34 15.373 28.627 10 22 10ZM22 12C23.05 12 24.32 13.58 25.28 16H18.72C19.68 13.58 20.95 12 22 12ZM18.1 12.5C17.14 13.87 16.38 15.8 15.94 18H12.54C13.64 15.64 15.67 13.77 18.1 12.5ZM25.9 12.5C28.33 13.77 30.36 15.64 31.46 18H28.06C27.62 15.8 26.86 13.87 25.9 12.5ZM12.08 20H15.72C15.65 20.65 15.6 21.32 15.6 22C15.6 22.68 15.65 23.35 15.72 24H12.08C11.9 23.35 11.8 22.69 11.8 22C11.8 21.31 11.9 20.65 12.08 20ZM17.72 20H26.28C26.36 20.65 26.4 21.32 26.4 22C26.4 22.68 26.36 23.35 26.28 24H17.72C17.64 23.35 17.6 22.68 17.6 22C17.6 21.32 17.64 20.65 17.72 20ZM28.28 20H31.92C32.1 20.65 32.2 21.31 32.2 22C32.2 22.69 32.1 23.35 31.92 24H28.28C28.35 23.35 28.4 22.68 28.4 22C28.4 21.32 28.35 20.65 28.28 20ZM12.54 26H15.94C16.38 28.2 17.14 30.13 18.1 31.5C15.67 30.23 13.64 28.36 12.54 26ZM18.72 26H25.28C24.32 28.42 23.05 30 22 30C20.95 30 19.68 28.42 18.72 26ZM28.06 26H31.46C30.36 28.36 28.33 30.23 25.9 31.5C26.86 30.13 27.62 28.2 28.06 26Z"
              fill="#9CA3AF"
            />
          </svg>
        </div>
        <span className="absolute top-0 right-0 w-5 h-5 rounded-full bg-[#F59E0B] border-2 border-white" />
        <span className="absolute bottom-1 right-0 w-5 h-5 rounded-full bg-[#10B981] border-2 border-white flex items-center justify-center">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <h3 className="text-lg font-semibold text-[#111827] mb-2">
        Start Monitoring Your Domain
      </h3>
      <p className="text-sm text-[#6B7280] text-center max-w-xs mb-6">
        Add your first domain to begin security scanning and risk detection.
      </p>

      <Button
        onClick={onAddDomain}
        className="bg-[#072E28] text-white hover:bg-[#072E28]/90 rounded-lg px-6 h-10"
      >
        <PlusCircle size={16} className="mr-2" />
        Add domain
      </Button>

      <div className="flex items-center gap-2 my-4">
        <div className="h-px w-16 bg-[#E5E7EB]" />
        <span className="text-xs text-[#9CA3AF]">or</span>
        <div className="h-px w-16 bg-[#E5E7EB]" />
      </div>

      <button className="text-sm text-[#072E28] font-medium hover:underline mb-3">
        View setup guide
      </button>

      <p className="text-xs text-[#9CA3AF] flex items-center gap-1">
        <Shield size={12} />
        Verify with DNS, file upload or email
      </p>
    </div>
  );
}
