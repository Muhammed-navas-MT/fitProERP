interface StatsCardProps {
  title: string;
  total: number;
  active?: number;
  icon: React.ReactNode;
}

export function StatsCard({ title, total, active, icon }: StatsCardProps) {
  return (
    <div className="group rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 shadow-sm transition-colors hover:border-orange-500/30">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-400">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {total.toLocaleString()}
          </p>
        </div>

        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 [&_svg]:h-5 [&_svg]:w-5">
          {icon}
        </span>
      </div>

      {active !== undefined && (
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-600/15 px-2 py-1 text-xs font-medium text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          {active.toLocaleString()} Active
        </p>
      )}
    </div>
  );
}
