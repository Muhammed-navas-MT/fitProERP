"use client";

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
    <div className="rounded-lg border border-orange-500/20 bg-black/40 p-6">
      <h3 className="mb-6 text-xl font-bold text-white">Recent Activity</h3>

      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between border-b border-zinc-700/50 pb-4 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-semibold text-white">{activity.action}</p>
                <p className="text-sm text-zinc-400">{activity.name}</p>
              </div>
              <p className="text-sm text-zinc-500">{activity.time}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-400">No recent activities found.</p>
        )}
      </div>
    </div>
  );
}
