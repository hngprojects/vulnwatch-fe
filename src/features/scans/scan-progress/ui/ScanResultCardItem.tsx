import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

const variants = cva("p-5 rounded-lg", {
  variants: {
    severity: {
      neutral: "bg-neutral-100 text-scan-dark-700",
      excellent: "bg-[#1FC16B1A] text-[#1FC16B]",
      critical: "bg-[#FB37481A] text-[#D00416]",
    },
  },
});

export default function ScanResultCardItem({
  icon,
  statCount,
  description,
  className,
  severity,
}: {
  icon: React.ReactNode;
  statCount: string;
  description: string;
  className?: string;
  severity: "critical" | "neutral" | "excellent";
}) {
  return (
    <div
      className={cn(
        "rounded-lg p-4 text-center flex flex-col items-center justify-between space-y-1",
        variants({
          severity,
        }),
        className,
      )}
    >
      {icon}
      <p className="text-[12px] font-semibold">{statCount}</p>
      <p className="text-[10px] font-medium text-neutral-500">{description}</p>
    </div>
  );
}
