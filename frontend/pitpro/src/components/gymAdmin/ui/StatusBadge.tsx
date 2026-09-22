import { cn } from "@/lib/utils";

/**
 * Presentational status pill for admin tables / detail views.
 *
 * It only maps an existing status string to a colour from the existing theme
 * (green = positive, red = negative, amber = pending, zinc = neutral).
 * The label shown is exactly the value passed in — no data is transformed.
 */

type Tone = "success" | "danger" | "warning" | "neutral";

const toneClasses: Record<Tone, string> = {
  success: "bg-green-600/20 text-green-400 ring-1 ring-inset ring-green-500/20",
  danger: "bg-red-600/20 text-red-400 ring-1 ring-inset ring-red-500/20",
  warning: "bg-amber-500/15 text-amber-400 ring-1 ring-inset ring-amber-500/20",
  neutral: "bg-zinc-700/30 text-zinc-300 ring-1 ring-inset ring-zinc-600/30",
};

const dotClasses: Record<Tone, string> = {
  success: "bg-green-400",
  danger: "bg-red-400",
  warning: "bg-amber-400",
  neutral: "bg-zinc-400",
};

function resolveTone(status: string): Tone {
  const value = status.toLowerCase().replace(/[\s_-]+/g, "");

  if (
    ["active", "success", "successful", "paid", "approved", "completed", "verified", "open", "true"].includes(
      value,
    )
  ) {
    return "success";
  }

  if (
    ["inactive", "blocked", "failed", "rejected", "cancelled", "canceled", "expired", "overdue", "declined", "false"].includes(
      value,
    )
  ) {
    return "danger";
  }

  if (["pending", "processing", "inprogress", "onhold", "review", "waiting", "draft"].includes(value)) {
    return "warning";
  }

  return "neutral";
}

interface StatusBadgeProps {
  status: string;
  /** Override the auto-detected tone if a caller needs a specific colour. */
  tone?: Tone;
  /** Show a leading status dot. */
  withDot?: boolean;
  className?: string;
}

export function StatusBadge({ status, tone, withDot = true, className }: StatusBadgeProps) {
  const resolved = tone ?? resolveTone(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium capitalize",
        toneClasses[resolved],
        className,
      )}
    >
      {withDot && <span className={cn("h-1.5 w-1.5 rounded-full", dotClasses[resolved])} />}
      {status.toLowerCase().replace(/[_-]+/g, " ")}
    </span>
  );
}

export default StatusBadge;
