"use client";

import { Globe, RefreshCw, ShieldCheck } from "lucide-react";

interface Props {
  total: number;
  pending: number;
  verified: number;
}

export default function DomainStatsCards({ total, pending, verified }: Props) {
  const verifiedPercent = total > 0 ? Math.round((verified / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center shrink-0">
          <Globe size={20} className="text-[#6B7280]" />
        </div>
        <div>
          <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">
            Total Domain
          </p>
          <p className="text-3xl font-bold text-[#111827] mt-1">{total}</p>
          <p className="text-xs text-[#6B7280] mt-1">+0 from last month</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#FFF7ED] flex items-center justify-center shrink-0">
          <RefreshCw size={20} className="text-[#F59E0B]" />
        </div>
        <div>
          <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">
            Pending Verification
          </p>
          <p className="text-3xl font-bold text-[#F59E0B] mt-1">{pending}</p>
          <p className="text-xs text-[#6B7280] mt-1">
            {pending === 0 ? "All domains added" : `${pending} awaiting`}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#ECFDF5] flex items-center justify-center shrink-0">
          <ShieldCheck size={20} className="text-[#10B981]" />
        </div>
        <div>
          <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">
            Verified Domain
          </p>
          <p className="text-3xl font-bold text-[#10B981] mt-1">{verified}</p>
          <p className="text-xs text-[#6B7280] mt-1">{verifiedPercent}% total</p>
        </div>
      </div>
    </div>
  );
}
