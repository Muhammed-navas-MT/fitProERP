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
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a] p-6">
          <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            {stat.value}
          </p>
        </Card>
      ))}
    </div>
  )
}
