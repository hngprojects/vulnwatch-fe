export type Severity = 'Critical' | 'High' | 'Medium' | 'Low' | 'Pass';

const severityStyles: Record<Severity, string> = {
  Critical: 'bg-[#FFE6EC] text-[#D92D50]',
  High: 'bg-[#FFF0E6] text-[#E46B16]',
  Medium: 'bg-[#FFF8DB] text-[#C9A227]',
  Low: 'bg-[#E8EDFF] text-[#2F5BC7]',
  Pass: 'bg-[#DFF8EC] text-[#1FA870]',
};

type SeverityBadgeProps = {
  severity: Severity;
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  return (
    <span
      className={[
        'inline-flex min-w-16 items-center justify-center rounded-md px-3 py-1 text-xs font-semibold',
        severityStyles[severity],
      ].join(' ')}
    >
      {severity}
    </span>
  );
}
