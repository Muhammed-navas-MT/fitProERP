import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  iconColor?: string
  className?: string
}

export function StatCard({ title, value, icon: Icon, iconColor = "text-purple-400", className }: StatCardProps) {
  return (
    <div
      className={cn(
        "w-full min-w-0 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 sm:p-4 lg:p-6 hover:border-purple-500/50 transition-colors",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2 truncate">{title}</p>
          <p className="text-white text-lg sm:text-2xl lg:text-3xl font-bold truncate">{value}</p>
        </div>
        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 shrink-0 ${iconColor}`} />
      </div>
    </div>
  )
}
