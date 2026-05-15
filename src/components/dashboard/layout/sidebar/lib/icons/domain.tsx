import React from "react";
import { SVGProps } from "react";

interface DomainIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function DomainIcon({ size = 18, ...props }: DomainIconProps) {
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
        d="M10.0135 20.7895C8.52967 20.7895 7.13131 20.5062 5.81837 19.9397C4.50544 19.3732 3.35887 18.5998 2.37867 17.6196C1.39846 16.6394 0.62509 15.4928 0.0585502 14.1799C-0.50799 12.8669 -0.79126 
        fill="currentColor"
      />
    </svg>
  );
}
