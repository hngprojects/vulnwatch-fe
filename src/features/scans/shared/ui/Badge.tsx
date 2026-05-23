import { cva } from "class-variance-authority";

const variants = cva(
  "rounded-[26px] px-4 py-2 w-fit font-medium leading-none",
  {
    variants: {
      variant: {
        neutral: "border border-border",
        critical: "bg-scan-red-bg text-scan-red-400",
        warning: "bg-yellow-100 text-scan-yellow-900",
        pass: "bg-scan-green-400/10 text-scan-green-400",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export default function Badge({
  variant,
  label,
  className,
}: {
  variant: "neutral" | "critical" | "warning" | "pass";
  label: string;
  className?: string;
}) {
  return <div className={variants({ variant, className })}>{label}</div>;
}
