import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SeverityBadge } from '../SeverityBadge';

type DnsDetailsProps = {
  backHref?: string;
};

const fixSteps = [
  'Add a DMARC record: _dmarc.yourdomain.com TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com"',
  'Start with p=none (monitor mode), then move to p=quarantine, then p=reject',
  'Use a DMARC reporting tool (Postmark, Dmarcian) to analyse reports',
];

export function DnsDetails({ backHref = '/scan/dns' }: DnsDetailsProps) {
  return (
    <section className='mx-auto w-full max-w-6xl px-4 py-6 md:px-6'>
      <Link
        href={backHref}
        className='mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition-colors hover:text-[#111827]'
      >
        <ArrowLeft className='h-4 w-4' />
        Back to results
      </Link>

      <h1 className='text-2xl font-bold text-[#111827]'>Finding Details</h1>

      <section className='mt-5 rounded-lg bg-[#EFEFEF] p-5 md:p-6'>
        <div className='flex flex-wrap items-center gap-4'>
          <SeverityBadge severity='Medium' />
          <span className='text-base font-semibold text-[#303030]'>
            No DMARC Policy Configured
          </span>
        </div>
      </section>

      <div className='mt-5 space-y-5'>
        <DetailCard title='What this Means For You'>
          Without DMARC, anyone can send emails that appear to come from your
          domain, making it easy to impersonate your business in phishing
          attacks.
        </DetailCard>

        <DetailCard title='For Your Developer (Technical Details)'>
          No _dmarc TXT record found. SPF record exists but DMARC enforcement is
          absent, leaving email spoofing prevention incomplete.
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
