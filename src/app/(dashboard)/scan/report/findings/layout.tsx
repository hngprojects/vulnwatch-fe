import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { ScanFindingsLayout } from '@/features/dashboard/components/scan/ScanFindingsLayout';

export default function FindingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex h-[50vh] w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#072e28]" />
        </div>
      }
    >
      <ScanFindingsLayout>{children}</ScanFindingsLayout>
    </Suspense>
  );
}
