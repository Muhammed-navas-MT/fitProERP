import { Sidebar } from "@/components/gymAdmin/sidebar"

export function MemberDetailSkeleton() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <div className="flex w-full flex-col p-6 space-y-6">
        {/* Header */}
        <div className="h-10 w-1/3 rounded bg-zinc-800 animate-pulse" />

        {/* Profile Card */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="flex gap-6">
              <div className="h-32 w-32 rounded-lg bg-zinc-800 animate-pulse" />

              <div className="space-y-3">
                <div className="h-6 w-48 rounded bg-zinc-800 animate-pulse" />
                <div className="h-4 w-24 rounded bg-zinc-700 animate-pulse" />
                <div className="h-4 w-20 rounded bg-zinc-700 animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 w-24 rounded bg-zinc-800 animate-pulse" />
              <div className="h-20 w-24 rounded bg-zinc-800 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Contact + Package */}
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-3"
            >
              <div className="h-5 w-40 rounded bg-zinc-800 animate-pulse" />
              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className="h-4 w-full rounded bg-zinc-700 animate-pulse"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Health Details */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="h-5 w-40 rounded bg-zinc-800 animate-pulse mb-6" />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-24 rounded bg-zinc-800 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Progress Card */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
          <div className="h-5 w-40 rounded bg-zinc-800 animate-pulse mb-4" />
          <div className="h-20 rounded bg-zinc-800 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
