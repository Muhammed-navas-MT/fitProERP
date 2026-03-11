 enum LeaveStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  APPROVED = "APPROVED",
}

const badgeStyles: Record<LeaveStatus, string> = {
  [LeaveStatus.PENDING]: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  [LeaveStatus.APPROVED]: "bg-green-500/10 text-green-400 border-green-500/30",
  [LeaveStatus.REJECTED]: "bg-red-500/10 text-red-400 border-red-500/30",
};

export function LeaveStatusBadge({ status }: { status: LeaveStatus }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${badgeStyles[status]}`}
    >
      {status}
    </span>
  );
}
