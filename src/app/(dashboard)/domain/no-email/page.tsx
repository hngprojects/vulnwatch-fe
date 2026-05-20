"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import Stepper from "./_components/Stepper";
import NoEmailHero from "./_components/NoEmailHero";
import PrivacyBanner from "./_components/PrivacyBanner";
import VerificationMethods from "./_components/VerificationMethods";

export default function NoEmailFoundPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const domainName = searchParams?.get("domain") || "company.io";

  return (
    <div className="px-4 md:px-6 py-6 bg-[#F9F9F9] min-h-screen space-y-6">
      {/* Top action bar: Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm font-medium text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Stepper progress indicator */}
      <div className="py-2">
        <Stepper />
      </div>

      {/* Main card */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#E5E7EB] p-6 md:p-10 shadow-sm flex flex-col items-center gap-8 mt-4 animate-in fade-in duration-300">

        {/* Shield hero icon */}
        <NoEmailHero domainName={domainName} />

        {/* Heading and subtitle */}
        <div className="space-y-2.5 text-center">
          <h1 className="font-geist font-semibold text-[24px] leading-[32px] tracking-[-0.48px] text-center text-[#111111]">
            No Email Address Found
          </h1>
          <p className="font-geist font-normal text-[14px] leading-[20px] tracking-[0px] text-center text-[#666666] max-w-lg mx-auto">
            We couldn&apos;t find a valid email for{" "}
            <span className="font-semibold text-[#111111]">{domainName}</span>.
            The domain&apos;s WHOIS record appears to be privacy-protected.
          </p>
        </div>

        {/* WHOIS privacy protection banner */}
        <PrivacyBanner />

        {/* Mobile-only helper banner */}
        <div className="block sm:hidden w-full bg-[#F0F4FF] rounded-xl p-4">
          <div className="flex gap-3 items-start">
            <CheckCircle2 size={18} className="text-[#345DA5] shrink-0 mt-0.5" />
            <p className="font-geist font-normal text-[12px] leading-[19.5px] tracking-[0px] text-[#345DA5]">
              Next Steps: Configure your scan schedule. Regular scanning ensures
              your domain is always protected. You can automate weekly or monthly
              reports in your{" "}
              <Link href="/settings" className="underline text-[#345DA5]">
                Settings
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Alternative verification methods + footer help link */}
        <VerificationMethods domainName={domainName} />

      </div>
    </div>
  );
}
