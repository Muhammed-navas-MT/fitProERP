export function TableSkeleton() {
  return (
    <div className="rounded-lg border border-orange-500/20 bg-black/40 p-4 lg:p-6 overflow-x-auto animate-pulse">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            {Array.from({ length: 7 }).map((_, i) => (
              <th key={i} className="py-3 px-2">
                <div className="h-4 w-20 bg-zinc-800 rounded" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 6 }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-b border-zinc-900">
              {Array.from({ length: 7 }).map((_, colIdx) => (
                <td key={colIdx} className="py-4 px-2">
                  <div className="h-4 w-full bg-zinc-800 rounded" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
