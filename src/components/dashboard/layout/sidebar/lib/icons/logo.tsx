import { cn } from "@/lib/utils";
import React, { SVGProps } from "react";

interface BrandLogoIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  showLabel?: boolean;
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export function BrandLogoIcon({
  size = 50,
  showLabel = true,
  className,
  orientation = "vertical",
  ...props
}: BrandLogoIconProps) {
  return (
    <div
      className={cn(
        "flex gap-2 items-center",
        orientation === "vertical" ? "flex-col mb-8" : "flex-row",
        className,
      )}
    >
      <svg
        width={size}
        height="auto"
        viewBox="0 0 50 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M5.5584 8.3423C5.59632 8.41534 5.63463 8.48938 5.67353 8.56427C6.73047 10.5989 8.14195 13.299 9.56284 15.9662C10.8998 18.4759 12.2354 20.9381 13.289 22.7866C13.6975 22.0369 14.1508 21.212
          fill="#A0E870"
        />
        <path
          d="M34.6046 10.5514C35.3087 10.4071 35.844 10.6595 36.021 10.752C36.3929 10.9463 36.6196 11.2092 36.6445 11.2367C36.721 11.3211 36.7786 11.3972 36.8109 11.4408C36.9268 11.5977 37.0419 11.787
          fill="#072E28"
        />
        <path
          d="M43.1247 8.40137C43.1247 9.54855 42.2176 10.4785 41.0987 10.4785C39.9798 10.4785 39.0728 9.54855 39.0728 8.40137C39.0728 7.25419 39.9798 6.32422 41.0987 6.32422C42.2176 6.32422 43.1247 7.
          fill="#A0E870"
        />
        <path
          d="M41.4341 0.00135996C42.5457 -0.01896 43.65 0.188611 44.6822 0.611929C45.7144 1.03525 46.6538 1.66576 47.445 2.46643C48.2363 3.26711 48.8635 4.22186 49.2898 5.27451C49.7162 6.32716 49.9331
          fill="#A0E870"
        />
      </svg>
      {showLabel && (
        <span className="font-bold text-[#072E28]">VULN WATCH</span>
      )}
    </div>
  );
}
