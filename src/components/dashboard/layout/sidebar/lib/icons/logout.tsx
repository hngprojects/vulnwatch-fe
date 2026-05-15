import { SVGProps } from "react";

interface LogoutIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function LogoutIcon({ size = 18, ...props }: LogoutIconProps) {
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
        d="M6.875 14.6875C6.875 14.9361 6.77623 15.1746 6.60041 15.3504C6.4246 15.5262 6.18614 15.625 5.9375 15.625H0.9375C0.68886 15.625 0.450403 15.5262 0.274587 15.3504C0.0987719 15.1746 0 14.9361 
        fill="currentColor"
      />
    </svg>
  );
}
