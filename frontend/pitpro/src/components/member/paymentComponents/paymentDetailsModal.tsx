import { PaymentMethod } from "@/types/paymentMethod";

export interface PaymentItem {
  id: string;
  source: string;
  sourceType: string;
  sourceDetails: {
    planName?: string;
    duration?: string;
    trainerName?: string;
    sessionDate?: Date;
  };

  amount: number;
  paymentMethod: PaymentMethod;
  status: string;
  createdAt: Date;
}

interface PaymentDetailsModalProps {
  payment: PaymentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentDetailsModal({
  payment,
  isOpen,
  onClose,
}: PaymentDetailsModalProps) {
  if (!isOpen || !payment) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 ">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-lg p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-orange-600">
            Payment Details
          </h2>

          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3 text-sm">
          <Detail label="Source" value={payment.source} />

          <Detail label="Source Type" value={payment.sourceType} />

          {payment.sourceDetails.planName && (
            <Detail label="Plan Name" value={payment.sourceDetails.planName} />
          )}

          {payment.sourceDetails.duration && (
            <Detail label="Duration" value={payment.sourceDetails.duration} />
          )}

          {payment.sourceDetails.trainerName && (
            <Detail label="Trainer" value={payment.sourceDetails.trainerName} />
          )}

          {payment.sourceDetails.sessionDate && (
            <Detail
              label="Session Date"
              value={new Date(
                payment.sourceDetails.sessionDate,
              ).toLocaleDateString()}
            />
          )}

          <Detail label="Amount" value={`₹${payment.amount}`} />

          <Detail label="Payment Method" value={payment.paymentMethod} />

          <Detail label="Status" value={payment.status} />

          <Detail
            label="Created At"
            value={new Date(payment.createdAt).toLocaleDateString()}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-zinc-800 border border-zinc-700 rounded-md hover:bg-zinc-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-zinc-800 pb-2">
      <span className="text-zinc-400">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}
