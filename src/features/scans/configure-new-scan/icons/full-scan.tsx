import { SVGProps } from "react";

interface FullScanIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  height?: number;
  width?: number;
  color?: string;
}

export function FullScanIcon({
  height = 20,
  width = 16,
  color = "#FFFFFF",
  ...props
}: FullScanIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.4979 2.56276L8.23318 0.0456472C8.14553 0.0152157 8.02794 0 7.91036 0C7.79277 0 7.67518 0.0152157 7.58753 0.0456472L0.322828 2.56276C0.14538 2.62363 0 2.8323 0 3.02358V13.5094C0 13.7007 
        fill={color}
      />
    </svg>
  );
}
