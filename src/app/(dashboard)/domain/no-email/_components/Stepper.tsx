import { Check } from "lucide-react";

export default function Stepper() {
  return (
    <div className="flex items-center justify-center w-[80%] max-w-3xl mx-auto px-4">
      <div className="flex items-center w-full justify-between">
        {/* Step 1: Domain Info (Completed) */}
        <div className="flex flex-col items-center relative z-10">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#E6F4EA] border border-[#0D6837] flex items-center justify-center text-[#0D6837] shrink-0">
            <Check size={16} className="stroke-[2.5]" />
          </div>
          <span className="text-[11px] md:text-xs font-semibold text-[#0D6837] mt-2 font-geist text-center whitespace-nowrap">
            Domain Info
          </span>
        </div>

        {/* Connector 1 — completed */}
        <div className="flex-1 h-[1.5px] bg-[#0D6837] mx-2 -mt-6"></div>

        {/* Step 2: Verification Method (Completed) */}
        <div className="flex flex-col items-center relative z-10">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#E6F4EA] border border-[#0D6837] flex items-center justify-center text-[#0D6837] shrink-0">
            <Check size={16} className="stroke-[2.5]" />
          </div>
          <span className="text-[11px] md:text-xs font-semibold text-[#0D6837] mt-2 font-geist text-center whitespace-nowrap">
            Verification Method
          </span>
        </div>

        {/* Connector 2 — pending */}
        <div className="flex-1 h-[1.5px] bg-[#D1D5DB] mx-2 -mt-6"></div>

        {/* Step 3: Select Email (Active/Pending) */}
        <div className="flex flex-col items-center relative z-10">
          <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#374151] flex items-center justify-center text-white shrink-0">
            <span className="text-[13px] md:text-sm font-bold font-geist">3</span>
          </div>
          <span className="text-[11px] md:text-xs font-semibold text-[#374151] mt-2 font-geist text-center whitespace-nowrap">
            Select Email
          </span>
        </div>
      </div>
    </div>
  );
}
