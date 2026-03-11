import { BaseModal } from "@/components/shared/baseModal";
import { format } from "date-fns";

enum LeaveStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  APPROVED = "APPROVED",
}


interface LeaveData {
  id: string;
  startDate: Date;
  endDate: Date;
  status: LeaveStatus;
  reason: string;
  rejectionReason?: string;
  appliedDate: Date;
}

interface ViewLeaveModalProps {
  open: boolean;
  onClose: () => void;
  leave: LeaveData | null;
}

const statusColors: Record<LeaveStatus, string> = {
  [LeaveStatus.PENDING]: "text-yellow-400",
  [LeaveStatus.APPROVED]: "text-green-400",
  [LeaveStatus.REJECTED]: "text-red-400",
};

export function ViewLeaveModal({ open, onClose, leave }: ViewLeaveModalProps) {
  if (!leave) return null;

  const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-zinc-500 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-white">{value}</span>
    </div>
  );

  return (
    <BaseModal isOpen={open} onClose={onClose} title="Leave Details">
      <div className="space-y-4">
        <InfoRow label="Applied Date" value={format(leave.appliedDate, "dd MMM yyyy")} />
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Start Date" value={format(leave.startDate, "dd MMM yyyy")} />
          <InfoRow label="End Date" value={format(leave.endDate, "dd MMM yyyy")} />
        </div>
        <InfoRow
          label="Status"
          value={
            <span className={`font-medium capitalize ${statusColors[leave.status]}`}>
              {leave.status}
            </span>
          }
        />
        <InfoRow label="Reason" value={leave.reason} />
        {leave.rejectionReason && (
          <InfoRow
            label="Rejection Reason"
            value={<span className="text-red-400">{leave.rejectionReason}</span>}
          />
        )}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
