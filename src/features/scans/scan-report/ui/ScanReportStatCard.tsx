import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import Card from "../../shared/ui/Card";

const badgeVariants = cva("rounded-md px-3 py-1 text-sm font-geist", {
  variants: {
    badgeSeverity: {
      critical: "bg-[#FDEBEC] text-[#D00416]",
      pass: "bg-[#E8F7EF] text-[#1DAF61]",
      warning: "bg-[#FFFBF0] text-[#B27F06]",
    },
  },
});

interface Props {
  score: number;
  type: string;
  description: string;
}

export default function ScanReportScoreStatCard({
  score,
  type,
  description,
}: Props) {
  let badgeSeverity: "critical" | "pass" | "warning";

  if (Number(score) <= 34) {
    badgeSeverity = "critical";
  } else if (Number(score) <= 69) {
    badgeSeverity = "warning";
  } else {
    badgeSeverity = "pass";
  }

  const badgeClass = badgeVariants({ badgeSeverity });

  return (
    <Card>
      <div className="space-y-2.5">
        <div className="flex justify-between items-center">
          <div className="font-medium border border-neutral-300 rounded-lg px-4 py-1 bg-neutral-100 text-sm">
            {type}
          </div>
          <p className={badgeClass}>
            {badgeSeverity[0].toUpperCase() + badgeSeverity.slice(1)}
          </p>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-neutral-800">{score}</span>
          <span className="text-neutral-500 text-sm">/100</span>
        </div>
        <p className="text-sm text-neutral-500">{description}</p>
        <div className="flex justify-end">
          <Button
            variant="link"
            className="p-0 flex items-center gap-2 h-auto! text-[#3C574F] font-medium"
          >
            View details <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
