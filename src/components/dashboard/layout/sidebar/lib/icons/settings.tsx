import { SVGProps } from "react";

interface SettingsIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function SettingsIcon({ size = 18, ...props }: SettingsIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.04715 20.7895L6.61765 17.3363C6.385 17.2464 6.16578 17.1385 5.95997 17.0126C5.75417 16.8867 5.55284 16.7518 5.35599 16.6079L2.16157 17.9568L-0.79126 12.831L1.97366 10.7267C1.95576 10.600
        fill="currentColor"
      />
    </svg>
  );
}
