"use client";

import { Activity } from "lucide-react";

interface ActivityType {
  id: number;
  action: string;
  name: string;
  time: string;
}

interface RecentActivityProps {
  activities: ActivityType[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
          <Activity className="h-4 w-4" />
        </span>
        <h3 className="text-base font-semibold text-white">Recent Activity</h3>
      </div>

      {activities.length > 0 ? (
        <ol className="relative space-y-5 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-zinc-800">
          {activities.map((activity) => (
            <li key={activity.id} className="relative flex gap-4 pl-6">
              <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-zinc-900 bg-orange-500" />
              <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {activity.action}
                  </p>
                  <p className="truncate text-sm text-zinc-400">{activity.name}</p>
                </div>
                <p className="shrink-0 text-xs text-zinc-500">{activity.time}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="py-6 text-center text-sm text-zinc-400">
          No recent activities found.
        </p>
      )}
    </div>
  );
}
