import { DomainDetailLoader } from "@/features/domain/components/detail/DomainDetailLoader";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // Consume params as required by Next.js async page convention
  await params;

  return (
    <Suspense
      fallback={
        <div className="flex h-[60vh] items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-[#072E28]" />
        </div>
      }
    >
      <DomainDetailLoader />
    </Suspense>
  );
}
