import { useEffect, useMemo, useState } from "react";
import { TopBar } from "@/components/gymAdmin/topbar";
import { Sidebar } from "@/components/gymAdmin/sidebar";
import { SearchFilter } from "@/components/gymAdmin/searchFilterBar";

import {
  useLeaves,
  useApproveLeave,
  useRejectLeave,
} from "@/hook/gymAdmin/leaveHooks";

import { useListActiveBranch } from "@/hook/gymAdmin/branchHooks";
import { useDebounce } from "@/hook/useDebounce";

import { LeaveTable } from "@/components/gymAdmin/leaveManagement/leaveTableComponent";
import RejectLeaveModal from "@/components/gymAdmin/leaveManagement/rejectLeaveModal";
import ViewLeaveModal from "@/components/gymAdmin/leaveManagement/viewTrainerLeaveModal";

import { toast } from "sonner";
import GymAdminTablePageSkeleton from "@/components/gymAdmin/tablePageSkeleton";

export default function TrainerLeavePage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState("");

  const [viewLeaveId, setViewLeaveId] = useState<string | null>(null);
  const [rejectLeaveId, setRejectLeaveId] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { mutate: approveLeave } = useApproveLeave();
  const { mutate: rejectLeave } = useRejectLeave();

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery, branchFilter]);

  const { data, isLoading } = useLeaves(
    page,
    debouncedSearchQuery,
    branchFilter,
    undefined,
  );

  const { data: branchResponse } = useListActiveBranch();

  const leavesData = data?.data;
  const activeBranches = branchResponse?.data?.branches ?? [];

  const leaves = useMemo(() => {
    return leavesData?.leaves ?? [];
  }, [leavesData]);
  console.log(leaves)

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleApprove = (id: string) => {
    approveLeave(id, {
      onSuccess() {
        toast.success("Leave approved successfully");
      },
      onError(err) {
        toast.error(err?.message || "Approval failed");
      },
    });
  };

  const handleRejectOpen = (id: string) => {
    setRejectLeaveId(id);
  };

  const handleRejectSubmit = (reason: string) => {
    if (!rejectLeaveId) return;

    rejectLeave(
      {
        leaveId: rejectLeaveId,
        reason,
      },
      {
        onSuccess() {
          toast.success("Leave rejected successfully");
        },
        onError(err) {
          toast.error(err?.message || "Rejection failed");
        },
      },
    );

    setRejectLeaveId(null);
  };

  if (isLoading) return <GymAdminTablePageSkeleton title="Trainer Leaves" description="Manage trainer leave request" />;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <Sidebar />

      <TopBar title="Trainer Leaves" subtitle="Manage trainer leave requests">
        {/* Filters */}
        <div className="relative">
          <SearchFilter
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            filterValue={branchFilter}
            onFilterChange={setBranchFilter}
            filterOptions={activeBranches.map(
              (branch: {
                id: string;
                branchName: string;
                address: string;
              }) => ({
                label: `${branch.branchName} - ${branch.address}`,
                value: branch.id,
              }),
            )}
          />
        </div>

        {/* Leave Table */}
        <LeaveTable
          leaves={leaves}
          onView={(id) => setViewLeaveId(id)}
          onApprove={handleApprove}
          onReject={handleRejectOpen}
        />

        {/* Pagination */}
        {leavesData && (
          <div className="mt-6 flex items-center justify-between text-sm text-zinc-400">
            <span>
              Page {leavesData.page} of {leavesData.totalPages}
            </span>

            <div className="flex gap-2">
              <button
                disabled={leavesData.page === 1}
                onClick={() => handlePageChange(leavesData.page - 1)}
                className="rounded px-3 py-1 hover:bg-zinc-800 disabled:text-zinc-600"
              >
                Previous
              </button>

              <button
                disabled={leavesData.page === leavesData.totalPages}
                onClick={() => handlePageChange(leavesData.page + 1)}
                className="rounded px-3 py-1 hover:bg-zinc-800 disabled:text-zinc-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* View Leave Modal */}
        <ViewLeaveModal
          leaveId={viewLeaveId}
          onClose={() => setViewLeaveId(null)}
        />

        {/* Reject Leave Modal */}
        <RejectLeaveModal
          open={!!rejectLeaveId}
          onClose={() => setRejectLeaveId(null)}
          onSubmit={handleRejectSubmit}
        />
      </TopBar>
    </div>
  );
}
