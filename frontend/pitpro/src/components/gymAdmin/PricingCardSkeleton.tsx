export function PricingCardSkeleton() {
  return (
    <div
      className="
        group relative flex h-full flex-col rounded-2xl p-8
        bg-gradient-to-b from-neutral-900 via-neutral-950 to-black
        border border-neutral-800
        animate-pulse
      "
    >
      <div className="mb-6">
        <div className="h-7 w-3/4 rounded bg-neutral-800" />
        <div className="mt-2 h-4 w-1/3 rounded bg-neutral-800" />
      </div>

      <div className="mb-8">
        <div className="h-12 w-1/2 rounded bg-neutral-800" />
      </div>

      <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900/70 p-5">
        <div className="mb-4 h-3 w-1/4 rounded bg-neutral-800" />

        <div className="grid grid-cols-3 gap-4 text-center">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-black/40 p-3">
              <div className="mx-auto mb-2 h-5 w-5 rounded bg-neutral-800" />
              <div className="mx-auto mb-1 h-4 w-8 rounded bg-neutral-800" />
              <div className="mx-auto h-3 w-12 rounded bg-neutral-800" />
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <ul className="mb-10 space-y-4 flex-1 overflow-y-hidden max-h-52">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="flex gap-3">
            <div className="mt-0.5 h-5 w-5 rounded bg-neutral-800" />
            <div className="h-4 w-full rounded bg-neutral-800" />
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <div className="mt-auto h-12 w-full rounded-xl bg-neutral-800" />
    </div>
  );
}
