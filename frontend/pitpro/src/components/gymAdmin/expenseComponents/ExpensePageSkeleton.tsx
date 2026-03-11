export default function ExpensePageSkeleton() {
  return (
    <div className="animate-pulse space-y-8">

      {/* Search Bar */}
      <div className="flex justify-between items-center">
        <div className="h-10 w-72 bg-zinc-800 rounded-lg"></div>
        <div className="h-10 w-32 bg-zinc-800 rounded-lg"></div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 space-y-3"
          >
            <div className="h-4 w-32 bg-zinc-800 rounded"></div>
            <div className="h-7 w-24 bg-zinc-800 rounded"></div>
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="border border-zinc-800 rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4 p-4 bg-zinc-900 border-b border-zinc-800">
          {[1,2,3,4,5,6,7].map((i)=>(
            <div key={i} className="h-4 bg-zinc-800 rounded"></div>
          ))}
        </div>

        {/* Table Rows */}
        {[1,2,3,4,5].map((row)=>(
          <div
            key={row}
            className="grid grid-cols-7 gap-4 p-4 border-b border-zinc-800"
          >
            {[1,2,3,4,5,6,7].map((col)=>(
              <div key={col} className="h-4 bg-zinc-800 rounded"></div>
            ))}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="h-4 w-28 bg-zinc-800 rounded"></div>

        <div className="flex gap-2">
          <div className="h-8 w-16 bg-zinc-800 rounded"></div>
          <div className="h-8 w-16 bg-zinc-800 rounded"></div>
        </div>
      </div>

      {/* Chart Skeleton */}
      <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <div className="h-5 w-60 bg-zinc-800 rounded mb-6"></div>

        <div className="flex items-end justify-between h-[220px] px-6 gap-4">

          {[1,2,3,4,5,6].map((month)=>(
            <div key={month} className="flex flex-col items-center gap-2">

              {/* stacked bar skeleton */}
              <div className="flex flex-col justify-end h-[180px] w-8 gap-[2px]">

                <div className="bg-zinc-800 h-6 rounded"></div>
                <div className="bg-zinc-800 h-5 rounded"></div>
                <div className="bg-zinc-800 h-7 rounded"></div>
                <div className="bg-zinc-800 h-4 rounded"></div>
                <div className="bg-zinc-800 h-6 rounded"></div>

              </div>

              <div className="h-3 w-8 bg-zinc-800 rounded"></div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}