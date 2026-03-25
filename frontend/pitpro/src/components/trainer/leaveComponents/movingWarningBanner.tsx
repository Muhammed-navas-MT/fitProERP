import { AlertTriangle } from "lucide-react";

interface MovingWarningBannerProps {
  message: string;
  show?: boolean;
}

export function MovingWarningBanner({
  message,
  show = true,
}: MovingWarningBannerProps) {
  if (!show || !message) return null;

  return (
    <div className="relative overflow-hidden rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
      <div className="flex items-center gap-2 border-b border-red-500/20 pb-2 mb-2">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <p className="text-sm font-semibold text-red-400">
          Leave Limit Warning
        </p>
      </div>

      <div className="relative overflow-hidden whitespace-nowrap">
        <div className="inline-block min-w-full animate-[marquee_25s_linear_infinite] text-sm text-red-300">
          {message}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}