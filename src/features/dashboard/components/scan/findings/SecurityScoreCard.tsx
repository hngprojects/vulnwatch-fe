import { getScoreVariant } from '@/features/scans/shared/lib/utils';
import { CircularProgress } from '@/features/scans/shared/ui/CircularProgress';

type SecurityScoreCardProps = {
  score: number;
  label?: string;
  size?: number;
};

export function SecurityScoreCard({
  score,
  label,
  size = 160,
}: SecurityScoreCardProps) {
  const variant = getScoreVariant(score);

  const getStatus = () => {
    switch (variant) {
      case 'pass':
        return 'secure';
      case 'warning':
        return 'fair';
      case 'critical':
        return 'at risk';
    }
  };

  const getBadgeColors = () => {
    switch (variant) {
      case 'pass':
        return 'bg-[#DFF8EC] text-[#1FA870]';
      case 'warning':
        return 'bg-brand-pending-bg text-brand-pending-text';
      case 'critical':
        return 'bg-brand-failed-bg text-brand-failed-text';
    }
  };

  const scoreColor = 
    variant === 'critical'
      ? '#D00416'
      : variant === 'warning'
        ? '#dd6414'
        : '#03b073';

  const displayLabel = label || `Your domain is ${getStatus()}`;

  return (
    <section className='rounded-xl border border-[#E5E7EB] bg-white p-5 flex flex-col items-center justify-between h-full'>
      <h2 className='text-sm font-semibold text-[#111827] self-start'>
        Your security score:
      </h2>

      <div className='mt-5 flex flex-col items-center w-full'>
        <CircularProgress
          value={score}
          strokeWidth={10}
          color={scoreColor}
          size={size}
        />

        <p className={`mt-5 w-full rounded-full px-4 py-2 text-center text-sm font-semibold ${getBadgeColors()}`}>
          {displayLabel}
        </p>
      </div>
    </section>
  );
}
