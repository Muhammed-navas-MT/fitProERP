import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  /** Fallback route used when there is no browser history to go back to. */
  fallback?: string;
  label?: string;
  className?: string;
}

/**
 * Reusable "Back" navigation control for detail/create/edit/sub pages.
 * Prefers browser history (navigate(-1)); falls back to a parent route
 * when the page can be entered directly (e.g. deep link, new tab).
 */
export function BackButton({ fallback, label = "Back", className }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.history.length > 2) {
      navigate(-1);
      return;
    }

    if (fallback) {
      navigate(fallback);
      return;
    }

    navigate(-1);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800/70 hover:text-white",
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </button>
  );
}
