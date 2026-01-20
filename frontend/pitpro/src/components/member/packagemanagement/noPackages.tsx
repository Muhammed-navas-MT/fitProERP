export function NoPackages() {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 px-6 text-center
      max-w-md mx-auto rounded-2xl
      bg-gradient-to-b from-neutral-900 via-neutral-950 to-black
      border border-orange-500/40"
    >
      <div className="mb-4 text-5xl">📦</div>

      <h2 className="text-lg font-semibold text-orange-500">
        No Active Packages
      </h2>

      <p className="mt-2 text-sm text-neutral-400">
        Currently, there are no active membership packages available.
        Please check back later.
      </p>
    </div>
  );
}
