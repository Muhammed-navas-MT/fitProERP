import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Consistent empty-state block for admin tables / lists / panels.
 * Purely presentational: callers pass their own copy and optional action.
 */
interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  /** Compact variant for use inside a table cell. */
  compact?: boolean;
}

export function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing here yet",
  description,
  action,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        compact ? "py-10" : "py-16",
        className,
      )}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10">
        <Icon className="h-7 w-7 text-orange-400" />
      </div>

      <h3 className="text-sm font-semibold text-white sm:text-base">{title}</h3>

      {description && (
        <p className="mt-1 max-w-sm text-sm text-zinc-400">{description}</p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;
