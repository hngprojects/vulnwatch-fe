import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}

export function ReportPagination({ page, totalPages, onPageChange }: ReportPaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("...");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1 pt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#E5E7EB] text-[#2B2B2B] disabled:opacity-40 hover:bg-gray-50 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-[#9CA3AF]">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors",
              page === p
                ? "bg-[#072E28] text-white"
                : "border border-[#E5E7EB] text-[#2B2B2B] hover:bg-gray-50"
            )}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#E5E7EB] text-[#2B2B2B] disabled:opacity-40 hover:bg-gray-50 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.8} />
      </button>
    </div>
  );
}
