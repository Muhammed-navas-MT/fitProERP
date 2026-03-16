import { cn } from "@/lib/utils";

interface WorkoutDay {
  dayOfWeek: string;
  targetMuscles: string[];
  exercises: { name: string; equipment: string; sets: number; reps: string; rest: string }[];
}

interface DaySelectorCardProps {
  day: WorkoutDay;
  isActive: boolean;
  isToday: boolean;
  onClick: () => void;
}

export function DaySelectorCard({ day, isActive, isToday, onClick }: DaySelectorCardProps) {
  const isRest = day.targetMuscles.length === 0 || day.targetMuscles.includes("Rest");

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200",
        isActive
          ? "bg-zinc-900 border-zinc-700 shadow-lg ring-1 ring-zinc-700"
          : "bg-transparent border-zinc-900 hover:border-zinc-800",
        isToday && !isActive && "border-orange-500/30"
      )}
    >
      {isToday && (
        <span className="absolute top-2 right-2 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
        </span>
      )}
      <span
        className={cn(
          "text-xs font-medium uppercase tracking-wider mb-1",
          isActive ? "text-orange-400" : "text-zinc-500"
        )}
      >
        {day.dayOfWeek.slice(0, 3)}
      </span>
      <span className="text-sm font-semibold truncate w-full text-zinc-200">
        {isRest ? "Rest" : day.targetMuscles.join(" • ")}
      </span>
      <span className="text-xs text-zinc-600 mt-1">
        {isRest ? "Recovery" : `${day.exercises.length} exercises`}
      </span>
    </button>
  );
}
