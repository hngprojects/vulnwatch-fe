import Image from "next/image";
import { FOOTER_BRAND } from "../../constants/footer-meta";

export function FooterBrand() {
  return (
    <div className="flex flex-col items-start gap-5 lg:max-w-[340px]">
      <Image
        src="/images/logo-footer.png"
        alt="VulnWatch AI Logo"
        width={180}
        height={72}
        className="h-auto w-[140px] object-contain md:w-[180px]"
        priority
      />

      <p
        className="font-geist text-[18px] leading-[28px] font-normal tracking-[-0.01em]"
        style={{ color: "#666666" }}
      >
        {FOOTER_BRAND.description}
      </p>
    </div>
  );
}
