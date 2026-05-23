import { SecurityScoreCard as ReusableScoreCard } from "@/features/dashboard/components/scan/findings/SecurityScoreCard";

interface Props {
  score: number;
}

export default function SecurityScoreCard({ score }: Props) {
  return <ReusableScoreCard score={score} size={200} />;
}
