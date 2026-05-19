import { WHAT_HAPPENS_NEXT } from "@/features/scans/configure-new-scan/lib/constants";
import ScanSetupForm from "@/features/scans/configure-new-scan/ui/ScanSetupForm";
import PageHeader from "@/features/scans/shared/ui/PageHeader";
import { Shield } from "lucide-react";

export default function ScanPage() {
  return (
    <div className="px-4 md:px-6 py-6 space-y-8">
      <PageHeader
        title="Scan Your Website"
        description={
          <span className="text-[17px] leading-[20px] md:leading-[24px] text-[#6B7280]">
            Run a safe non-intrusive security scan to find misconfigurations and
            potential risk
          </span>
        }
      />

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <ScanSetupForm />
        <div className="rounded-xl bg-white p-6 border border-[#E5E7EB] space-y-6">
          <h2 className="font-semibold text-base text-[#111827]">
            What will happen next?
          </h2>
          <div className="space-y-6">
            {WHAT_HAPPENS_NEXT.map((what) => (
              <div key={what.title} className="flex gap-4 items-start">
                <div className="flex items-center justify-center bg-secondary w-9 h-9 rounded-full p-2">
                  {what.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-medium text-[#111827] text-sm">
                    {what.title}
                  </h3>
                  <p className="text-sm text-[#6B7280]">
                    {what.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-secondary p-4 rounded-lg flex items-center gap-4">
            <svg
              width="25"
              height="28"
              viewBox="0 0 25 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8323 1.08529L22.309 4.11782C23.0563 4.3579 23.5635 5.05285 23.5635 5.83626V17.6054C23.5635 23.0748 15.1085 26.1759 12.8377 26.9106C12.4713 27.0297 12.0922 27.0297 11.7258 26.9106C9.45499 26.1759 1 23.0748 1 17.6054V5.83626C1 5.05105 1.50723 4.35609 2.25453 4.11782L11.7312 1.08529C12.0886 0.97157 12.4731 0.97157 12.8323 1.08529Z"
                stroke="#072E28"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.76355 15.3488L10.6679 18.0564L16.7998 9.93359"
                stroke="#072E28"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm text-secondary-foreground">
              We only access publicly available data. <br />
              No intrusive testing is performed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
