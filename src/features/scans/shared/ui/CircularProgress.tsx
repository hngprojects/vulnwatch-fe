interface CircularProgressProps {
  value: number; // 0–100
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  color = "#CC1F1F",
}: CircularProgressProps) {
  const r = (size - strokeWidth) / 2;
  const circ = Number((2 * Math.PI * r).toFixed(2));
  const offset = Number((circ * (1 - value / 100)).toFixed(2));
  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Track */}
      <circle
        cx={center}
        cy={center}
        r={r}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        cx={center}
        cy={center}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
      />
      {/* Label */}
      <text
        x={center}
        y={center - 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="32"
        fontWeight="500"
        fill={color}
      >
        {value}
      </text>
      <text
        x={center}
        y={center + 16}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="16"
        fill="#9ca3af"
      >
        /100
      </text>
    </svg>
  );
}
