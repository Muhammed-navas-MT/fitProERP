import { motion } from "framer-motion";

export function WorkoutPageSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">

      {/* Header */}
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-zinc-800 rounded" />
          <div className="h-4 w-32 bg-zinc-900 rounded" />
        </div>

        <div className="h-10 w-40 bg-zinc-800 rounded-lg" />
      </div>

      {/* Day selector skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="h-20 rounded-xl bg-zinc-900 border border-zinc-800"
          />
        ))}
      </div>

      {/* Workout detail skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-16 bg-zinc-900 border border-zinc-800 rounded-lg"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}