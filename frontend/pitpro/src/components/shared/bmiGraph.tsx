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
  lineColor = "#f97316",
  gridColor = "#374151",
  title = "BMI Trend (10 Weeks)",
}: BMIGraphProps) {
  return (
    <Card className="bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
      {/* Heading with orange accent line */}
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="w-1 h-6 bg-orange-500 rounded" />
          <CardTitle className="text-orange-600">{title}</CardTitle>
        </div>
        <CardDescription className="text-gray-400 mt-1">Your health progress over time</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#0a0a0a", border: `1px solid ${lineColor}`, color: "#fff" }}
                labelStyle={{ color: "#fff" }}
              />
              {Object.keys(data[0] || {})
                .filter((key) => key !== "week")
                .map((key, idx) => {
                  const colors = [
                    "#ef4444",
                    "#10b981", 
                    "#f59e0b",
                    "#dc2626",
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

        <div className="mt-6 flex gap-4 flex-wrap text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-gray-400">Normal Weight</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-gray-400">Overweight</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-gray-400">Unhealthy</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
