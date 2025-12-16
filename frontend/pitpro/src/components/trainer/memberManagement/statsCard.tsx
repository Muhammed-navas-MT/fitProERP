import { Card } from "@/components/ui/card"

const stats = [
  { label: "Total Members", value: "675", color: "from-purple-500/20 to-blue-500/20" },
  { label: "Assigned Members", value: "22", color: "from-blue-500/20 to-purple-500/20" },
  { label: "Active Members", value: "17", color: "from-purple-500/20 to-pink-500/20" },
]

export function StatsCards() {
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
