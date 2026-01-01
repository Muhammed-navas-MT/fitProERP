interface Activity {
  id: number
  action: string
  name: string
  time: string
}

const activities: Activity[] = [
  { id: 1, action: "New member registered", name: "John Doe", time: "2 hours ago" },
  { id: 2, action: "New member registered", name: "Sarah Smith", time: "2 hours ago" },
  { id: 3, action: "New trainer added", name: "Mike Johnson", time: "2 hours ago" },
  { id: 4, action: "Membership renewed", name: "Emma Wilson", time: "2 hours ago" },
]

export function RecentActivity() {
  return (
    <div className="rounded-lg border border-orange-500/20 bg-black/40 p-6">
      <h3 className="mb-6 text-xl font-bold text-white">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
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
        ))}
      </div>
    </div>
  )
}
