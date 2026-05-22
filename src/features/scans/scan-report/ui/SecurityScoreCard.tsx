import { getScoreVariant } from "../../shared/lib/utils";
import Badge from "../../shared/ui/Badge";
import Card from "../../shared/ui/Card";
import { CircularProgress } from "../../shared/ui/CircularProgress";

interface Props {
  score: number;
}

export default function SecurityScoreCard({ score }: Props) {
  const variant = getScoreVariant(score);

  function getStatus() {
    switch (variant) {
      case "pass":
        return "secure";
      case "warning":
        return "fair";
      case "critical":
        return "at risk";
    }
  }

  return (
    <Card variant="neutral">
      <div className="space-y-5 flex flex-col items-center sm:block">
        <p className="font-semibold text-neutral-800">Your security score:</p>
        <CircularProgress
          value={score}
          strokeWidth={10}
          color={
            variant === "critical"
              ? "#D00416"
              : variant === "warning"
                ? "#edb428"
                : "#1daf61"
          }
          size={200}
        />
        <Badge
          className="w-full text-center"
          variant={variant}
          label={`Your domain is ${getStatus()}`}
        />
      </div>
    </Card>
  );
}
