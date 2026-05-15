import { SVGProps } from "react";

interface QuickScanIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function QuickScanIcon({
  size = 16,
  color = "#FFFFFF",
  ...props
}: QuickScanIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.5975 4.2576C14.5975 4.59352 14.8698 4.86583 15.2057 4.86583C15.5416 4.86583 15.814 4.59352 15.814 4.2576H14.5975ZM11.5564 0C11.2204 0 10.9481 0.272316 10.9481 0.608229C10.9481 0.944142 
        fill={color}
      />
      <path
        d="M3.55435 7.80576C3.24738 7.94225 3.10914 8.30167 3.24557 8.60863C3.382 8.91558 3.74144 9.05385 4.0484 8.91736L3.55435 7.80576ZM11.7654 8.91736C12.0724 9.05385 12.4318 8.91558 12.5683 8.6086
        fill={color}
      />
    </svg>
  );
}
