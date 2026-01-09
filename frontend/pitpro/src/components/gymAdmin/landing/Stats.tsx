import type React from "react";
import { Users, Clock, Activity, Star } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: <Users className="h-9 w-9 text-orange-500" />,
    value: "50K+",
    label: "Active Members",
  },
  {
    icon: <Clock className="h-9 w-9 text-orange-500" />,
    value: "2M+",
    label: "Check-ins Monthly",
  },
  {
    icon: <Activity className="h-9 w-9 text-orange-500" />,
    value: "99.9%",
    label: "Uptime",
  },
  {
    icon: <Star className="h-9 w-9 text-orange-500" />,
    value: "4.9★",
    label: "Customer Rating",
  },
];

export default function Stats() {
  return (
    <section className="bg-gradient-to-b from-neutral-950 via-black to-black px-6 py-16 sm:px-12 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900/70 border border-neutral-800 group-hover:border-orange-500/40 group-hover:shadow-[0_0_25px_-8px_rgba(249,115,22,0.5)] transition-all duration-300">
                {stat.icon}
              </div>

              {/* Value */}
              <p className="mb-2 text-2xl font-extrabold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent sm:text-3xl">
                {stat.value}
              </p>

              {/* Label */}
              <p className="text-xs uppercase tracking-wide text-neutral-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
