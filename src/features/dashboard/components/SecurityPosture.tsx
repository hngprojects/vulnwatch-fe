import Link from "next/link";

interface SecurityPostureProps {
  score: number; // 0–100
}

export function SecurityPosture({ score }: SecurityPostureProps) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getStatusLabel = (s: number) => {
    if (s >= 85) return { label: "Strong", color: "#22C55E" };
    if (s >= 65) return { label: "Moderate", color: "#F59E0B" };
    return { label: "At Risk", color: "#EF4444" };
  };

  const { label: statusLabel, color: statusColor } = getStatusLabel(score);

  // Ring color based on score
  const ringColor =
    score >= 85 ? "#22C55E" : score >= 65 ? "#A0E870" : "#EF4444";

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col gap-6 h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 flex-1">
        {/* Left side: Text content */}
        <div className="flex flex-col items-start text-left max-w-[240px]">
          <h3 className="text-base font-bold text-[#111827]">Security Posture</h3>
          <span className="mt-2 inline-flex items-center text-xs font-bold text-[#10B981] px-0 rounded-full">
            Good foundation
          </span>
          <p className="text-sm text-[#4B5563] mt-3 leading-relaxed">
            You&apos;re doing well! Fix the critical issues to strengthen your security.
          </p>
          <Link
            href="/report"
            className="mt-4 text-sm font-bold text-primary hover:opacity-70 transition-opacity flex items-center gap-1"
          >
            View all issues <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Right side: Ring + score */}
        <div className="relative flex-shrink-0 mx-auto md:mx-0">
          <svg width="120" height="120" viewBox="0 0 136 136" aria-label={`Security score: ${score} out of 100`}>
            {/* Track */}
            <circle
              cx="68"
              cy="68"
              r={radius}
              fill="none"
              stroke="#F3F4F6"
              strokeWidth="12"
            />
            {/* Progress */}
            <circle
              cx="68"
              cy="68"
              r={radius}
              fill="none"
              stroke="#10B981"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 68 68)"
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>
          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-[#111827] leading-none">{score}</span>
            <span className="text-xs text-[#9CA3AF] mt-0.5">/ 100</span>
          </div>
        </div>
      </div>
    </div>
  );
}