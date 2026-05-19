import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

const variants = cva("p-5 rounded-lg", {
  variants: {
    severity: {
      neutral: "bg-neutral-100 text-scan-dark-700",
      excellent: "bg-scan-green-400/20 text-scan-green-400",
      critical: "bg-scan-red-400/10 text-scan-red-400",
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
      <p className="font-semibold text-lg">{statCount}</p>
      <p className="text-sm text-neutral-500">{description}</p>
    </div>
  );
}
