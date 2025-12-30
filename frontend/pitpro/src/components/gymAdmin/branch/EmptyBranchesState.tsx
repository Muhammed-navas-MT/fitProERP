import { Button } from "@/components/ui/button"

function EmptyBranchesState({
  isSearching,
  onAddBranch,
}: {
  isSearching: boolean
  onAddBranch: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 p-12 text-center">
      <h3 className="text-xl font-semibold text-white">
        {isSearching ? "No branches found" : "No branches yet"}
      </h3>

      <p className="mt-2 text-sm text-zinc-400 max-w-md">
        {isSearching
          ? "We couldn’t find any branches matching your search. Try a different keyword."
          : "You haven’t added any branches yet. Create your first branch to start managing locations."}
      </p>

      {!isSearching && (
        <Button
          onClick={onAddBranch}
          className="mt-6 bg-orange-500 text-black"
        >
          + Add Your First Branch
        </Button>
      )}
    </div>
  )
}

export default EmptyBranchesState