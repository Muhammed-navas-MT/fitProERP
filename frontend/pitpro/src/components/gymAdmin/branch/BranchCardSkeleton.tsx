function BranchCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-zinc-800 bg-zinc-900/40 p-5">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 rounded-lg bg-zinc-800" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 rounded bg-zinc-800" />
          <div className="h-3 w-full rounded bg-zinc-800" />
          <div className="h-3 w-1/2 rounded bg-zinc-800" />
        </div>
      </div>
      <div className="mt-4 h-16 rounded-lg border border-zinc-800 bg-zinc-950/40" />
      <div className="mt-4 h-9 rounded-md bg-zinc-800" />
    </div>
  );
}
export default BranchCardSkeleton;
