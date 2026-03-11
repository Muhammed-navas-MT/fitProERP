export default function ProfitAnalyticsSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 space-y-3"
          >
            <div className="h-3 w-24 bg-zinc-800 rounded"></div>
            <div className="h-7 w-32 bg-zinc-800 rounded"></div>
            <div className="h-3 w-20 bg-zinc-800 rounded"></div>
          </div>
        ))}
      </div>

      {/* Profit Trend Chart Skeleton */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
        <div className="h-5 w-40 bg-zinc-800 rounded mb-6"></div>

        <div className="flex items-end justify-between h-[200px] gap-6 px-6">
          {[1, 2, 3, 4, 5, 6].map((month) => (
            <div key={month} className="flex items-end gap-2 h-full">
              {/* Revenue Bar */}
              <div
                className="w-5 bg-zinc-800 rounded"
                style={{ height: `${140 + month * 10}px` }}
              />

              {/* Expense Bar */}
              <div
                className="w-5 bg-zinc-800 rounded"
                style={{ height: `${100 + month * 8}px` }}
              />

              {/* Profit Bar */}
              <div
                className="w-5 bg-zinc-800 rounded"
                style={{ height: `${60 + month * 6}px` }}
              />
            </div>
          ))}
        </div>

        {/* Month labels */}
        <div className="flex justify-between mt-4 px-6">
          {[1, 2, 3, 4, 5, 6].map((m) => (
            <div key={m} className="h-3 w-8 bg-zinc-800 rounded"></div>
          ))}
        </div>
      </div>

      {/* Bottom Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Branch Profitability Skeleton */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="h-5 w-48 bg-zinc-800 rounded mb-6"></div>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-zinc-800 rounded"></div>
                  <div className="h-3 w-20 bg-zinc-800 rounded"></div>
                </div>
                <div className="h-4 w-20 bg-zinc-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights Skeleton */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4">
          <div className="h-5 w-32 bg-zinc-800 rounded mb-6"></div>

          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-md border border-zinc-800 p-3 flex gap-3"
              >
                <div className="h-4 w-4 bg-zinc-800 rounded"></div>

                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 bg-zinc-800 rounded"></div>
                  <div className="h-3 w-full bg-zinc-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
