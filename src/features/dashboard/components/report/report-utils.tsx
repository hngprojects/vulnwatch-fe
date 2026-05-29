import { RotateCw, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function parseDateTime(dateStr: string) {
  if (!dateStr) return { date: "—", time: "—" };
  try {
    const d = new Date(dateStr);
    const date = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    const time = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    return { date, time };
  } catch {
    return { date: "—", time: "—" };
  }
}

export function ScanTypeIcon({ coverage }: { coverage: string }) {
  const Icon = coverage?.toLowerCase().includes("quick") ? RotateCw : Shield;
  return <Icon className="h-4 w-4 shrink-0 text-gray-700" strokeWidth={1.8} />;
}

type RiskLevel = "Low" | "High" | "Critical";

const riskDotClassName: Record<RiskLevel, string> = {
  Low: "bg-brand-risk-low",
  High: "bg-brand-risk-high",
  Critical: "bg-brand-risk-critical",
};

export function RiskIndicator({ level }: { level: string | null }) {
  let mappedLevel: RiskLevel = "Low";
  let statusText = "Good";

  if (level) {
    const norm = level.toLowerCase();
    if (norm === "critical") {
      mappedLevel = "Critical";
      statusText = "Immediate Action Required";
    } else if (norm === "high") {
      mappedLevel = "High";
      statusText = "Action Needed";
    } else if (norm === "medium" || norm === "moderate") {
      mappedLevel = "High";
      statusText = "Action Recommended";
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className={cn("h-2 w-2 rounded-full", riskDotClassName[mappedLevel])} aria-hidden="true" />
        <span className="text-sm font-medium text-brand-dark capitalize">{level || "Low"}</span>
      </div>
      <p className="text-sm text-brand-gray">{statusText}</p>
    </div>
  );
}
