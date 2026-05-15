import { getScoreResultVariant } from "../../shared/lib/utils";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const countBadgeVariants = cva(
  "p-1 rounded-full text-sm text-white size-6 flex items-center justify-center",
  {
    variants: {
      variant: {
        critical: "bg-scan-red-400",
        pass: "bg-scan-green-400",
        warning: "bg-scan-yellow-400",
        high_priority: "bg-scan-orange-400",
        low: "bg-scan-blue-400",
      },
    },
  },
);

const scanResultsVariants = cva("rounded-lg px-4 py-3 space-y-2", {
  variants: {
    variant: {
      critical: "bg-scan-red-400/10 text-scan-red-400/80",
      pass: "bg-scan-green-400/10 text-scan-green-400/80",
      warning: "bg-scan-yellow-400/10 text-scan-yellow-400/80",
      high_priority: "bg-scan-orange-400/10 text-scan-orange-400/80",
      low: "bg-scan-blue-400/10 text-scan-blue-400/80",
    },
  },
});

export default function FindingsItemCard({
  score,
  severityCount,
  description,
}: {
  score: number;
  severityCount: number;
  description: string;
}) {
  const variant = getScoreResultVariant(score);
  const countBadgeVariant = countBadgeVariants({ variant });

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-3 rounded space-y-0!",
        scanResultsVariants({ variant }),
      )}
    >
      <Link href="#" className="font-medium underline">
        {variant[0].toUpperCase() + variant.slice(1)}
      </Link>
      <p className={cn(countBadgeVariant, "font-medium!")}>{severityCount}</p>
      <p>{description}</p>
    </div>
  );
}
