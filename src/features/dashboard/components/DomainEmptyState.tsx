import Link from 'next/link';
import Image from 'next/image';
import { ScanLine, ArrowRight } from 'lucide-react';

interface DomainEmptyStateProps {
  domainName: string;
  domainId: string;
}

export function DomainEmptyState({ domainName, domainId }: DomainEmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-360px)] px-4 py-4 text-center'>
      {/* Illustration */}
      <div className='mb-6'>
        <Image
          src='/images/dashboard-empty.png'
          alt='No scans yet'
          width={200}
          height={200}
          className='h-auto w-48'
        />
      </div>

      {/* Heading */}
      <h2 className='text-xl font-bold text-[#111827] mb-2'>
        No scans yet for {domainName}
      </h2>
      <p className='text-sm text-[#6B7280] max-w-sm mb-8 leading-relaxed'>
        Run a security scan to see your vulnerability report and security
        posture for this domain.
      </p>

      {/* CTA */}
      <Link
        href={`/scan?domainId=${encodeURIComponent(domainId)}&domainName=${encodeURIComponent(domainName)}`}
        className='inline-flex items-center justify-center gap-2 px-8 py-[15px] bg-[#072E28] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity w-full max-w-[320px] md:w-auto md:h-12 md:py-0 whitespace-nowrap'
      >
        <ScanLine className='h-5 w-5' />
        Run New Scan
        <ArrowRight className='h-5 w-5 md:hidden ml-auto' />
      </Link>
    </div>
  );
}
