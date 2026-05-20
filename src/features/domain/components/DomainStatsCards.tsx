"use client";

import { Globe, RefreshCw, ShieldCheck } from "lucide-react";

interface Props {
  total: number;
  pending: number;
  verified: number;
}

export default function DomainStatsCards({ total, pending, verified }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Total Domain Card */}
      <div className="bg-white rounded-2xl border border-[#EDEDED] p-5 flex flex-col items-start gap-4">
        <div className="w-10 h-10 rounded-[10px] bg-[#EAF5F3] flex items-center justify-center shrink-0">
          <Globe size={20} className="text-[#072E28]" />
        </div>
        <div className="space-y-1">
          <p className="text-[28px] font-bold text-brand-dark font-geist leading-none">
            {total}
          </p>
          <p className="text-[14px] font-normal text-[#666666] font-geist">
            Domain
          </p>
        </div>
      </div>

      {/* Pending Verification Card */}
      <div className="bg-white rounded-2xl border border-[#EDEDED] p-5 flex flex-col items-start gap-4">
        <div className="w-10 h-10 rounded-[10px] bg-[#FFF7ED] flex items-center justify-center shrink-0">
          <RefreshCw size={20} className="text-[#FFA468]" />
        </div>
        <div className="space-y-1">
          <p className="text-[28px] font-bold text-[#FFA468] font-geist leading-none">
            {pending}
          </p>
          <p className="text-[14px] font-normal text-[#666666] font-geist">
            Pending Verification
          </p>
        </div>
      </div>

      {/* Verified Domain Card */}
      <div className="bg-white rounded-2xl border border-[#EDEDED] p-5 flex flex-col items-start gap-4">
        <div className="w-10 h-10 rounded-[10px] bg-[#ECFDF5] flex items-center justify-center shrink-0">
          <ShieldCheck size={20} className="text-[#10B981]" />
        </div>
        <div className="space-y-1">
          <p className="text-[28px] font-bold text-[#10B981] font-geist leading-none">
            {verified}
          </p>
          <p className="text-[14px] font-normal text-[#666666] font-geist">
            Verified Domain
          </p>
        </div>
      </div>
    </div>
  );
}
