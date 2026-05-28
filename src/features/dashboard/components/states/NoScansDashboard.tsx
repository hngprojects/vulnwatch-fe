import type { Domain } from '@/features/domain/types/domain.types';
import { DomainSelector } from '@/features/dashboard/components/DomainSelector';
import { DomainEmptyState } from '@/features/dashboard/components/DomainEmptyState';
import { TourProvider } from '@/features/dashboard/components/tour/TourProvider';

interface NoScansDashboardProps {
  domainsForSelector: Domain[];
  selectedDomain: Domain;
  onDomainChange: (domain: Domain) => void;
}

export function NoScansDashboard({
  domainsForSelector,
  selectedDomain,
  onDomainChange,
}: NoScansDashboardProps) {
  return (
    <div className='px-4 md:px-6 py-6 space-y-5 max-w-7xl mx-auto'>
      <TourProvider />
      
      {/* Page header */}
      <div className='flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-xl font-bold text-[#111827]'>Dashboard</h1>
            <p className='text-sm text-[#6B7280] mt-0.5'>
              Overview of your security posture
            </p>
          </div>
        </div>

        <div className='flex w-full md:w-80'>
          <DomainSelector
            domains={domainsForSelector}
            selected={selectedDomain}
            onChange={onDomainChange}
          />
        </div>
      </div>

      <DomainEmptyState
        domainName={selectedDomain.domain}
        domainId={selectedDomain.id}
      />
    </div>
  );
}
