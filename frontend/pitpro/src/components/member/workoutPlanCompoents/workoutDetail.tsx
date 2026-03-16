import { Dumbbell, Clock } from "lucide-react";
import { ExerciseRow } from "./exerciseRow";

interface Exercise {
  name: string;
  equipment: string;
  sets: number;
  reps: string;
  rest: string;
}

interface WorkoutDay {
  dayOfWeek: string;
  targetMuscles: string[];
  exercises: Exercise[];
}

interface WorkoutDetailProps {
  day: WorkoutDay;
}

export function WorkoutDetail({ day }: WorkoutDetailProps) {
  const isRestDay = day.targetMuscles.length === 0 || day.targetMuscles.includes("Rest");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <Dumbbell className="w-5 h-5 text-zinc-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-zinc-50">{day.dayOfWeek} Routine</h2>
          <div className="flex gap-2 mt-1">
            {day.targetMuscles.map((m) => (
              <span
                key={m}
                className="text-xs px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-full"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {isRestDay ? (
        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-zinc-900/50 flex items-center justify-center mb-4">
            <Clock className="w-8 h-8 text-zinc-700" />
          </div>
          <h3 className="text-lg font-medium text-zinc-300">Rest & Recovery</h3>
          <p className="text-zinc-500 max-w-xs mt-2">
            Focus on mobility, hydration, and sleep to prepare for your next session.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {day.exercises.map((ex, i) => (
            <ExerciseRow key={ex.name} exercise={ex} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
