import React from "react";

export function AuthDivider() {
  return (
    <div className="my-2 flex items-center justify-center gap-2">
      <div className="h-px w-full bg-[#B5B1B1] md:w-[190px]" />
      <div className="font-geist bg-white px-1 text-[12px] leading-[16px] font-medium tracking-[0.02em] text-[#2B2B2B]">
        Or
      </div>
      <div className="h-px w-full bg-[#B5B1B1] md:w-[190px]" />
    </div>
  );
}
