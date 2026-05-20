"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type StepState = "complete" | "current" | "upcoming";

type Step = {
  label: string;
  mobileLabel?: string;
  state: StepState;
  number: number;
};

interface Props {
  steps: Step[];
}

function StepCircle({ step }: { step: Step }) {
  if (step.state === "complete") {
    return (
      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#0B7A4B] bg-white text-[#0B7A4B]">
        <Check size={16} strokeWidth={2.5} />
      </div>
    );
  }

  if (step.state === "current") {
    return (
      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#22B567] text-sm font-semibold text-white">
        {step.number}
      </div>
    );
  }

  return (
    <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#C9D5CF] bg-white text-sm font-semibold text-[#8DA095]">
      {step.number}
    </div>
  );
}

export default function DomainVerificationStepper({ steps }: Props) {
  const activeStepIndex = steps.findIndex((step) => step.state === "current");

  return (
    <div className="mx-auto w-full max-w-[760px] px-2">
      <div className="relative grid grid-cols-3 gap-3 sm:gap-6">
        <div className="pointer-events-none absolute left-[calc(16.666%+20px)] right-[calc(16.666%+20px)] top-4 z-0 sm:left-[calc(16.666%+24px)] sm:right-[calc(16.666%+24px)]">
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {steps.slice(0, -1).map((step, index) => {
              const isActive =
                index < activeStepIndex || step.state === "complete";

              return (
                <div key={`connector-${step.number}`} className="px-3 sm:px-4">
                  <div
                    className={cn(
                      "h-px w-full",
                      isActive ? "bg-[#22B567]" : "bg-[#C9D5CF]",
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {steps.map((step) => (
          <div
            key={`${step.label}-${step.number}`}
            className="relative z-10 flex min-w-0 flex-col items-center"
          >
            <StepCircle step={step} />
            <span
              className={cn(
                "mt-2 text-center text-[10px] font-semibold leading-3.5 sm:text-xs",
                step.state === "current" ? "text-[#22B567]" : "text-[#466557]",
              )}
            >
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">{step.mobileLabel ?? step.label}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
