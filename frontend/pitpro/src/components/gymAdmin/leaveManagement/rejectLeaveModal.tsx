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
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-4 z-50">
      <div className="bg-zinc-900 p-4 sm:p-6 rounded-lg w-full max-w-[400px] max-h-[85vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">
          Reject Leave
        </h2>

        <textarea
          placeholder="Enter rejection reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 bg-black border border-zinc-700 rounded"
        />

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-3 py-1.5 rounded text-zinc-300 hover:bg-zinc-800">Cancel</button>

          <button
            onClick={() => {
              onSubmit(reason);
              setReason("");
            }}
            className="bg-red-500 px-3 py-1.5 rounded hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}