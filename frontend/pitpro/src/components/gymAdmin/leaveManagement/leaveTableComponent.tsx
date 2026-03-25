import { ReusableTable, TableColumn } from "@/components/shared/reusableTable";
import { format } from "date-fns";

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
  const columns: TableColumn<IListTrainerLeaveItem>[] = [
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
        <p className="text-zinc-300 max-w-[200px] truncate">
          {leave.reason}
        </p>
      ),
    },

    {
      header: "Leave Count",
      render: (leave) => (
        <p className="text-zinc-300 max-w-[200px] truncate">
          {leave.leaveCount} Days
        </p>
      ),
    },

    {
      header: "Status",
      render: (leave) => (
         <span
                className={`px-3 py-1 rounded text-xs font-medium
                ${
                  leave.status === "APPROVED"
                    ? "bg-green-600/20 text-green-400"
                    : leave.status === "REJECTED"
                    ? "bg-red-600/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {leave.status}
              </span>
      ),
    },

    {
      header: "Applied Date",
      render: (leave) => (
        <span>
          {format(new Date(leave.appliedDate), "dd MMM yyyy")}
        </span>
      ),
    },

    /* ACTION COLUMN */
    {
      header: "Actions",
      render: (leave) => (
        <div className="flex gap-3 text-sm">
          <button
            onClick={() => onView(leave.id)}
            className="text-blue-400 hover:underline"
          >
            View
          </button>

          {leave.status === LeaveStatus.PENDING && (
            <>
              <button
                onClick={() => onApprove(leave.id)}
                className="text-green-400 hover:underline"
              >
                Approve
              </button>

              <button
                onClick={() => onReject(leave.id)}
                className="text-red-400 hover:underline"
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
    <ReusableTable
      title="Trainer Leaves"
      data={leaves}
      columns={columns}
      emptyText="No leave requests found"
    />
  );
}