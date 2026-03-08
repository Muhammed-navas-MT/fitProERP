import { ReusableTable } from "@/components/shared/reusableTable";
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

interface Props {
  payments: PaymentItem[];
  onView: (payment: PaymentItem) => void;
}

export function PaymentTable({ payments, onView }: Props) {
  const columns = [
    {
      header: "Source",
      render: (row: PaymentItem) => (
        <div>
          <p className="font-medium text-white">{row.source}</p>

          <br />

          {row.sourceDetails.trainerName && (
            <p className="text-xs text-zinc-400">
              Trainer: {row.sourceDetails.trainerName}
            </p>
          )}
        </div>
      ),
    },

    {
      header: "Type",
      render: (row: PaymentItem) => (
        <span className="text-zinc-300">{row.sourceType}</span>
      ),
    },

    {
      header: "Amount",
      render: (row: PaymentItem) => (
        <span className="text-green-400 font-semibold">
          ₹{row.amount.toLocaleString()}
        </span>
      ),
    },

    {
      header: "Method",
      render: (row: PaymentItem) => row.paymentMethod,
    },

    {
      header: "Status",
      render: (row: PaymentItem) => (
        <span className="text-orange-400">{row.status}</span>
      ),
    },

    {
      header: "Date",
      render: (row: PaymentItem) =>
        new Date(row.createdAt).toLocaleDateString(),
    },

    {
      header: "Action",
      render: (row: PaymentItem) => (
        <button
          onClick={() => onView(row)}
          className="text-blue-400 hover:underline"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <ReusableTable
      title="Payment History"
      data={payments}
      columns={columns}
      emptyText="No payments found"
    />
  );
}
