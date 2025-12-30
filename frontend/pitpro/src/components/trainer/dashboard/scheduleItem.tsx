interface ScheduleItemProps {
  name: string
  type: string
  time: string
}

export function ScheduleItem({ name, type, time }: ScheduleItemProps) {
  return (
    <div className="flex items-center justify-between bg-black border border-[#2a2a2a] rounded-lg p-4 hover:border-purple-500/30 transition-colors">
      <div>
        <h4 className="text-white font-semibold text-sm mb-1">{name}</h4>
        <p className="text-gray-400 text-xs">{type}</p>
      </div>
      <p className="text-purple-400 text-sm font-semibold">{time}</p>
    </div>
  )
}
