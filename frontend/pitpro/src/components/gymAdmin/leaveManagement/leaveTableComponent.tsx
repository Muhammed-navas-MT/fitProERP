import { format } from "date-fns";
import {
  AdminTable,
  type AdminTableColumn,
} from "@/components/gymAdmin/ui/AdminTable";
import { StatusBadge } from "@/components/gymAdmin/ui/StatusBadge";

enum LeaveStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  APPROVED = "APPROVED",
}

export interface IListTrainerLeaveItem {
  id: string;
  startDate: Date;
  endDate: Date;
  leaveCount: number;
  status: LeaveStatus;
  reason: string;
  appliedDate: Date;

  branchDetail: {
    branchName: string;
    city: string;
    pincode: string;
  };

  trainerDetail: {
    name: string;
    email: string;
  };
}

interface Props {
  leaves: IListTrainerLeaveItem[];
  onView: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function LeaveTable({
  leaves,
  onView,
  onApprove,
  onReject,
}: Props) {
  const columns: AdminTableColumn<IListTrainerLeaveItem>[] = [
    {
      header: "Trainer",
      render: (leave) => (
        <div>
          <p className="font-medium text-white">
            {leave.trainerDetail.name}
          </p>
          <p className="text-xs text-zinc-400">
            {leave.trainerDetail.email}
          </p>
        </div>
      ),
    },

    {
      header: "Branch",
      render: (leave) => (
        <div>
          <p>{leave.branchDetail.branchName}</p>
          <p className="text-xs text-zinc-400">
            {leave.branchDetail.city} - {leave.branchDetail.pincode}
          </p>
        </div>
      ),
    },

    {
      header: "Leave Dates",
      render: (leave) => (
        <div>
          <p>{format(new Date(leave.startDate), "dd MMM yyyy")}</p>
          <p className="text-xs text-zinc-400">
            to {format(new Date(leave.endDate), "dd MMM yyyy")}
          </p>
        </div>
      ),
    },

    {
      header: "Reason",
      render: (leave) => (
        <p className="max-w-[220px] truncate text-zinc-300">{leave.reason}</p>
      ),
    },

    {
      header: "Leave Count",
      render: (leave) => (
        <span className="text-zinc-300">{leave.leaveCount} Days</span>
      ),
    },

    {
      header: "Status",
      render: (leave) => <StatusBadge status={leave.status} />,
    },

    {
      header: "Applied Date",
      render: (leave) => (
        <span className="text-zinc-400">
          {format(new Date(leave.appliedDate), "dd MMM yyyy")}
        </span>
      ),
    },

    /* ACTION COLUMN */
    {
      header: "Actions",
      render: (leave) => (
        <div className="flex flex-wrap gap-2 text-sm font-medium">
          <button
            onClick={() => onView(leave.id)}
            className="rounded-md px-2 py-1 text-blue-400 transition-colors hover:bg-blue-500/10"
          >
            View
          </button>

          {leave.status === LeaveStatus.PENDING && (
            <>
              <button
                onClick={() => onApprove(leave.id)}
                className="rounded-md px-2 py-1 text-green-400 transition-colors hover:bg-green-500/10"
              >
                Approve
              </button>

              <button
                onClick={() => onReject(leave.id)}
                className="rounded-md px-2 py-1 text-red-400 transition-colors hover:bg-red-500/10"
              >
                Reject
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminTable
      title="Trainer Leaves"
      data={leaves}
      columns={columns}
      rowKey={(leave) => leave.id}
      emptyText="No leave requests found"
    />
  );
}