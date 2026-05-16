import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    title: "Verify Your Domain",
    description: "Add and verify your domain",
  },
  {
    number: 2,
    title: "Run a Scan",
    description: "We'll scan for vulnerabilities",
  },
  {
    number: 3,
    title: "Review your results",
    description: "Get actionable insights",
  },
];

export function StepIndicator() {
  return (
    <>
      {/* Desktop: horizontal */}
      <div className="hidden md:flex items-start justify-center gap-0 w-full max-w-2xl mx-auto">
        {STEPS.map((step, index) => (
          <div key={step.number} className="flex items-start flex-1">
            <div className="flex flex-col items-center flex-1">
              {/* Circle */}
              <div className="h-10 w-10 rounded-full flex items-center justify-center text-[#111827] text-sm font-bold shrink-0 border-2 border-[#111827] bg-white">
                {step.number}
              </div>
              <div className="mt-3 text-center px-2">
                <p className="text-sm font-semibold text-[#111827]">{step.title}</p>
                <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">{step.description}</p>
              </div>
            </div>
            {/* Connector */}
            {index < STEPS.length - 1 && (
              <div className="flex items-start pt-5 mx-1 shrink-0">
                <div className="w-16 border-t-2 border-dashed border-[#D1D5DB]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="flex flex-col gap-0 md:hidden w-full max-w-xs mx-auto">
        {STEPS.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center">
            {/* Circle */}
            <div className="h-10 w-10 rounded-full bg-white border-2 border-[#111827] flex items-center justify-center text-[#111827] text-sm font-bold shrink-0">
              {step.number}
            </div>
            {/* Text */}
            <div className="mt-3 text-center px-4">
              <p className="text-sm font-semibold text-[#111827]">{step.title}</p>
              <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">{step.description}</p>
            </div>
            {/* Connector */}
            {index < STEPS.length - 1 && (
              <div className="w-px h-10 border-l-2 border-dashed border-[#D1D5DB] my-3" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}