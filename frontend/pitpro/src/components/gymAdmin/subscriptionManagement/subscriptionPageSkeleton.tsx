export function SubscriptionPageSkeleton() {
  return (
    <section className="space-y-14 animate-pulse">
      {/* CURRENT PLAN SKELETON */}
      <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-8">
        <div className="flex justify-between">
          <div>
            <div className="h-6 w-40 rounded bg-neutral-700 mb-2" />
            <div className="h-4 w-24 rounded bg-neutral-800" />
          </div>
          <div className="h-7 w-28 rounded bg-neutral-800" />
        </div>

        <div className="mt-6 h-14 w-56 rounded bg-neutral-700" />

        {/* LIMITS */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 rounded-xl bg-neutral-900 border border-neutral-800"
            />
          ))}
        </div>

        {/* FEATURES */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-4 w-3/4 rounded bg-neutral-800" />
          ))}
        </div>
      </div>

      {/* OTHER PLANS SKELETON */}
      <div className="flex justify-center">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[520px] rounded-2xl border border-neutral-800 bg-neutral-900"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
