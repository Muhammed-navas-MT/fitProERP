import React from "react";
import { cn } from "@/lib/utils";
import { EmptyState } from "./EmptyState";

/**
 * Admin-only presentational table.
 *
 * Structurally compatible with the shared `TableColumn` type, but kept
 * separate so restyling the admin tables never affects the member / trainer
 * screens that also use `components/shared/reusableTable`.
 */
export type AdminTableColumn<T> = {
  header: React.ReactNode;
  render: (row: T) => React.ReactNode;
  className?: string;
  /** Header cell class (defaults to the body cell class). */
  headerClassName?: string;
};

interface AdminTableProps<T> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  headerAction?: React.ReactNode;
  data: T[];
  columns: AdminTableColumn<T>[];
  /** Stable row key extractor; falls back to array index. */
  rowKey?: (row: T, index: number) => React.Key;
  emptyText?: string;
  emptyState?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AdminTable<T>({
  title,
  description,
  headerAction,
  data,
  columns,
  rowKey,
  emptyText = "No records found",
  emptyState,
  footer,
  className,
}: AdminTableProps<T>) {
  const hasHeader = Boolean(title || description || headerAction);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 shadow-sm",
        className,
      )}
    >
      {hasHeader && (
        <div className="flex flex-col gap-3 border-b border-zinc-800 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0">
            {title && (
              <h2 className="truncate text-base font-semibold text-white">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-0.5 text-sm text-zinc-400">{description}</p>
            )}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60 text-left">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={cn(
                    "whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-wide text-zinc-500 first:pl-6 last:pr-6",
                    col.headerClassName ?? col.className,
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800/70">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-4">
                  {emptyState ?? <EmptyState compact title={emptyText} />}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowKey ? rowKey(row, rowIndex) : rowIndex}
                  className="transition-colors hover:bg-zinc-800/40"
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn(
                        "whitespace-nowrap px-4 py-3.5 align-middle text-zinc-300 first:pl-6 last:pr-6",
                        col.className,
                      )}
                    >
                      {col.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {footer && (
        <div className="border-t border-zinc-800 px-4 py-3 sm:px-6">{footer}</div>
      )}
    </div>
  );
}

export default AdminTable;
