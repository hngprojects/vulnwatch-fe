import Link from 'next/link';
import Image from 'next/image';
import { ScanLine } from 'lucide-react';

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
      <h2 className='font-geist text-[40px] font-bold tracking-[-1.5px] leading-[48px] text-[#2B2B2B] mb-4'>
        No scans yet for {domainName}
      </h2>
      <p className='font-inter text-[20px] font-normal leading-[32px] text-[#666666] max-w-[513px] mb-8'>
        Run a security scan to see your vulnerability report and security
        posture for this domain.
      </p>

      {/* CTA */}
      <Link
        href={`/scan?domainId=${encodeURIComponent(domainId)}&domainName=${encodeURIComponent(domainName)}`}
        className='inline-flex items-center justify-center gap-4 px-6 py-4 bg-[#072E28] text-white rounded-xl hover:opacity-90 transition-opacity w-[190px] h-[54px]'
      >
        <ScanLine className='h-5 w-5' />
        <span className='font-inter font-semibold text-[16px] leading-[22px] tracking-[-0.5px]'>
          Run New Scan
        </span>
      </Link>
    </div>
  );
}
