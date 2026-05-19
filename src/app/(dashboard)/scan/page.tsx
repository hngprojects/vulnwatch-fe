import ScanSetupForm from "@/features/scans/configure-new-scan/ui/ScanSetupForm";
import PageHeader from "@/features/scans/shared/ui/PageHeader";
import { Shield } from "lucide-react";

export default function ScanPage() {
  return (
    <div className="px-4 md:px-6 py-6">
      <div className="mx-auto max-w-3xl space-y-10">
        <PageHeader
          title="Start a New Scan"
          description={
            <p className="flex items-center gap-2 text-sm text-neutral-600">
              <Shield size={18} />
              Configure a scan without losing your existing report flow.
            </p>
          }
        />
        <ScanSetupForm />
      </div>
    </div>
  );
}
