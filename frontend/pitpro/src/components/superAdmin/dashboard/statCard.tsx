import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  change: string
  icon: LucideIcon
  iconColor?: string
}

export default function StatCard({ title, value, change, icon: Icon, iconColor = "text-blue-500" }: StatCardProps) {
  return (
    <div className="bg-[#1a1f24] border border-gray-800 rounded-lg p-4 sm:p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{value}</h3>
          <p className="text-green-500 text-xs sm:text-sm">{change}</p>
        </div>
        <div className={`${iconColor} bg-blue-500/10 p-3 rounded-lg`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}
