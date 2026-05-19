'use client';

import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { SeverityBadge } from '../SeverityBadge';
import { exposureFindings, scanOverview } from '../scan-findings-data';

type ExposureDetailsProps = {
  onBack: () => void;
};

const fixSteps = [
  'Nginx: remove autoindex on; from server block',
  'Apache: add options, Indexes to .htaccess',
  'Add an empty index.html to the directory',
];

export function ExposureDetails({ onBack }: ExposureDetailsProps) {
  const finding = exposureFindings[0];
  const exposedPath = finding.checks?.[0]?.path ?? '/assets/';

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

      <div>
        <h1 className='text-2xl font-bold text-[#111827]'>Finding Details</h1>

        <div className='mt-5'>
          <h2 className='text-lg font-semibold text-[#303030]'>
            Exposed Files and Pages
          </h2>
          <p className='mt-3 text-sm text-[#6B7280]'>
            4 things needs attention on {scanOverview.domain}
          </p>
        </div>
      </div>

      <section className='mt-6 rounded-lg bg-[#EFEFEF] p-5 md:p-6'>
        <div className='flex flex-wrap items-center gap-4'>
          <SeverityBadge severity={finding.severity} />
          <span className='text-base font-semibold text-[#243B78]'>
            {exposedPath}
          </span>
        </div>
        <p className='mt-5 text-sm leading-6 text-[#303030]'>
          Directory listing enabled on {exposedPath}
        </p>
      </section>

      <div className='mt-5 space-y-5'>
        <DetailCard title='What this Means For You'>
          Visiting {exposedPath} shows a file browser of your website files.
          exposing your directory structure and 3 potentially sensitive files
        </DetailCard>

        <DetailCard title='For Your Developer (Technical Details)'>
          HTTP GET {exposedPath} returns 200 with HTML directory index. Autoindex
          directive is enabled
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

        <section className='flex gap-4 rounded-lg border border-[#073B32] bg-[#9BE96A] p-5 text-sm leading-6 text-[#356139] md:p-6'>
          <ShieldCheck className='mt-0.5 h-5 w-5 shrink-0 text-[#073B32]' />
          <p>
            We found this by looking at publicly available information only,
            like reading a sign on the outside of a building. We never tried to
            log in, access your data, or interfere with your site in any way.
          </p>
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
