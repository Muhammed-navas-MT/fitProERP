import { Sidebar } from "@/components/trainer/trainerSidebar";
import { Header } from "../trainerHeader";
import { useSelector } from "react-redux";
import { rootstate } from "@/store/store";

export default function TrainerLeavePageSkeleton() {
    const name = useSelector((state: rootstate) => state.authData.name);

  const avatarText = name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Sidebar (no animation) */}
      <Sidebar />

      <div className="lg:pl-[220px]">

        {/* Header Skeleton (no animation) */}
        <Header
                  title="Leave Management"
                  subtitle="Manage your leave requests"
                  avatar={avatarText}
                />

        {/* Animated Content */}
        <div className="p-4 lg:p-8 animate-pulse">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Filters Skeleton */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">

              <div className="flex-1 flex gap-3">
                <div className="h-10 w-full bg-zinc-800 rounded-lg"></div>
                <div className="h-10 w-40 bg-zinc-800 rounded-lg"></div>
              </div>

              <div className="h-10 w-36 bg-zinc-800 rounded-lg"></div>

            </div>

            {/* Table Skeleton */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">

              {/* Table Header */}
              <div className="grid grid-cols-7 gap-4 p-4 border-b border-zinc-800">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="h-4 bg-zinc-800 rounded"></div>
                ))}
              </div>

              {/* Table Rows */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="grid grid-cols-7 gap-4 p-4 border-b border-zinc-800"
                >
                  {Array.from({ length: 7 }).map((_, j) => (
                    <div key={j} className="h-4 bg-zinc-800 rounded"></div>
                  ))}
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-4 w-40 bg-zinc-800 rounded"></div>

              <div className="flex gap-2">
                <div className="h-8 w-16 bg-zinc-800 rounded"></div>
                <div className="h-4 w-20 bg-zinc-800 rounded"></div>
                <div className="h-8 w-16 bg-zinc-800 rounded"></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}