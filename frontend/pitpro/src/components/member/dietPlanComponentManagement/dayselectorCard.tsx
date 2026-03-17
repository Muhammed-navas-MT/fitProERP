import { cn } from "@/lib/utils";

interface Food {
  name: string;
  quantity?: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fats?: number;
}

interface Meal {
  mealType: string;
  time?: string;
  foods: Food[];
}

interface DietDay {
  day: string;
  dailyCalories?: number;
  dailyProtein?: number;
  dailyCarbs?: number;
  dailyFats?: number;
  meals: Meal[];
}

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
        "flex flex-col gap-1 p-4 rounded-xl border text-left transition-all relative",
        isActive
          ? "bg-zinc-900 border-zinc-700"
          : "bg-transparent border-zinc-900 hover:border-zinc-800",
      )}
    >
      {/* Today badge */}
      {isToday && (
        <span className="absolute top-2 right-2 text-[10px] px-2 py-[2px] rounded bg-green-600 text-white">
          Today
        </span>
      )}

      <span className="text-xs text-zinc-500">{day.day.slice(0, 3)}</span>

      <span className="text-sm font-semibold text-zinc-200">
        {day.meals.length} meals
      </span>

      {/* Calories + Protein in one row */}
      <div className="flex justify-between text-xs text-zinc-600">
        <span>{day.dailyCalories ?? 0} kcal</span>
        <span>{day.dailyProtein ?? 0}g protein</span>
      </div>
    </button>
  );
}
