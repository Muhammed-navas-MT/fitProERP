import { useEffect, useState } from "react";
import { Plus, Eye, Pencil, Loader2 } from "lucide-react";
import { format } from "date-fns";

import { SearchInput } from "@/components/trainer/searchInput";
import { LeaveStatusBadge } from "@/components/trainer/leaveComponents/leaveStatusBadge";
import { AddLeaveModal } from "@/components/trainer/leaveComponents/addLeaveModal";
import { ViewLeaveModal } from "@/components/trainer/leaveComponents/veiwLeaveModal";
import UpdateLeaveModal from "@/components/trainer/leaveComponents/updateLeaveModal";
import { Header } from "@/components/trainer/trainerHeader";
import { Sidebar } from "@/components/trainer/trainerSidebar";

import {
  TrainerReusableTable,
  TableColumn,
} from "@/components/trainer/trainerReudableTable";

import { useLeaves } from "@/hook/trainer/leaveHook";
import { useDebounce } from "@/hook/useDebounce";
import TrainerLeavePageSkeleton from "@/components/trainer/leaveComponents/trainerLeavePageSkeleton";
import { useSelector } from "react-redux";
import { rootstate } from "@/store/store";

enum LeaveStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  APPROVED = "APPROVED",
}

interface LeaveItem {
  id: string;
  startDate: Date;
  endDate: Date;
  status: LeaveStatus;
  reason: string;
  rejectionReason?: string;
  appliedDate: Date;
}

export default function LeavesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);

  const [addOpen, setAddOpen] = useState(false);
  const [viewLeave, setViewLeave] = useState<LeaveItem | null>(null);
  const [editLeave, setEditLeave] = useState<LeaveItem | null>(null);

  const [page, setPage] = useState(1);
  const limit = 5;
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  const name = useSelector((state: rootstate) => state.authData.name);

  const avatarText = name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const { data, isLoading, isFetching } = useLeaves(
    page,
    debouncedSearch,
    status,
  );

  const leaves: LeaveItem[] = data?.data?.leaves ?? [];
  const total = data?.data?.total ?? 0;
  const totalPages = data?.data?.totalPages ?? 1;
  console.log(leaves)

  const columns: TableColumn<LeaveItem>[] = [
    {
      header: "#",
      render: (_, index) => index + 1 + (page - 1) * limit,
      className: "text-zinc-500",
    },
    {
      header: "Applied Date",
      render: (row) => format(new Date(row.appliedDate), "dd MMM yyyy"),
      className: "text-zinc-300",
    },
    {
      header: "Start Date",
      render: (row) => format(new Date(row.startDate), "dd MMM yyyy"),
      className: "text-white",
    },
    {
      header: "End Date",
      render: (row) => format(new Date(row.endDate), "dd MMM yyyy"),
      className: "text-white",
    },
    {
      header: "Reason",
      render: (row) => row.reason,
      className: "text-zinc-300",
    },
    {
      header: "Status",
      render: (row) => <LeaveStatusBadge status={row.status} />,
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewLeave(row)}
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <Eye className="h-4 w-4" />
          </button>

          {row.status === LeaveStatus.PENDING && (
            <button
              onClick={() => setEditLeave(row)}
              className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-purple-400"
            >
              <Pencil className="h-4 w-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  /* ---------------- Loading ---------------- */

  if (isLoading  && !data) {
    return <TrainerLeavePageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Sidebar />

      <div className="lg:pl-[220px]">
        <Header
          title="Leave Management"
          subtitle="Manage your leave requests"
          avatar={avatarText}
        />

        <div className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Filters */}

            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1 flex gap-3">
                <SearchInput
                  value={search}
                  onChange={setSearch}
                  placeholder="Search by reason..."
                />

                <select
                  value={status ?? ""}
                  onChange={(e) => setStatus(e.target.value || undefined)}
                  className="bg-zinc-900 border border-zinc-700 text-sm rounded-lg px-3 py-2 text-white"
                >
                  <option value="">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              <button
                onClick={() => setAddOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700 transition"
              >
                <Plus className="h-4 w-4" />
                Apply Leave
              </button>
            </div>

            {/* Table */}

            <div className="relative">
              {isFetching && (
                <div className="absolute right-2 top-2">
                  <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
                </div>
              )}

              <TrainerReusableTable
                data={leaves}
                columns={columns}
                emptyText="No leaves found"
              />
            </div>

            {/* Pagination */}

            <div className="flex items-center justify-between text-sm text-zinc-400">
              <p>
                Showing {(page - 1) * limit + 1} -{" "}
                {Math.min(page * limit, total)} of {total}
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1 rounded bg-zinc-800 text-white disabled:opacity-40"
                >
                  Prev
                </button>

                <span>
                  Page {page} / {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1 rounded bg-zinc-800 text-white disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>

            <AddLeaveModal open={addOpen} onClose={() => setAddOpen(false)} />

            <ViewLeaveModal
              open={!!viewLeave}
              onClose={() => setViewLeave(null)}
              leave={viewLeave}
            />

            <UpdateLeaveModal
              open={!!editLeave}
              onClose={() => setEditLeave(null)}
              leave={editLeave}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
