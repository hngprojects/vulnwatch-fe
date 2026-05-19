import { type KeyboardEvent } from 'react';

export type FindingTab = {
  id: string;
  label: string;
};

type FindingsTabsProps = {
  tabs: FindingTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

export function FindingsTabs({
  tabs,
  activeTab,
  onTabChange,
}: FindingsTabsProps) {
  const focusTab = (index: number) => {
    const nextTab = tabs[index];
    const nextButton = document.getElementById(`${nextTab.id}-finding-tab`);

    onTabChange(nextTab.id);
    nextButton?.focus();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ) => {
    const lastIndex = tabs.length - 1;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        focusTab(currentIndex === lastIndex ? 0 : currentIndex + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        focusTab(currentIndex === 0 ? lastIndex : currentIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(lastIndex);
        break;
      default:
        break;
    }
  };

  return (
    <div
      role='tablist'
      aria-label='Scan finding categories'
      className='-mx-4 grid grid-cols-4 border-b border-[#E5E7EB] px-4 md:mx-0 md:flex md:px-0'
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            id={`${tab.id}-finding-tab`}
            type='button'
            role='tab'
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={[
              'min-w-0 cursor-pointer px-1 pb-3 text-center text-xs font-medium transition-colors md:min-w-28 md:px-4 md:text-sm',
              isActive
                ? 'border-b-4 border-[#073B32] text-[#073B32]'
                : 'border-b-4 border-transparent text-[#6B7280] hover:text-[#111827]',
            ].join(' ')}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
