'use client';

export function SecurityScoreTrend() {
  return (
    <div
      className="flex flex-col gap-6"
      style={{
        background: '#FFFFFF',
        border: '1px solid #EDEDED',
        borderRadius: '12px',
        padding: '24px',
        flex: 1,
        minHeight: '421px',
      }}
    >
      <span
        style={{
          fontFamily: 'Geist, sans-serif',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '24px',
          color: '#2B2B2B',
        }}
      >
        Security Score Trend
      </span>

      <div className="flex flex-1 items-center justify-center min-h-[325px]">
        <p className="text-[#666666] text-sm text-center">
          Nothing to show yet. Run more scans to get the score trend.
        </p>
      </div>
    </div>
  );
}
