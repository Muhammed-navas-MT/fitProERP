export function PackagesSkeletonGrid() {
  return (
    <main className="min-h-screen bg-neutral-950 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <div className="h-8 w-64 mx-auto bg-neutral-800 rounded animate-pulse" />
        <div className="h-4 w-80 mx-auto bg-neutral-800 rounded mt-4 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-2xl border border-orange-500/20
            bg-gradient-to-b from-neutral-900 via-neutral-950 to-black
            p-6 animate-pulse"
          >
            <div className="h-5 w-32 bg-neutral-800 rounded mb-4" />

            <div className="h-6 w-40 bg-neutral-800 rounded mb-2" />

            <div className="h-4 w-24 bg-neutral-800 rounded mb-6" />

            <div className="h-10 w-28 bg-neutral-800 rounded mb-6" />

            <div className="space-y-3 flex-1">
              <div className="h-4 bg-neutral-800 rounded" />
              <div className="h-4 bg-neutral-800 rounded" />
              <div className="h-4 bg-neutral-800 rounded" />
            </div>

            <div className="h-10 bg-neutral-800 rounded mt-6" />
          </div>
        ))}
      </div>
    </main>
  );
}
