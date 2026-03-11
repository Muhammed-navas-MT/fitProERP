export default function RevenueTableSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-8">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-3"
          >
            <div className="h-4 w-32 bg-zinc-800 rounded" />
            <div className="h-7 w-28 bg-zinc-800 rounded" />
            <div className="h-3 w-24 bg-zinc-800 rounded" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="border border-zinc-800 rounded-lg overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-6 gap-4 p-4 bg-zinc-900 border-b border-zinc-800">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-4 bg-zinc-800 rounded" />
          ))}
        </div>

        {/* Table rows */}
        {[1, 2, 3, 4, 5].map((row) => (
          <div
            key={row}
            className="grid grid-cols-6 gap-4 p-4 border-b border-zinc-800"
          >
            {[1, 2, 3, 4, 5, 6].map((col) => (
              <div key={col} className="h-4 bg-zinc-800 rounded" />
            ))}
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-32 bg-zinc-800 rounded" />
        <div className="flex gap-2">
          <div className="h-8 w-20 bg-zinc-800 rounded" />
          <div className="h-8 w-20 bg-zinc-800 rounded" />
        </div>
      </div>

    </div>
  );
}