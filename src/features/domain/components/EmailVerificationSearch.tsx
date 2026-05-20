"use client";

import {
  AtSign,
  CheckCircle2,
  Info,
  LoaderCircle,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

type EmailVerificationSearchProps = {
  onCancel: () => void;
};

type VerificationStep = {
  label: string;
  status: "complete" | "active";
};

const verificationSteps: VerificationStep[] = [
  { label: "Checking MX records", status: "complete" },
  { label: "Looking for common admin mailboxes", status: "complete" },
  { label: "Validating available addresses", status: "complete" },
  { label: "Preparing verification options...", status: "active" },
];

function VerificationIllustration() {
  return (
    <div className="relative mx-auto h-[170px] w-[170px] sm:h-[210px] sm:w-[210px]">
      <div className="absolute inset-0 rounded-full bg-[#FFF8EA]" />
      <div className="absolute inset-5 rounded-full bg-[#FFF2D3]" />
      <div className="absolute left-1/2 top-1/2 flex h-[120px] w-[104px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[6px] border border-[#D8D8D8] bg-white shadow-[0_8px_24px_rgba(17,24,39,0.08)] sm:h-[148px] sm:w-[128px]">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#072E28] text-[#072E28]">
            <AtSign className="h-5 w-5" strokeWidth={2} />
          </div>
          <div className="flex items-center gap-1.5 text-[#3C494E]">
            <AtSign className="h-3.5 w-3.5" strokeWidth={1.8} />
            <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.8} />
          </div>
        </div>
      </div>
      <div className="absolute left-9 top-6 flex h-6 w-6 items-center justify-center rounded-[4px] border border-[#E2E8F0] bg-white shadow-sm sm:left-10 sm:top-7">
        <Mail className="h-3 w-3 text-[#6B7280]" strokeWidth={1.8} />
      </div>
      <div className="absolute bottom-5 right-7 flex h-8 w-8 items-center justify-center rounded-[4px] border border-[#E2E8F0] bg-white shadow-sm sm:bottom-7 sm:right-8">
        <ShieldCheck className="h-3.5 w-3.5 text-[#6B7280]" strokeWidth={1.8} />
      </div>
    </div>
  );
}

function ProgressCard() {
  return (
    <section className="w-full max-w-[560px] rounded-[6px] border border-[#E5E7EB] bg-white px-5 py-4 shadow-[0_1px_4px_rgba(17,24,39,0.04)] sm:px-6">
      <ul className="space-y-3">
        {verificationSteps.map((step) => (
          <li key={step.label} className="flex items-center gap-2.5">
            {step.status === "complete" ? (
              <CheckCircle2
                className="h-4 w-4 shrink-0 text-[#10B981]"
                strokeWidth={1.8}
              />
            ) : (
              <LoaderCircle
                className="h-4 w-4 shrink-0 animate-spin text-[#072E28]"
                strokeWidth={1.8}
              />
            )}
            <span className="text-[13px] font-medium leading-5 text-[#2B2B2B]">
              {step.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#2B2B2B]">
          <span>Overall Progress</span>
          <span>75%</span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-[#E8E8FF]"
          role="progressbar"
          aria-label="Email verification search progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={75}
        >
          <div className="h-full w-3/4 rounded-full bg-[#072E28]" />
        </div>
        <p className="text-center text-[11px] leading-4 text-[#666666]">
          This usually takes 5-15 seconds
        </p>
      </div>
    </section>
  );
}

export default function EmailVerificationSearch({
  onCancel,
}: EmailVerificationSearchProps) {
  return (
    <div className="min-h-full bg-white px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[720px] flex-col items-center">
        <header className="mt-3 text-center sm:mt-8">
          <h1 className="text-xl font-bold leading-7 text-[#2B2B2B] sm:text-2xl">
            Searching for verification emails
          </h1>
          <p className="mx-auto mt-1 max-w-[360px] text-sm leading-5 text-[#666666] sm:max-w-[460px]">
            We&apos;re checking publicly available addresses linked to your domain
          </p>
        </header>

        <div className="mt-8 sm:mt-10">
          <VerificationIllustration />
        </div>

        <div className="mt-8 flex w-full justify-center sm:mt-10">
          <ProgressCard />
        </div>

        <aside className="mt-5 flex w-full max-w-[560px] items-start gap-3 rounded-[4px] border-l-4 border-[#072E28] bg-[#FFF8EA] px-4 py-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#6B7280]" strokeWidth={1.8} />
          <p className="text-[12px] leading-5 text-[#2B2B2B]">
            For privacy and security, VulnWatch only searches common publicly
            accessible verification mailboxes.
          </p>
        </aside>

        <button
          type="button"
          onClick={onCancel}
          className="mt-6 h-11 w-full max-w-[560px] rounded-[4px] border border-[#E5E7EB] bg-white text-sm font-medium text-[#2B2B2B] transition-colors hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Cancel verification
        </button>

        <aside className="mt-8 flex w-full max-w-[580px] items-start gap-3 rounded-[6px] bg-[#EEF4FF] px-5 py-4 text-[#2F4B7C]">
          <Info className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} />
          <div>
            <h2 className="text-[13px] font-semibold leading-5">
              Next Steps: Configure your scan schedule
            </h2>
            <p className="mt-1 text-[12px] leading-5">
              Regular scanning ensures your domain is always protected. You can
              automate weekly or monthly reports in your{" "}
              <Link
                href="/settings"
                className="font-medium underline underline-offset-2 transition-colors hover:text-[#072E28]"
              >
                Settings
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
