import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import Report from "@/features/dashboard/components/report/Report";

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[60vh] w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#072e28]" />
        </div>
      }
    >
      <Report />
    </Suspense>
  );
}
