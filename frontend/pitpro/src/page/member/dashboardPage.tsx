import { Sidebar } from "@/components/member/memberSidebar"
import { Topbar } from "@/components/member/topbar"
import { AttendanceCalendar } from "@/components/shared/attendanceCalendar"
import { BMIGraph } from "@/components/shared/bmiGraph"
import { TodaysWorkout } from "@/components/shared/todaysWorkout"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingDown, Activity, Target } from "lucide-react"

export default function MemberDashboard() {
  // Sample data
  const attendanceData = {
    Su: ["present", "present", "absent", "present"],
    Mo: ["present", "present", "present", "present"],
    Tu: ["absent", "present", "present", "present"],
    We: ["present", "present", "absent", "absent"],
    Th: ["present", "present", "present", "present"],
    Fr: ["present", "absent", "present", "present"],
    Sa: ["present", "present", "present", "present"],
  }

  const bmiData = [
    { week: "Week 1", normalweight: 22 },
    { week: "Week 2", normalweight: 22.5 },
    { week: "Week 3", overweight: 25 },
    { week: "Week 4", overweight: 25.2 },
    { week: "Week 5", normalweight: 24 },
    { week: "Week 6", normalweight: 23.5 },
    { week: "Week 7", normalweight: 23 },
    { week: "Week 8", normalweight: 22.8 },
    { week: "Week 9", normalweight: 22.5 },
    { week: "Week 10", normalweight: 22.2 },
  ]

  const workoutSections = [
    {
      category: "Chest",
      exercises: [
        { name: "Incline Dumbbell Press", sets: 4, reps: 12 },
        { name: "Flat Dumbbell Press", sets: 3, reps: 12 },
        { name: "Incline Flys", sets: 3, reps: 12 },
        { name: "Pec Deck", sets: 3, reps: 12 },
      ],
    },
    {
      category: "Triceps",
      exercises: [
        { name: "Skull Crushers", sets: 4, reps: 12 },
        { name: "Rope Extensions", sets: 3, reps: 12 },
        { name: "Straight Bar Pushdowns", sets: 3, reps: 12 },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Sidebar />
      <div className="md:ml-56">
        <Topbar avatar="JD" title="Welcome Back, John!" subtitle="Ready to crush your fitness goals today." />

        <main className="p-4 lg:p-8 space-y-6">
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Days Trained</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">18</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">This month</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Current Weight</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">75.2 kg</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Last measured 4 days ago</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Next Session</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">Legs</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Tomorrow, 10:30 AM</p>
                  </div>
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* BMI Graph */}
          <BMIGraph data={bmiData} lineColor="#6366f1" gridColor="#e2e8f0" title="BMI Trend (10 Weeks)" />

          {/* Attendance Calendar */}
          <AttendanceCalendar
            month="October"
            year={2024}
            data={attendanceData}
            primaryColor="bg-emerald-500"
            secondaryColor="bg-red-500"
          />

          {/* Today's Workout */}
          <TodaysWorkout
            sections={workoutSections}
            borderColor="border-indigo-200 dark:border-indigo-700"
            textColor="text-indigo-600 dark:text-indigo-400"
            bgColor="bg-white dark:bg-slate-800"
          />
        </main>
      </div>
    </div>
  )
}
