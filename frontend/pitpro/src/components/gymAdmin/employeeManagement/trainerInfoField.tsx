import React from "react"

type InfoFieldProps = {
  label: string
  value: string
  icon?: React.ElementType
  full?: boolean
}

const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value,
  icon,
  full,
}) => {
  const Icon = icon

  return (
    <div
      className={`rounded-lg border border-zinc-700 bg-zinc-900/40 p-4 ${
        full ? "md:col-span-2" : ""
      }`}
    >
      <div className="mb-2 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-orange-500" />}
        <p className="text-xs uppercase tracking-wide text-zinc-400">
          {label}
        </p>
      </div>
      <p className="font-semibold text-white break-all">{value}</p>
    </div>
  )
}

export default InfoField
