"use client";

import { Sidebar } from "@/components/gymAdmin/sidebar";
import { TopBar } from "@/components/gymAdmin/topbar";

function SkeletonBox({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-zinc-800/60 ${className}`}
    />
  );
}

function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-black/40 p-6">
      <div className="mb-6 flex items-start justify-between">
        <SkeletonBox className="h-5 w-24" />
        <SkeletonBox className="h-8 w-8 rounded-md" />
      </div>

      <SkeletonBox className="mb-3 h-10 w-16" />
      <SkeletonBox className="h-4 w-20" />
    </div>
  );
}

function ChartSkeleton({ titleWidth = "w-48" }: { titleWidth?: string }) {
  return (
    <div className="rounded-2xl border border-orange-500/20 bg-black/40 p-6">
      <div className="mb-6 flex items-center gap-3">
        <SkeletonBox className="h-5 w-5 rounded-sm" />
        <SkeletonBox className={`h-7 ${titleWidth}`} />
      </div>

      <div className="h-[320px] w-full rounded-xl border border-zinc-800/70 bg-zinc-950/70 p-4">
        <div className="flex h-full items-end justify-between gap-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonBox
              key={index}
              className={`w-full rounded-md ${
                index % 4 === 0
                  ? "h-24"
                  : index % 4 === 1
                  ? "h-36"
                  : index % 4 === 2
                  ? "h-20"
                  : "h-28"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function RecentActivitySkeleton() {
  return (
    <div className="rounded-2xl border border-orange-500/20 bg-black/40 p-6">
      <SkeletonBox className="mb-8 h-8 w-52" />

      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-start justify-between border-b border-zinc-800 pb-6 last:border-b-0 last:pb-0"
          >
            <div className="space-y-3">
              <SkeletonBox className="h-6 w-48" />
              <SkeletonBox className="h-5 w-36" />
            </div>

            <SkeletonBox className="h-5 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <TopBar title="Dashboard" subtitle="Welcome back!" showUserMenu={true}>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ChartSkeleton titleWidth="w-52" />
          <ChartSkeleton titleWidth="w-48" />
        </div>

        <div className="mt-6">
          <RecentActivitySkeleton />
        </div>
      </TopBar>
    </div>
  );
}