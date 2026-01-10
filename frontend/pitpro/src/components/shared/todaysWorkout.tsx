import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Exercise {
  name: string
  sets: number
  reps: number
}

interface WorkoutSection {
  category: string
  exercises: Exercise[]
}

interface TodaysWorkoutProps {
  sections: WorkoutSection[]
  borderColor?: string
  textColor?: string
  bgColor?: string
}

export function TodaysWorkout({
  sections,
  borderColor = "border-indigo-200 dark:border-indigo-700",
  textColor = "text-indigo-600 dark:text-indigo-400",
  bgColor = "bg-white dark:bg-slate-800",
}: TodaysWorkoutProps) {
  return (
    <Card className={`border ${borderColor} shadow-sm hover:shadow-md transition-shadow ${bgColor}`}>
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-white">Today's Workout</CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">Chest & Triceps</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div key={section.category}>
              <h3 className={`${textColor} font-bold text-lg mb-4`}>{section.category}</h3>
              <div className="space-y-3">
                {section.exercises.map((exercise) => (
                  <div
                    key={exercise.name}
                    className={`${borderColor} border rounded-lg p-4 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">{exercise.name}</span>
                      <span className={`${textColor} text-sm font-semibold`}>
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
  )
}
