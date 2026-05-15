import { cn } from "@/lib/utils";
import Image from "next/image";

interface BrandLogoIconProps {
  size?: number | string;
  showLabel?: boolean;
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export function BrandLogoIcon({
  size = 120,
  orientation = "vertical",
}: BrandLogoIconProps) {
  const numericSize =
    typeof size === "number" ? size : parseInt(size as string, 10) || 50;

  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={
          orientation === "horizontal"
            ? "/images/logo-horizontal.png"
            : "/images/logo-only.png"
        }
        alt="VulnWatch AI"
        width={numericSize}
        height={numericSize}
        style={{ width: numericSize, height: "auto" }}
      />
      {orientation === "vertical" && (
        <p className="font-bold text-sm text-[#4F4F4F]">VULN WATCH</p>
      )}
    </div>
  );
}
