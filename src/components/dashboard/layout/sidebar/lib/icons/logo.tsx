import { cn } from "@/lib/utils";
import Image from "next/image";

interface BrandLogoIconProps {
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
}: BrandLogoIconProps) {
  const numericSize =
    typeof size === "number" ? size : parseInt(size as string, 10) || 50;

  return (
    <div
      className={cn(
        "flex gap-2 items-center",
        orientation === "vertical" ? "flex-col mb-8" : "flex-row",
        className,
      )}
    >
      <Image
        src="/images/logo-auth.png"
        alt="VulnWatch AI"
        width={numericSize}
        height={numericSize}
        style={{ width: numericSize, height: "auto" }}
      />
      {showLabel && (
        <span className="font-bold text-[#072E28]">VULN WATCH</span>
      )}
    </div>
  );
}
