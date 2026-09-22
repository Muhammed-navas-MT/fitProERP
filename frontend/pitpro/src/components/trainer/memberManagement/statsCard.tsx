import { Card } from "@/components/ui/card"

interface StatItem {
  label: string;
  value: string;
  color: string;
}

interface StatsCardsProps {
  stats: StatItem[];
}



export function StatsCards({stats}:StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat) => (
        <Card key={stat.label} className="min-w-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] p-3 sm:p-6">
          <p className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2 truncate">{stat.label}</p>
          <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 truncate">
            {stat.value}
          </p>
        </Card>
      ))}
    </div>
  )
}
