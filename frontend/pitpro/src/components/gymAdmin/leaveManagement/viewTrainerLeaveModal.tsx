import { format } from "date-fns";
import { useFindLeave } from "@/hook/gymAdmin/leaveHooks";

interface Props {
  leaveId: string | null;
  onClose: () => void;
}

enum LeaveStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  APPROVED = "APPROVED",
}

export interface TrainerLeaveItem {
  id: string;
  startDate: Date;
  endDate: Date;
  status: LeaveStatus;
  reason: string;
  rejectionReason?: string;
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

export default function ViewLeaveModal({ leaveId, onClose }: Props) {
  const { data, isLoading } = useFindLeave(leaveId || "");

  if (!leaveId) return null;

  const leave: TrainerLeaveItem = data?.data;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-zinc-900 w-[500px] rounded-lg shadow-lg p-6 text-white">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">Trainer Leave Details</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {isLoading && (
          <p className="text-zinc-400">Loading...</p>
        )}

        {leave && (
          <div className="space-y-4 text-sm">

            {/* Trainer */}
            <div className="border-b border-zinc-800 pb-3">
              <p className="text-zinc-400 text-xs">Trainer</p>
              <p className="font-medium">{leave.trainerDetail.name}</p>
              <p className="text-zinc-400 text-xs">
                {leave.trainerDetail.email}
              </p>
            </div>

            {/* Branch */}
            <div className="border-b border-zinc-800 pb-3">
              <p className="text-zinc-400 text-xs">Branch</p>
              <p>{leave.branchDetail.branchName}</p>
              <p className="text-zinc-400 text-xs">
                {leave.branchDetail.city} - {leave.branchDetail.pincode}
              </p>
            </div>

            {/* Leave Dates */}
            <div className="border-b border-zinc-800 pb-3">
              <p className="text-zinc-400 text-xs">Leave Period</p>
              <p>
                {format(new Date(leave.startDate), "dd MMM yyyy")} —{" "}
                {format(new Date(leave.endDate), "dd MMM yyyy")}
              </p>
            </div>

            {/* Applied Date */}
            <div className="border-b border-zinc-800 pb-3">
              <p className="text-zinc-400 text-xs">Applied Date</p>
              <p>{format(new Date(leave.appliedDate), "dd MMM yyyy")}</p>
            </div>

            {/* Reason */}
            <div className="border-b border-zinc-800 pb-3">
              <p className="text-zinc-400 text-xs">Reason</p>
              <p>{leave.reason}</p>
            </div>

            {/* Status */}
            <div className="border-b border-zinc-800 pb-3">
              <p className="text-zinc-400 text-xs">Status</p>
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
            </div>

            {/* Rejection Reason */}
            {leave.status === "REJECTED" && leave.rejectionReason && (
              <div>
                <p className="text-zinc-400 text-xs">Rejection Reason</p>
                <p className="text-red-400">{leave.rejectionReason}</p>
              </div>
            )}

          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded text-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
