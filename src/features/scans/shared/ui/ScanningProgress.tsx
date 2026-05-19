const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const rings = [
  { size: 220, opacity: 0.18 },
  { size: 248, opacity: 0.13 },
  { size: 278, opacity: 0.09 },
  { size: 308, opacity: 0.06 },
  { size: 338, opacity: 0.04 },
  { size: 368, opacity: 0.025 },
];

/**
 * ScanningProgress
 *
 * Props:
 *   value  {number}  0–100  (default: 25)
 *   label     {string}         text below percentage (default: "Scanning....")
 *   size      {number}         outer container px size (default: 280)
 *   color     {string}         arc stroke color (default: "#3D4EFF")
 *   trackColor {string}        background track color (default: "#E8EAFF")
 */
export default function ScanningProgress({
  value = 25,
  label = "Scanning....",
  size = 280,
  color = "#3D4EFF",
  trackColor = "#E8EAFF",
}: {
  value?: number;
  label?: string;
  size?: number;
  color?: string;
  trackColor?: string;
}) {
  const pct = Math.min(100, Math.max(0, value));
  const offset = CIRCUMFERENCE * (1 - pct / 100);

  const svgSize = size * (220 / 280);
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const scaledRadius = RADIUS * (svgSize / 220);
  const scaledCircumference = 2 * Math.PI * scaledRadius;
  const scaledOffset = scaledCircumference * (1 - pct / 100);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer fading rings */}
      {rings.map((ring, i) => {
        const scaledRingSize = ring.size * (size / 280);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: scaledRingSize,
              height: scaledRingSize,
              borderRadius: "50%",
              border: `1.5px solid ${color}`,
              opacity: ring.opacity,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* SVG arc */}
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        style={{ position: "absolute" }}
      >
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={scaledRadius}
          fill="none"
          stroke={trackColor}
          strokeWidth={8}
        />
        {/* Progress arc */}
        <circle
          cx={cx}
          cy={cy}
          r={scaledRadius}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={scaledCircumference}
          strokeDashoffset={scaledOffset}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: "stroke-dashoffset 0.4s ease" }}
        />
      </svg>

      {/* Center label */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            fontSize: size * 0.128,
            fontWeight: 500,
            color: "#1a1a2e",
            lineHeight: 1,
          }}
        >
          {pct}%
        </span>
        <span
          style={{
            fontSize: size * 0.046,
            color: color,
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
