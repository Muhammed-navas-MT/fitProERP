import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
                {section.exercises.map((exercise, index) => (
                  <div
                    key={`${exercise.name}-${index}`}
                    className="rounded-lg border border-gray-800 bg-[#0a0a0a] p-4 transition-shadow hover:bg-gray-900"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        {exercise.name}
                      </span>
                      <span className="text-sm font-semibold text-gray-400">
                        {exercise.sets} x {exercise.reps}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}