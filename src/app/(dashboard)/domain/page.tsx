import DomainPage from "@/features/domain/components/DomainPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-sm text-neutral-500">Loading domain details...</div>}>
      <DomainPage />
    </Suspense>
  );
}
