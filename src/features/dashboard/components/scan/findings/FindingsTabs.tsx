import Link from 'next/link';

export type FindingTabId = 'all' | 'exposure' | 'ssl' | 'dns';

export type FindingTab = {
  id: FindingTabId;
  label: string;
  href: string;
};

type FindingsTabsProps = {
  tabs: FindingTab[];
  activeTab: FindingTabId;
};

export function FindingsTabs({ tabs, activeTab }: FindingsTabsProps) {
  return (
    <div
      role='tablist'
      aria-label='Scan finding categories'
      className={[
        '-mx-4 grid grid-cols-4 border-b border-[#E5E7EB] px-4',
        'md:mx-0 md:flex md:px-0',
      ].join(' ')}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <Link
            key={tab.id}
            id={`${tab.id}-finding-tab`}
            href={tab.href}
            role='tab'
            aria-selected={isActive}
            className={[
              'min-w-0 px-1 pb-3 text-center text-xs font-medium',
              'transition-colors md:min-w-28 md:px-4 md:text-sm',
              isActive
                ? 'border-b-4 border-[#073B32] text-[#073B32]'
                : 'border-b-4 border-transparent text-[#6B7280]',
              'hover:text-[#111827]',
            ].join(' ')}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
