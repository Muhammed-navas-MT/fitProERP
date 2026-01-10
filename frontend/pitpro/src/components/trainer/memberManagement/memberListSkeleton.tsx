import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MembersListSkeleton() {
  return (
    <Card className="bg-[#0f0f0f] border-[#2a2a2a] p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Skeleton className="h-6 w-32 bg-[#1a1a1a]" />

        <div className="flex flex-col sm:flex-row gap-3 flex-1 md:max-w-2xl">
          <Skeleton className="h-10 flex-1 bg-[#1a1a1a]" />
          <Skeleton className="h-10 w-28 bg-[#1a1a1a]" />
        </div>
      </div>

      {/* Member cards skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-lg border border-[#2a2a2a] bg-[#141414]"
          >
            {/* Avatar */}
            <Skeleton className="h-12 w-12 rounded-full bg-[#1a1a1a]" />

            {/* Info */}
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40 bg-[#1a1a1a]" />
              <Skeleton className="h-3 w-60 bg-[#1a1a1a]" />
            </div>

            {/* Status */}
            <Skeleton className="h-6 w-20 rounded-full bg-[#1a1a1a]" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-10 bg-[#1a1a1a]" />
        ))}
      </div>
    </Card>
  );
}
