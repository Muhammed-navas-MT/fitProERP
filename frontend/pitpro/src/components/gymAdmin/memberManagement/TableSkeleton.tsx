export function TableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60">
              {Array.from({ length: 7 }).map((_, i) => (
                <th key={i} className="px-4 py-3 first:pl-6 last:pr-6">
                  <div className="h-3 w-20 animate-pulse rounded bg-zinc-800" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800/70">
            {Array.from({ length: 6 }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {Array.from({ length: 7 }).map((_, colIdx) => (
                  <td key={colIdx} className="px-4 py-4 first:pl-6 last:pr-6">
                    <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
