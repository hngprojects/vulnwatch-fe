import { SVGProps } from "react";

interface ReportIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function ReportIcon({ size = 18, ...props }: ReportIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.20874 13.207H5.20874V6.20703H3.20874V13.207ZM7.20874 13.207H9.20874V3.20703H7.20874V13.207ZM11.2087 13.207H13.2087V9.20703H11.2087V13.207ZM1.20874 17.207C0.65874 17.207 0.187907 17.0112 
        fill="currentColor"
      />
    </svg>
  );
}
