import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AttendanceCalendarProps {
  month: string
  year: number
  data: Record<string, string[]> // { "Su": ["present", "absent", "present"], ... }
  primaryColor?: string
  secondaryColor?: string
}

export function AttendanceCalendar({
  month,
  year,
  data,
  primaryColor = "bg-emerald-500",
  secondaryColor = "bg-red-500",
}: AttendanceCalendarProps) {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const getStatusColor = (status: string) => {
    if (status === "present") return primaryColor
    if (status === "absent") return secondaryColor
    return "bg-slate-300 dark:bg-slate-600"
  }

  return (
    <Card className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-white">{month} Attendance</CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">
          {year} • Track your weekly attendance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {days.map((day) => (
            <div key={day} className="text-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm py-2">
              {day}
            </div>
          ))}

          {/* Attendance dots */}
          {days.map((day) => (
            <div key={`${day}-dots`} className="flex flex-col gap-1">
              {data[day]?.map((status, idx) => (
                <div
                  key={`${day}-${idx}`}
                  className={`w-5 h-5 rounded-full ${getStatusColor(status)} transition-transform hover:scale-110`}
                />
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
