import { Lock } from "lucide-react";

export default function PrivacyBanner() {
  return (
    <div className="w-full bg-[#A0E870] border border-[#072E28] rounded-xl px-4 py-3 flex items-center justify-start gap-2.5 text-[#072E28]">
      <Lock size={16} className="text-[#072E28] shrink-0" />
      <span className="font-geist font-normal text-[14px] leading-[20px] tracking-[0px] text-[#072E28]">
        WHOIS privacy protection is active on this domain.
      </span>
    </div>
  );
}
