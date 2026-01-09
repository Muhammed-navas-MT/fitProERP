"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface BMIGraphProps {
  data: Array<{
    week: string
    underweight?: number
    normalweight?: number
    overweight?: number
    obese?: number
  }>
  lineColor?: string
  gridColor?: string
  title?: string
}

export function BMIGraph({
  data,
  lineColor = "#6366f1",
  gridColor = "#e2e8f0",
  title = "BMI Trend (10 Weeks)",
}: BMIGraphProps) {
  return (
    <Card className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-slate-900 dark:text-white">{title}</CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">Your health progress over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="week" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", border: `1px solid ${lineColor}` }}
                labelStyle={{ color: "#000" }}
              />
              {Object.keys(data[0] || {})
                .filter((key) => key !== "week")
                .map((key, idx) => {
                  const colors = [
                    "#ef4444", // underweight - red
                    lineColor, // normalweight - indigo
                    "#f59e0b", // overweight - amber
                    "#dc2626", // obese - red
                  ]
                  return (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={colors[idx] || lineColor}
                      dot={{ fill: colors[idx] || lineColor, r: 4 }}
                      strokeWidth={2}
                      name={key.charAt(0).toUpperCase() + key.slice(1)}
                    />
                  )
                })}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="mt-6 flex gap-4 flex-wrap text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400">Normal Weight</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-slate-600 dark:text-slate-400">Overweight</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-slate-600 dark:text-slate-400">Unhealthy</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
