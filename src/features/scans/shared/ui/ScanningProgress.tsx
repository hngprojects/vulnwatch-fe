

const RADIUS = 90;

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
  size = 340,
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

  const svgSize = size * (220 / 280);
  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const scaledRadius = RADIUS * (svgSize / 220);
  const scaledCircumference = 2 * Math.PI * scaledRadius;
  const scaledOffset = scaledCircumference * (1 - pct / 100);
  const ringBaseSize = scaledRadius * 2 + 14;

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
      {/* Inject style for keyframes */}
      <style>{`
        @keyframes sonar-ripple {
          0% {
            transform: scale(1);
            opacity: 0;
          }
          2% {
            opacity: 0.30;
          }
          20% {
            opacity: 0.25;
          }
          40% {
            opacity: 0.20;
          }
          60% {
            opacity: 0.10;
          }
          80% {
            opacity: 0.05;
          }
          100% {
            transform: scale(1.65);
            opacity: 0;
          }
        }
        .sonar-ring {
          animation: sonar-ripple 6s linear infinite;
        }
      `}</style>

      {/* Outer pulsing rings originating from the center and expanding outward */}
      {[0, -1.2, -2.4, -3.6, -4.8].map((delay, i) => {
        return (
          <div
            key={i}
            className="sonar-ring"
            style={{
              position: "absolute",
              width: ringBaseSize,
              height: ringBaseSize,
              borderRadius: "50%",
              border: "1.2px solid #292DEC",
              pointerEvents: "none",
              animationDelay: `${delay}s`,
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
          strokeWidth={14}
        />
        {/* Progress arc */}
        <circle
          cx={cx}
          cy={cy}
          r={scaledRadius}
          fill="none"
          stroke={color}
          strokeWidth={14}
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
            color: "#666666",
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
