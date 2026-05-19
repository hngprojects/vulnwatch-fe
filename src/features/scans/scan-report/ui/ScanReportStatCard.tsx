import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import Card from "../../shared/ui/Card";

const badgeVariants = cva("rounded-lg px-5 py-1 space-y-3 font-medium", {
  variants: {
    badgeSeverity: {
      critical: "bg-scan-red-400/10 text-scan-red-400",
      pass: "bg-scan-green-400/10 text-scan-green-400",
      warning: "bg-scan-yellow-400/10 text-scan-yellow-400",
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
            className="p-0 flex items-center gap-2 h-auto!"
          >
            View detailed report <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
