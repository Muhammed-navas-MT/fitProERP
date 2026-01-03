import { Clock } from "lucide-react"

type DutyCardProps = {
  duty: string
}

export function DutyCard({ duty }: DutyCardProps) {
  return (
    <div className="rounded-xl border border-orange-500/20 bg-black p-5">
      <div className="mb-3 flex items-center gap-2">
        <Clock className="h-5 w-5 text-orange-500" />
        <p className="text-sm text-zinc-400">Duty</p>
      </div>

      <span className="inline-block rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold text-black">
        {duty || "Not Assigned"}
      </span>
    </div>
  )
}
