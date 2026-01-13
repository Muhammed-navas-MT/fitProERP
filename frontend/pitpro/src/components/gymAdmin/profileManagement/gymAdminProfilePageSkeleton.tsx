import { Sidebar } from "../sidebar";
import { TopBar } from "../topbar";

export function GymInfoSkeleton() {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />
      <div className="flex-1">
        <TopBar
          title="Gym Information"
          subtitle="Manage your gym profile and settings"
        />
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonCard lines={3} />
          <SkeletonCard lines={3} />
          <div className="bg-black border border-orange-500/20 rounded-lg p-6">
            <div className="h-5 w-32 bg-zinc-800 rounded mb-4 animate-pulse" />
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-zinc-800 rounded animate-pulse" />
              <div className="w-24 h-24 bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>

          <SkeletonCard lines={3} />

          <div className="bg-black border border-orange-500/20 rounded-lg p-6 md:col-span-2">
            <div className="h-5 w-24 bg-zinc-800 rounded mb-4 animate-pulse" />
            <div className="grid grid-cols-3 gap-4">
              <SkeletonStat />
              <SkeletonStat />
              <SkeletonStat />
            </div>
          </div>

          <div className="bg-black border border-orange-500/20 rounded-lg p-6 md:col-span-2">
            <div className="h-5 w-28 bg-zinc-800 rounded mb-4 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-full bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>

          <div className="bg-black border border-orange-500/20 rounded-lg p-6 md:col-span-2">
            <div className="h-5 w-24 bg-zinc-800 rounded mb-4 animate-pulse" />
            <div className="flex gap-2">
              <div className="h-8 w-20 bg-zinc-800 rounded-full animate-pulse" />
              <div className="h-8 w-24 bg-zinc-800 rounded-full animate-pulse" />
              <div className="h-8 w-16 bg-zinc-800 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="bg-black border border-orange-500/20 rounded-lg p-6">
      <div className="h-5 w-36 bg-zinc-800 rounded mb-4 animate-pulse" />
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-4 w-full bg-zinc-800 rounded animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

function SkeletonStat() {
  return (
    <div>
      <div className="h-4 w-24 bg-zinc-800 rounded mb-2 animate-pulse" />
      <div className="h-8 w-16 bg-zinc-800 rounded animate-pulse" />
    </div>
  );
}
