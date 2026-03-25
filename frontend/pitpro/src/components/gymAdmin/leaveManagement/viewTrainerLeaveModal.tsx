import { format } from "date-fns";
import { AlertTriangle } from "lucide-react";
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
  leaveCount: number;
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

  isExided: boolean;
  Exidedmessage?: string;
}

export default function ViewLeaveModal({ leaveId, onClose }: Props) {
  const { data, isLoading } = useFindLeave(leaveId || "");

  if (!leaveId) return null;

  const leave: TrainerLeaveItem = data?.data;
  console.log(leave, "view leave page");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-[500px] rounded-lg bg-zinc-900 p-6 text-white shadow-lg">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Trainer Leave Details</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {isLoading && <p className="text-zinc-400">Loading...</p>}

        {leave && (
          <div className="space-y-4 text-sm">
            {leave.isExided && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <div>
                    <p className="font-semibold text-red-400">
                      Allocated Leave Exceeded
                    </p>
                    <p className="mt-1 text-xs text-red-300">
                      {leave.Exidedmessage ||
                        "This trainer has exceeded the allocated leave limit."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="border-b border-zinc-800 pb-3">
              <p className="text-xs text-zinc-400">Trainer</p>
              <p className="font-medium">{leave.trainerDetail.name}</p>
              <p className="text-xs text-zinc-400">
                {leave.trainerDetail.email}
              </p>
            </div>

            <div className="border-b border-zinc-800 pb-3">
              <p className="text-xs text-zinc-400">Branch</p>
              <p>{leave.branchDetail.branchName}</p>
              <p className="text-xs text-zinc-400">
                {leave.branchDetail.city} - {leave.branchDetail.pincode}
              </p>
            </div>

            <div className="border-b border-zinc-800 pb-3">
              <p className="text-xs text-zinc-400">Leave Period</p>
              <p>
                {format(new Date(leave.startDate), "dd MMM yyyy")} —{" "}
                {format(new Date(leave.endDate), "dd MMM yyyy")}
              </p>
            </div>

            <div className="border-b border-zinc-800 pb-3">
              <p className="text-xs text-zinc-400">Leave Count</p>
              <p>{leave.leaveCount}</p>
            </div>

            <div className="border-b border-zinc-800 pb-3">
              <p className="text-xs text-zinc-400">Applied Date</p>
              <p>{format(new Date(leave.appliedDate), "dd MMM yyyy")}</p>
            </div>

            <div className="border-b border-zinc-800 pb-3">
              <p className="text-xs text-zinc-400">Reason</p>
              <p>{leave.reason}</p>
            </div>

            <div className="border-b border-zinc-800 pb-3">
              <p className="text-xs text-zinc-400">Status</p>
              <span
                className={`rounded px-3 py-1 text-xs font-medium ${
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

            {leave.status === "REJECTED" && leave.rejectionReason && (
              <div>
                <p className="text-xs text-zinc-400">Rejection Reason</p>
                <p className="text-red-400">{leave.rejectionReason}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded bg-zinc-700 px-4 py-2 text-sm hover:bg-zinc-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}