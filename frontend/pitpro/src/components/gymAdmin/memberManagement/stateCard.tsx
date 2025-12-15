import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string
  color: "orange" | "green" | "red" | "blue"
}

const colorClasses = {
  orange: "text-orange-500",
  green: "text-green-500",
  red: "text-red-500",
  blue: "text-blue-500",
}

export function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 lg:p-6">
      <div className={cn("mb-2 text-3xl font-bold lg:text-4xl", colorClasses[color])}>{value}</div>
      <div className="text-xs text-zinc-400 lg:text-sm">{label}</div>
    </div>
  )
}
