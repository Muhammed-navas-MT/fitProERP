import type React from "react"
import { Users, Clock, Activity, Star } from "lucide-react"

interface Stat {
  icon: React.ReactNode
  value: string
  label: string
}

const stats: Stat[] = [
  {
    icon: <Users className="h-10 w-10 text-orange-500" />,
    value: "50K+",
    label: "Active Members",
  },
  {
    icon: <Clock className="h-10 w-10 text-orange-500" />,
    value: "2M+",
    label: "Check-ins Monthly",
  },
  {
    icon: <Activity className="h-10 w-10 text-orange-500" />,
    value: "99.9%",
    label: "Uptime",
  },
  {
    icon: <Star className="h-10 w-10 text-orange-500" />,
    value: "4.9★",
    label: "Customer Rating",
  },
]

export default function Stats() {
  return (
    <section className="bg-black px-6 py-16 sm:px-12 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-900">
                {stat.icon}
              </div>
              <p className="mb-2 text-2xl font-bold text-orange-500 sm:text-3xl">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
