import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Compact, windowed pagination control for admin tables.
 *
 * Drop-in replacement for the previous "render every page number" markup.
 * It only calls `onPageChange` with a page number — no data fetching here,
 * the caller keeps owning that exactly as before.
 */
interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  /** Optional summary text shown on the left (e.g. "Showing 1–10 of 42"). */
  summary?: React.ReactNode;
}

function buildRange(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "…")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) pages.push("…");
  for (let i = start; i <= end; i += 1) pages.push(i);
  if (end < totalPages - 1) pages.push("…");

  pages.push(totalPages);
  return pages;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
  summary,
}: PaginationProps) {
  const safeTotal = Math.max(1, totalPages || 1);
  if (safeTotal <= 1 && !summary) return null;

  const range = buildRange(page, safeTotal);
  const btnBase =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-between gap-3 sm:flex-row",
        className,
      )}
    >
      {summary ? (
        <p className="text-xs text-zinc-500">{summary}</p>
      ) : (
        <span className="hidden sm:block" />
      )}

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className={cn(btnBase, "text-zinc-300 hover:bg-zinc-800 hover:text-white")}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {range.map((item, index) =>
          item === "…" ? (
            <span
              key={`gap-${index}`}
              className="inline-flex h-9 min-w-9 items-center justify-center text-sm text-zinc-600"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-current={item === page ? "page" : undefined}
              className={cn(
                btnBase,
                item === page
                  ? "bg-orange-500 text-white"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white",
              )}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= safeTotal}
          aria-label="Next page"
          className={cn(btnBase, "text-zinc-300 hover:bg-zinc-800 hover:text-white")}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
