import { cn } from "@/lib/utils";
import { DietDay } from "@/types/dietType";

interface Props {
  day: DietDay;
  isActive: boolean;
  isToday: boolean;
  onClick: () => void;
}

export function DietDaySelectorCard({
  day,
  isActive,
  isToday,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col p-4 rounded-xl border text-left transition-all",
        isActive
          ? "bg-zinc-900 border-zinc-700"
          : "bg-transparent border-zinc-900 hover:border-zinc-800",
        isToday && !isActive && "border-orange-500/30"
      )}
    >
      <span className="text-xs text-zinc-500">
        {day.day.slice(0, 3)}
      </span>

      <span className="text-sm font-semibold text-zinc-200">
        {day.meals.length} meals
      </span>

      <span className="text-xs text-zinc-600">
        {day.dailyCalories ?? 0} kcal
      </span>
    </button>
  );
}