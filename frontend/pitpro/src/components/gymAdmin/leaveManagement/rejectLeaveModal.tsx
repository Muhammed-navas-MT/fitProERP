import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

export default function RejectLeaveModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  const [reason, setReason] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="bg-zinc-900 p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-semibold mb-4">
          Reject Leave
        </h2>

        <textarea
          placeholder="Enter rejection reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 bg-black border border-zinc-700 rounded"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={() => {
              onSubmit(reason);
              setReason("");
            }}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}