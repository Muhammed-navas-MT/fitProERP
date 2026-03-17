import { motion } from "framer-motion";

export function MembershipSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 animate-pulse">
      
      {/* Current Plan Skeleton */}
      <div className="space-y-4">
        <div className="h-5 w-40 bg-zinc-800 rounded" />

        <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-900 space-y-6">
          <div className="h-6 w-48 bg-zinc-800 rounded" />
          <div className="h-4 w-24 bg-zinc-800 rounded" />

          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 bg-zinc-800 rounded" />
            ))}
          </div>

          <div className="h-10 w-32 bg-zinc-800 rounded-lg" />
        </div>
      </div>

      {/* Packages Skeleton */}
      <div className="space-y-4">
        <div className="h-5 w-32 bg-zinc-800 rounded" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-zinc-800 bg-zinc-900 rounded-xl p-6 space-y-4"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="h-6 w-32 bg-zinc-800 rounded" />
              <div className="h-4 w-20 bg-zinc-800 rounded" />

              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-4 bg-zinc-800 rounded" />
                ))}
              </div>

              <div className="h-10 bg-zinc-800 rounded-lg" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}