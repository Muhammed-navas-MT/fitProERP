export function MemberProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* ===== Top Profile Card ===== */}
      <div className="animate-pulse rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
        {/* Cover */}
        <div className="h-24 bg-gradient-to-r from-zinc-800 to-zinc-700" />

        <div className="p-6 flex flex-col gap-4">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-zinc-800" />
            <div className="space-y-2">
              <div className="h-5 w-40 bg-zinc-800 rounded" />
              <div className="h-4 w-20 bg-zinc-800 rounded" />
            </div>
          </div>

          {/* Info row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-20 bg-zinc-800 rounded" />
                <div className="h-4 w-full bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Tabs Skeleton ===== */}
      <div className="animate-pulse flex gap-6 border-b border-zinc-800 pb-2">
        <div className="h-4 w-24 bg-zinc-800 rounded" />
        <div className="h-4 w-24 bg-zinc-800 rounded" />
        <div className="h-4 w-24 bg-zinc-800 rounded" />
      </div>

      {/* ===== Content Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="animate-pulse rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
          <div className="h-5 w-40 bg-zinc-800 rounded" />

          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-32 bg-zinc-800 rounded" />
              <div className="h-4 w-full bg-zinc-800 rounded" />
            </div>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="animate-pulse rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
          <div className="h-5 w-40 bg-zinc-800 rounded" />
          <div className="h-4 w-48 bg-zinc-800 rounded" />
          <div className="h-20 w-full bg-zinc-800 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
