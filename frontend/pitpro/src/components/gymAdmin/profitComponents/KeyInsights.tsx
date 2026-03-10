import { TrendingUp, Award, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Insight } from "@/types/gymAdmin/profitAnalyticsType";

interface KeyInsightsProps {
  insights: Insight[];
}

const insightConfig = {
  growth: {
    icon: TrendingUp,
    bg: "bg-emerald-950/60 border-emerald-800/50",
    titleColor: "text-emerald-400",
  },
  best_performer: {
    icon: Award,
    bg: "bg-orange-950/40 border-orange-800/50",
    titleColor: "text-orange-400",
  },
  warning: {
    icon: TrendingDown,
    bg: "bg-red-950/40 border-red-800/50",
    titleColor: "text-red-400",
  },
};

export function KeyInsights({ insights }: KeyInsightsProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
      <h2 className="text-lg font-semibold text-zinc-100 mb-4">Key Insights</h2>
      <div className="space-y-3">
        {insights.map((insight, idx) => {
          const config = insightConfig[insight.type];
          const Icon = config.icon;
          return (
            <div
              key={idx}
              className={cn(
                "rounded-md border p-3 flex items-start gap-3",
                config.bg
              )}
            >
              <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", config.titleColor)} />
              <div>
                <p className={cn("text-sm font-medium", config.titleColor)}>
                  {insight.title}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">{insight.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
