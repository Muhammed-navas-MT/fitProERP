import type React from "react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="rounded-lg border-2 border-orange-500/30 bg-black/40 p-6 transition-all hover:border-orange-500/50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="text-orange-500">{icon}</div>
      </div>
    </div>
  )
}
