import { useState, useEffect } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { BaseModal } from "@/components/shared/baseModal";

interface LeaveData {
  id: string;
  startDate: Date;
  endDate: Date;
  reason: string;
}

interface UpdateLeaveModalProps {
  open: boolean;
  onClose: () => void;
  leave: LeaveData | null;
  onUpdate: (id: string, data: { startDate: string; endDate: string; reason: string }) => void;
}

export function UpdateLeaveModal({ open, onClose, leave, onUpdate }: UpdateLeaveModalProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (leave) {
      setStartDate(format(leave.startDate, "yyyy-MM-dd"));
      setEndDate(format(leave.endDate, "yyyy-MM-dd"));
      setReason(leave.reason);
    }
  }, [leave]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leave) return;
    if (!startDate || !endDate || !reason.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      toast.error("End date must be after start date");
      return;
    }
    onUpdate(leave.id, { startDate, endDate, reason });
    onClose();
    toast.success("Leave updated successfully");
  };

  if (!leave) return null;

  return (
    <BaseModal isOpen={open} onClose={onClose} title="Update Leave">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-purple-500 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-purple-500 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-purple-500 transition resize-none"
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition"
          >
            Update
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
