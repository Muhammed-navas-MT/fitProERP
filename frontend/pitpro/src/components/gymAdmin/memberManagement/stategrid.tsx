import { StatCard } from "@/components/gymAdmin/memberManagement/stateCard"

const stats = [
  { label: "Total Members", value: 42, color: "orange" },
  { label: "Active Members", value: 38, color: "green" },
  { label: "Expired", value: 4, color: "red" },
  { label: "New This Month", value: 11, color: "blue" },
]
export type StatColor = "orange" | "green" | "red" | "blue";
export interface StatItem {
  label: string;
  value: number;
  color: StatColor;
}
export interface StatsGridProps {
  stats: StatItem[];
}

export function StatsGrid() {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={`${stat.value}`}
          color={stat.color as StatColor}
        />
      ))}
    </div>
  )
}
