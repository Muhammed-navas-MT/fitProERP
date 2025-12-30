function BranchCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
      <div className="h-5 w-2/3 rounded bg-zinc-800" />
      <div className="h-4 w-full rounded bg-zinc-800" />
      <div className="h-4 w-1/2 rounded bg-zinc-800" />
      <div className="flex gap-4 pt-2">
        <div className="h-8 w-20 rounded bg-zinc-800" />
        <div className="h-8 w-20 rounded bg-zinc-800" />
      </div>
    </div>
  )
}
export default BranchCardSkeleton