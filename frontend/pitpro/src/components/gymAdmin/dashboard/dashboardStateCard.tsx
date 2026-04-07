interface StatsCardProps {
  title: string;
  total: number;
  active?: number;
  icon: React.ReactNode;
}

export function StatsCard({ title, total, active, icon }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-black/40 p-5 hover:border-orange-500/30 transition">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm text-zinc-400 font-medium">{title}</h4>
        <div className="text-orange-500">{icon}</div>
      </div>

      <div className="space-y-1">
        <p className="text-2xl font-bold text-white">
          {total}
        </p>

        {active !== undefined && (
          <p className="text-xs text-green-400">
            {active} Active
          </p>
        )}
      </div>
    </div>
  );
}
