export function getScoreVariant(score: number) {
  let variant: "pass" | "warning" | "critical";

  if (score <= 34) {
    variant = "critical";
  } else if (score > 34 && score <= 67) {
    variant = "warning";
  } else {
    variant = "pass";
  }

  return variant;
}

export type ScoreResultVariant =
  | "pass"
  | "warning"
  | "critical"
  | "low"
  | "high_priority";

export function getScoreResultVariant(score: number): ScoreResultVariant {
  let variant: ScoreResultVariant;

  if (score <= 20) {
    variant = "critical";
  } else if (score <= 40) {
    variant = "high_priority";
  } else if (score <= 60) {
    variant = "warning";
  } else if (score <= 80) {
    variant = "low";
  } else if (score <= 100) {
    variant = "pass";
  } else {
    variant = "critical";
  }

  return variant;
}
