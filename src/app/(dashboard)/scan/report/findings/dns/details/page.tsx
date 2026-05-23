'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DnsDetails } from '@/features/dashboard/components/scan/findings/dns/DnsDetails';
import { Loader2 } from 'lucide-react';

function DnsDetailsContent() {
  const searchParams = useSearchParams();
  const scanId = searchParams.get('scanId');
  const findingId = searchParams.get('findingId');
  const backHref = scanId
    ? `/scan/report/findings/dns?scanId=${encodeURIComponent(scanId)}`
    : '/scan/report/findings/dns';

  return <DnsDetails backHref={backHref} scanId={scanId} findingId={findingId} />;
}

export default function DnsDetailsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <DnsDetailsContent />
    </Suspense>
  );
}
