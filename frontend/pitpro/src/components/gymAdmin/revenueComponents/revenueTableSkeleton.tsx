export default function RevenueTableSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <div className="flex-1 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-zinc-800 rounded w-1/3" />
          <div className="h-6 bg-zinc-800 rounded w-full" />
          <div className="h-6 bg-zinc-800 rounded w-full" />
          <div className="h-6 bg-zinc-800 rounded w-full" />
          <div className="h-6 bg-zinc-800 rounded w-full" />
        </div>
      </div>
    </div>
  );
}