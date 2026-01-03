import React from "react"

type StatCardProps = {
  icon: React.ElementType
  label: string
  value: string | number
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => {
  const Icon = icon

  return (
    <div className="rounded-xl border border-orange-500/20 bg-black p-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-5 w-5 text-orange-500" />
        <p className="text-sm text-zinc-400">{label}</p>
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  )
}

export default StatCard
