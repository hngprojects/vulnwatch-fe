'use client';

import { ArrowLeft } from 'lucide-react';
import { SeverityBadge } from '../SeverityBadge';

type SslDetailsProps = {
  onBack: () => void;
};

const fixSteps = [
  'Renew via certbot: certbot renew --cert-name yourdomain.com',
  'Set up automated renewal: 0 0 12 * * certbot renew --quiet (cron)',
  'Verify auto-renewal is working: certbot renew --dry-run',
];

export function SslDetails({ onBack }: SslDetailsProps) {
  return (
    <section className='mx-auto w-full max-w-6xl px-4 py-6 md:px-6'>
      <button
        type='button'
        onClick={onBack}
        className='mb-6 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111827]'
      >
        <ArrowLeft className='h-4 w-4' />
        Back to results
      </button>

      <h1 className='text-2xl font-bold text-[#111827]'>Finding Details</h1>

      <section className='mt-5 rounded-lg bg-[#EFEFEF] p-5 md:p-6'>
        <div className='flex flex-wrap items-center gap-4'>
          <SeverityBadge severity='Low' />
          <span className='text-base font-semibold text-[#303030]'>
            SSL Certificate Expires in 28 days
          </span>
        </div>
      </section>

      <div className='mt-5 space-y-5'>
        <DetailCard title='What this Means For You'>
          Your SSL certificate will expire soon. When it does, visitors will see
          a scary security warning and may not be able to reach your site.
        </DetailCard>

        <DetailCard title='For Your Developer (Technical Details)'>
          Certificate valid until 2026-05-23. Issued by Let&apos;s Encrypt.
          Auto-renewal may not be configured correctly, manual action
          recommended.
        </DetailCard>

        <section className='rounded-lg border border-[#E5E7EB] bg-white p-5 md:p-6'>
          <h2 className='text-base font-semibold text-[#303030]'>
            How to Fix it
          </h2>

          <ol className='mt-6 space-y-4'>
            {fixSteps.map((step, index) => (
              <li
                key={step}
                className='flex gap-4 text-sm leading-6 text-[#6B7280]'
              >
                <span className='grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#DFF8EC] text-xs font-bold text-[#1FA870]'>
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  );
}

type DetailCardProps = {
  title: string;
  children: React.ReactNode;
};

function DetailCard({ title, children }: DetailCardProps) {
  return (
    <section className='rounded-lg border border-[#E5E7EB] bg-white p-5 md:p-6'>
      <h2 className='text-base font-semibold text-[#303030]'>{title}</h2>
      <p className='mt-6 text-sm leading-6 text-[#6B7280]'>{children}</p>
    </section>
  );
}
