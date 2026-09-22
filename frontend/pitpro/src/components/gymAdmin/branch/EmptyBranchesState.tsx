import { Building2, SearchX } from "lucide-react";
import { EmptyState } from "@/components/gymAdmin/ui/EmptyState";
import { adminPrimaryBtn } from "@/components/gymAdmin/ui/adminUi";

function EmptyBranchesState({
  isSearching,
  onAddBranch,
}: {
  isSearching: boolean;
  onAddBranch: () => void;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40">
      <EmptyState
        icon={isSearching ? SearchX : Building2}
        title={isSearching ? "No branches found" : "No branches yet"}
        description={
          isSearching
            ? "We couldn’t find any branches matching your search. Try a different keyword."
            : "You haven’t added any branches yet. Create your first branch to start managing locations."
        }
        action={
          !isSearching ? (
            <button
              type="button"
              onClick={onAddBranch}
              className={adminPrimaryBtn}
            >
              + Add Your First Branch
            </button>
          ) : undefined
        }
      />
    </div>
  );
}

export default EmptyBranchesState;
