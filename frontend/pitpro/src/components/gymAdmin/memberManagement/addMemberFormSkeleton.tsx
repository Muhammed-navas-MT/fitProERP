export function AddMemberFormSkeleton() {
  return (
    <div className="space-y-6 mt-4 animate-pulse">
      {/* PERSONAL DETAILS */}
      <div className="space-y-4">
        <div className="h-5 w-40 bg-zinc-800 rounded" />

        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-full bg-zinc-800 rounded"
            />
          ))}
        </div>

        <div className="h-20 w-full bg-zinc-800 rounded" />
      </div>

      <div className="space-y-4">
        <div className="h-5 w-40 bg-zinc-800 rounded" />

        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-full bg-zinc-800 rounded"
            />
          ))}
        </div>
      </div>

      {/* TRAINER & BRANCH */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-zinc-800 rounded" />
          <div className="h-10 w-full bg-zinc-800 rounded" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-32 bg-zinc-800 rounded" />
          <div className="h-10 w-full bg-zinc-800 rounded" />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 pt-4">
        <div className="h-10 flex-1 bg-zinc-800 rounded" />
        <div className="h-10 flex-1 bg-zinc-700 rounded" />
      </div>
    </div>
  );
}
