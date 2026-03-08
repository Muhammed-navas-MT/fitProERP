import { Card, CardContent } from "@/components/ui/card";

export function PaymentsPageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Summary Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="bg-[#0a0a0a] border border-gray-800 shadow-sm"
          >
            <CardContent className="pt-6 space-y-3">
              <div className="h-3 w-24 bg-zinc-800 rounded"></div>
              <div className="h-6 w-32 bg-zinc-700 rounded"></div>
              <div className="h-3 w-20 bg-zinc-800 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search Skeleton */}
      <div className="h-10 w-full bg-zinc-800 rounded-md"></div>

      {/* Table Skeleton */}
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4 space-y-4">
        <div className="h-5 w-40 bg-zinc-700 rounded"></div>

        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="grid grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((j) => (
              <div
                key={j}
                className="h-4 bg-zinc-800 rounded w-full"
              ></div>
            ))}
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-end gap-2">
        <div className="h-8 w-20 bg-zinc-800 rounded"></div>
        <div className="h-8 w-20 bg-zinc-800 rounded"></div>
      </div>
    </div>
  );
}