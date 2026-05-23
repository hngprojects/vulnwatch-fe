'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ExposureDetails } from '@/features/dashboard/components/scan/findings/exposure/ExposureDetails';
import { Loader2 } from 'lucide-react';

function ExposureDetailsContent() {
  const searchParams = useSearchParams();
  const scanId = searchParams.get('scanId');
  const backHref = scanId
    ? `/scan/report/findings/exposure?scanId=${encodeURIComponent(scanId)}`
    : '/scan/report/findings/exposure';

  return <ExposureDetails backHref={backHref} />;
}

export default function ExposureDetailsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ExposureDetailsContent />
    </Suspense>
  );
}
