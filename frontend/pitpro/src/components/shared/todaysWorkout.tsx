import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dumbbell } from "lucide-react";

interface Exercise {
  name: string;
  sets: number | string;
  reps: number | string;
}

interface WorkoutSection {
  category: string;
  exercises: Exercise[];
}

interface TodaysWorkoutProps {
  sections: WorkoutSection[];
}

export function TodaysWorkout({ sections }: TodaysWorkoutProps) {
  const hasWorkout =
    sections.length > 0 && sections.some((section) => section.exercises.length > 0);

  if (!hasWorkout) {
    return (
      <Card className="rounded-2xl border border-gray-800 bg-[#0a0a0a] shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="h-6 w-1 rounded bg-orange-500" />
            <CardTitle className="text-orange-600">Today's Workout</CardTitle>
          </div>
          <CardDescription className="mt-1 text-gray-400">
            Your workout plan for today
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-800 bg-zinc-950/60 px-6 text-center">
            <div className="mb-4 rounded-2xl bg-orange-500/10 p-4">
              <Dumbbell className="h-8 w-8 text-orange-500" />
            </div>

            <h3 className="text-lg font-semibold text-white">
              No exercises assigned for today
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
              You do not have any exercises in your plan right now. Please check
              back later or contact your trainer for today’s workout schedule.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border border-gray-800 bg-[#0a0a0a] shadow-xl transition-shadow hover:shadow-2xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="h-6 w-1 rounded bg-orange-500" />
          <CardTitle className="text-orange-600">Today's Workout</CardTitle>
        </div>

        <CardDescription className="mt-1 text-gray-400">
          {sections.map((section) => section.category).join(" & ")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.category}>

              <div className="space-y-3">
                {section.exercises.length > 0 ? (
                  section.exercises.map((exercise, index) => (
                    <div
                      key={`${exercise.name}-${index}`}
                      className="rounded-lg border border-gray-800 bg-[#0a0a0a] p-4 transition-all hover:bg-gray-900"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-white">
                          {exercise.name}
                        </span>

                        <span className="whitespace-nowrap text-sm font-semibold text-gray-400">
                          {exercise.sets} x {exercise.reps}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-gray-800 bg-zinc-950/50 p-6 text-center">
                    <p className="text-sm text-gray-400">
                      No exercises in this section
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}