import { WHAT_HAPPENS_NEXT } from "@/features/scans/configure-new-scan/lib/constants";
import ScanSetupForm from "@/features/scans/configure-new-scan/ui/ScanSetupForm";
import PageHeader from "@/features/scans/shared/ui/PageHeader";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";

export default function ScanPage() {
  return (
    <div className={cn("lg:p-0 space-y-8")}>
      <PageHeader
        title="Scan Your Website"
        description="Run a safe non-intrusive security scan to find misconfigurations and potential risk"
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <ScanSetupForm />
        <div className="rounded-lg bg-white p-6 border border-neutral-200 space-y-8">
          <h2 className="font-semibold mb-6 text-lg text-neutral-900">
            What will happen next?
          </h2>
          <div className="space-y-6">
            {WHAT_HAPPENS_NEXT.map((what) => (
              <div key={what.title} className="flex gap-4 items-start">
                <div className="flex items-center justify-center bg-scan-primary-400 w-9 h-9 rounded-full p-2">
                  {what.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-medium">{what.title}</h3>
                  <p>{what.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-scan-primary-500 p-4 rounded-lg flex items-center gap-4 bg-scan-primary-400">
            <Shield className="text-scan-primary-900" size={32} />
            <p>
              We only access publicly available data. <br />
              No intrusive testing is performed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
