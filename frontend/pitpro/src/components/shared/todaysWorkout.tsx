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
}

export function TodaysWorkout({ sections }: TodaysWorkoutProps) {
  return (
    <Card className="bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
      {/* Heading with orange accent line */}
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="w-1 h-6 bg-orange-500 rounded" />
          <CardTitle className="text-orange-600">Today's Workout</CardTitle>
        </div>
        <CardDescription className="text-gray-400 mt-1">Chest & Triceps</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div key={section.category}>
              <h3 className="text-white font-bold text-lg mb-4">{section.category}</h3>
              <div className="space-y-3">
                {section.exercises.map((exercise) => (
                  <div
                    key={exercise.name}
                    className="border border-gray-800 rounded-lg p-4 bg-[#0a0a0a] hover:bg-gray-900 transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm font-medium">{exercise.name}</span>
                      <span className="text-gray-400 text-sm font-semibold">
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
