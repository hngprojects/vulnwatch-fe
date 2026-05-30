import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ElementType } from "react";

interface StatCard {
  label: string;
  value: string | number;
  suffix: string;
  icon: ElementType;
  iconClassName: string;
  iconWrapClassName: string;
}

interface ReportStatCardsProps {
  summaryCards: StatCard[];
  loading: boolean;
}

export function ReportStatCards({ summaryCards, loading }: ReportStatCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryCards.map(({ label, value, suffix, icon: Icon, iconClassName, iconWrapClassName }) => (
        <article
          key={label}
          className="flex min-h-14 items-center justify-between rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 shadow-[0_1px_4px_rgba(17,24,39,0.03)]"
        >
          <div>
            <p className="text-sm text-[#6B7280]">{label}</p>
            <p className="mt-1 text-2xl font-bold text-[#2B2B2B]">
              {loading ? <Loader2 className="h-5 w-5 animate-spin text-[#9CA3AF]" /> : (
                <>{value}{suffix && <span className="text-base font-normal text-[#9CA3AF]">{suffix}</span>}</>
              )}
            </p>
          </div>
          <span className={cn("flex h-8 w-8 items-center justify-center rounded-full", iconWrapClassName)} aria-hidden="true">
            <Icon className={cn("h-4 w-4", iconClassName)} strokeWidth={1.8} />
          </span>
        </article>
      ))}
    </div>
  );
}
