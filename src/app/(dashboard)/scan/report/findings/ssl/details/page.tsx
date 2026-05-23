'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SslDetails } from '@/features/dashboard/components/scan/findings/ssl/SslDetails';
import { Loader2 } from 'lucide-react';

function SslDetailsContent() {
  const searchParams = useSearchParams();
  const scanId = searchParams.get('scanId');
  const backHref = scanId
    ? `/scan/report/findings/ssl?scanId=${encodeURIComponent(scanId)}`
    : '/scan/report/findings/ssl';

  return <SslDetails backHref={backHref} />;
}

export default function SslDetailsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <SslDetailsContent />
    </Suspense>
  );
}
