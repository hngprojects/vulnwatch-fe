"use client";

import { Clock } from "lucide-react";

const ComingSoon = ({ title }: { title: string }) => {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 flex flex-col items-center justify-center text-center min-h-[360px] gap-5">
      <div className="w-16 h-16 rounded-full bg-[#F0FDF4] flex items-center justify-center">
        <Clock size={28} className="text-primary" />
      </div>
      <div className="space-y-2 max-w-sm">
        <h2 className="text-2xl font-semibold text-[#2B2B2B]">{title}</h2>
        <p className="text-[#666666] text-base leading-relaxed">
          This feature is currently being finalized. it will be available shortly.
        </p>
      </div>
      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-sm font-medium text-primary">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        Coming Soon
      </span>
    </div>
  );
};

export default ComingSoon;
