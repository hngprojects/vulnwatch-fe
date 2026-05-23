import { getScoreResultVariant } from "../../shared/lib/utils";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const containerVariants = cva("rounded-lg px-4 py-3 space-y-2 sm:space-y-0 sm:flex sm:items-center gap-3", {
  variants: {
    variant: {
      critical: "bg-[#FDEBEC]",
      high_priority: "bg-[#FCF0E8]",
      warning: "bg-[#FFFBF0]",
      low: "bg-[#EBEEFD]",
      pass: "bg-[#E8F7EF]",
    },
  },
});

const badgeVariants = cva(
  "p-1 rounded-full text-[10px] sm:text-xs text-white size-5 flex items-center justify-center aspect-square shrink-0",
  {
    variants: {
      variant: {
        critical: "bg-[#D00416]",
        high_priority: "bg-[#DD6414]",
        warning: "bg-[#B27F06]",
        low: "bg-[#263FA5]",
        pass: "bg-[#1DAF61]",
      },
    },
  },
);

const linkVariants = cva("font-semibold underline", {
  variants: {
    variant: {
      critical: "text-[#D00416]",
      high_priority: "text-[#DD6414]",
      warning: "text-[#B27F06]",
      low: "text-[#263FA5]",
      pass: "text-[#1DAF61]",
    },
  },
});

const descVariants = cva("", {
  variants: {
    variant: {
      critical: "text-[#FD4151]",
      high_priority: "text-[#666666]",
      warning: "text-[#CC9513]",
      low: "text-[#666666]",
      pass: "text-[#1DAF61]",
    },
  },
});

export default function FindingsItemCard({
  score,
  severityCount,
  description,
  href = "#",
}: {
  score: number;
  severityCount: number;
  description: string;
  href?: string;
}) {
  const variant = getScoreResultVariant(score);
  
  const getLabel = (v: string) => {
    if (v === "warning") return "Medium fixes";
    if (v === "pass") return "Pass";
    return v[0].toUpperCase() + v.slice(1).replaceAll("_", " ") + " fixes";
  };

  return (
    <div className={cn(containerVariants({ variant }))}>
      <div className="flex items-center gap-2">
        <Link href={href} className={cn(linkVariants({ variant }))}>
          {getLabel(variant)}
        </Link>
        <div className={cn(badgeVariants({ variant }))}>{severityCount}</div>
      </div>
      <p className={cn(descVariants({ variant }))}>{description}</p>
    </div>
  );
}
