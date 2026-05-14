import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export function TrustTransparency() {
  return (
    <section className="bg-secondary relative w-full py-16 md:py-24">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-5 text-center md:gap-8">
        <span className="text-header inline-flex items-center rounded-[10px] bg-white px-4 py-2 text-sm font-medium shadow-sm">
          Trust & Transparency
        </span>

        <h2 className="font-geist text-header max-w-[900px] text-center text-[32px] leading-[40px] font-semibold tracking-tight md:text-[56px] md:leading-[64px]">
          Your <span>Website</span> could be compromised <span>right now</span>
        </h2>

        <p className="font-geist text-header/80 max-w-[600px] text-center text-lg font-normal md:text-[24px]">
          Find out in under 60 seconds
        </p>

        <Link
          href={ROUTES.REGISTER}
          className="font-inter bg-primary inline-flex h-[56px] w-full max-w-[220px] items-center justify-center gap-2 rounded-[12px] text-[16px] font-semibold text-white shadow-lg transition-all hove
        >
          Start Free Scan
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
