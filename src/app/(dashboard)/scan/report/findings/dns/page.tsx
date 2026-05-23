import { Suspense } from 'react';
import { ScanFindings } from '@/features/dashboard/components/scan/ScanFindings';
import { Loader2 } from 'lucide-react';

export default function DnsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ScanFindings activeTab='dns' />
    </Suspense>
  );
}
