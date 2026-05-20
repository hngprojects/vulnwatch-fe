"use client";

import {
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Info,
  Mail,
} from "lucide-react";

type EmailVerificationSelectProps = {
  onChooseDifferentMethod: () => void;
};

type VerificationEmail = {
  id: string;
  email: string;
  role: string;
  recommended?: boolean;
};

type VerificationStep = {
  label: string;
  state: "complete" | "active";
};

const verificationSteps: VerificationStep[] = [
  { label: "Domain Info", state: "complete" },
  { label: "Verification Method", state: "complete" },
  { label: "Select Email", state: "active" },
];

const verificationEmails: VerificationEmail[] = [
  {
    id: "admin",
    email: "admin@mycompany.com",
    role: "Domain Admin",
    recommended: true,
  },
  {
    id: "postmaster",
    email: "postmaster@mycompany.com",
    role: "Postmaster",
  },
  {
    id: "webmaster",
    email: "webmaster@mycompany.com",
    role: "Webmaster",
  },
];

function VerificationStepper() {
  return (
    <ol className="mx-auto flex w-full max-w-[560px] items-start justify-between gap-2">
      {verificationSteps.map((step, index) => {
        const isLastStep = index === verificationSteps.length - 1;
        const isComplete = step.state === "complete";

        return (
          <li key={step.label} className="relative flex flex-1 flex-col items-center">
            {!isLastStep && (
              <span
                className="absolute left-[calc(50%+20px)] right-[calc(-50%+20px)] top-4 h-0.5 bg-[#10B981]"
                aria-hidden="true"
              />
            )}
            <span
              className={
                isComplete
                  ? "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#10B981] bg-white text-[#10B981]"
                  : "relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#10B981] text-xs font-semibold text-white"
              }
            >
              {isComplete ? <Check className="h-4 w-4" strokeWidth={2} /> : index + 1}
            </span>
            <span className="mt-2 max-w-[92px] text-center text-[11px] font-medium leading-4 text-[#10B981] sm:max-w-none">
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function EmailOption({ email, selected }: { email: VerificationEmail; selected: boolean }) {
  return (
    <label
      className={
        selected
          ? "flex cursor-pointer items-center gap-3 rounded-[8px] border border-[#072E28] bg-white px-4 py-4 shadow-[0_1px_4px_rgba(17,24,39,0.04)]"
          : "flex cursor-pointer items-center gap-3 rounded-[8px] border border-[#F0F0F0] bg-white px-4 py-4 opacity-70"
      }
    >
      <input
        type="radio"
        name="verification-email"
        value={email.id}
        defaultChecked={selected}
        className="sr-only"
      />
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[#F3F4F6] text-[#3C494E]">
        <Mail className="h-4 w-4" strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="truncate text-[13px] font-semibold text-[#2B2B2B] sm:text-sm">
            {email.email}
          </span>
          {email.recommended && (
            <span className="rounded-full bg-[#10B981] px-2 py-0.5 text-[9px] font-semibold uppercase leading-4 text-white">
              Recommended
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[11px] leading-4 text-[#666666]">
          Role: {email.role}
        </span>
      </span>
      {selected ? (
        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#072E28]" strokeWidth={1.8} />
      ) : (
        <Circle className="h-5 w-5 shrink-0 text-[#E5E7EB]" strokeWidth={1.8} />
      )}
    </label>
  );
}

export default function EmailVerificationSelect({
  onChooseDifferentMethod,
}: EmailVerificationSelectProps) {
  return (
    <div className="min-h-full bg-white px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[760px]">
        <VerificationStepper />

        <section className="mx-auto mt-8 max-w-[560px] rounded-[8px] border border-[#F0F0F0] bg-white p-4 shadow-[0_1px_4px_rgba(17,24,39,0.03)] sm:p-6">
          <header>
            <h1 className="text-base font-semibold leading-6 text-[#2B2B2B]">
              Select Verification Email
            </h1>
            <p className="mt-1 text-[13px] leading-5 text-[#666666]">
              Choose an email address to receive the verification link.
            </p>
          </header>

          <div className="mt-6 space-y-4">
            {verificationEmails.map((email, index) => (
              <EmailOption
                key={email.id}
                email={email}
                selected={index === 0}
              />
            ))}
          </div>

          <aside className="mt-6 flex items-start gap-3 rounded-[8px] bg-[#EEF4FF] px-4 py-3 text-[#2F4B7C]">
            <Info className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} />
            <div>
              <h2 className="text-[13px] font-semibold leading-5">
                Important Notice
              </h2>
              <p className="mt-1 text-[12px] leading-5">
                WHOIS privacy protection may be hiding your actual email address.
                Please ensure you have access to one of the administrative
                addresses listed above to successfully receive the verification
                link.
              </p>
            </div>
          </aside>

          <div className="mt-6 rounded-b-[8px] bg-[#A0E870] p-3">
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-[6px] bg-[#072E28] text-sm font-semibold text-white transition-colors hover:bg-[#0A3B34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#072E28] focus-visible:ring-offset-2"
            >
              Send Verification Email
              <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={onChooseDifferentMethod}
              className="mt-3 h-7 w-full text-center text-[12px] font-medium text-[#2B2B2B] underline-offset-2 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#072E28]"
            >
              Choose a different verification method
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
