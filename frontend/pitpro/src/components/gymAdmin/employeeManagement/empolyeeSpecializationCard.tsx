import { Award } from "lucide-react"

type SpecializationCardProps = {
  specializations: string[]
}

export function SpecializationCard({
  specializations,
}: SpecializationCardProps) {
  return (
    <div className="rounded-xl border border-orange-500/20 bg-black p-5">
      <div className="mb-3 flex items-center gap-2">
        <Award className="h-5 w-5 text-orange-500" />
        <p className="text-sm text-zinc-400">Specializations</p>
      </div>

      {specializations.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {specializations.map((spec) => (
            <span
              key={spec}
              className="rounded-full border border-orange-500/40 bg-orange-500/20 px-3 py-1 text-xs text-orange-300"
            >
              {spec}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-zinc-500">
          No specializations added
        </p>
      )}
    </div>
  )
}
