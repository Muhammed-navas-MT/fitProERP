import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  iconColor?: string;
}

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = "text-blue-500",
}: StatCardProps) {
  const isPositive = !change.trim().startsWith("-");

  return (
    <div className="bg-[#1a1f24] border border-gray-800 rounded-lg p-4 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 break-words">
            {value}
          </h3>
          <p
            className={`text-xs sm:text-sm font-medium ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {change}
          </p>
        </div>

        <div className={`${iconColor} bg-white/5 p-3 rounded-lg shrink-0`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}