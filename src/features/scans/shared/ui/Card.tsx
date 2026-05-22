import { cva } from "class-variance-authority";
import React from "react";

const variants = cva("rounded-xl", {
  variants: {
    variant: {
      neutral: "border border-neutral-200 bg-white",
      critical: "bg-scan-red-400/10 text-scan-red-400",
      warning: "bg-scan-yellow-900/10 text-scan-yellow-900",
      pass: "bg-scan-green-400/10 text-scan-green-400",
    },
    padding: {
      default: "p-6",
      lg: "p-6 lg:p-8",
    },
  },
  defaultVariants: {
    variant: "neutral",
    padding: "default",
  },
});

export default function Card({
  children,
  variant,
  padding,
}: {
  children: React.ReactNode;
  variant?: "neutral" | "critical" | "warning" | "pass";
  padding?: "default" | "lg";
}) {
  return <div className={variants({ variant, padding })}>{children}</div>;
}
