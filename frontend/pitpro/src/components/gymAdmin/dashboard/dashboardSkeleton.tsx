"use client";

import { Sidebar } from "@/components/gymAdmin/sidebar";
import { TopBar } from "@/components/gymAdmin/topbar";

function SkeletonBox({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-zinc-800/60 ${className}`} />
  );
}

function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <SkeletonBox className="h-4 w-20" />
          <SkeletonBox className="h-8 w-16" />
        </div>
        <SkeletonBox className="h-11 w-11 rounded-lg" />
      </div>
      <SkeletonBox className="mt-3 h-6 w-24 rounded-full" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <SkeletonBox className="h-8 w-8 rounded-lg" />
        <SkeletonBox className="h-5 w-40" />
      </div>

      <div className="h-[280px] w-full rounded-lg border border-zinc-800/70 bg-zinc-950/60 p-4">
        <div className="flex h-full items-end justify-between gap-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonBox
              key={index}
              className={`w-full ${
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
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <SkeletonBox className="h-8 w-8 rounded-lg" />
        <SkeletonBox className="h-5 w-40" />
      </div>

      <div className="space-y-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <SkeletonBox className="h-4 w-44" />
              <SkeletonBox className="h-4 w-32" />
            </div>
            <SkeletonBox className="h-3 w-20" />
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
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>

          <div className="grid gap-4 sm:gap-5 xl:grid-cols-2">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>

          <RecentActivitySkeleton />
        </div>
      </TopBar>
    </div>
  );
}
