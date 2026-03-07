import { ReusableTable, TableColumn } from "@/components/shared/reusableTable";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export interface IListRevenueItemType {
  id: string;
  branchName: string;
  branchAddress: {
    city: string;
    pincode: string;
  };
  memberName: string;
  email: string;
  source: string;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: Date;
}

interface Props {
  revenues: IListRevenueItemType[];
  onView: (id: string) => void;
}

export function RevenueTable({ revenues, onView }: Props) {
  const columns: TableColumn<IListRevenueItemType>[] = [
    {
      header: "Member",
      render: (rev) => (
        <div>
          <p className="font-medium text-white">{rev.memberName}</p>
          <p className="text-xs text-zinc-400">{rev.email}</p>
        </div>
      ),
    },
    {
      header: "Branch",
      render: (rev) => (
        <div>
          <p className="text-zinc-300">{rev.branchName}</p>
          <p className="text-xs text-zinc-500">
            {rev.branchAddress.city} - {rev.branchAddress.pincode}
          </p>
        </div>
      ),
    },
    {
      header: "Source",
      render: (rev) => (
        <span className="text-zinc-300">{rev.source}</span>
      ),
    },
    {
      header: "Amount",
      render: (rev) => (
        <span className="text-green-400 font-semibold">
          ₹{rev.amount}
        </span>
      ),
    },
    {
      header: "Payment",
      render: (rev) => (
        <span className="text-zinc-300">
          {rev.paymentMethod}
        </span>
      ),
    },
    {
      header: "Status",
      render: (rev) => (
        <span
          className={`rounded px-3 py-1 text-xs font-medium ${
            rev.status === "SUCCESS"
              ? "bg-green-600/20 text-green-400"
              : "bg-red-600/20 text-red-400"
          }`}
        >
          {rev.status}
        </span>
      ),
    },
    {
      header: "Date",
      render: (rev) => (
        <span className="text-zinc-400 text-sm">
          {new Date(rev.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-center",
      render: (rev) => (
        <div className="flex justify-center">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onView(rev.id)}
            className="text-blue-400 hover:bg-blue-500/10"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <ReusableTable
      title="Revenue List"
      data={revenues}
      columns={columns}
      emptyText="No revenue records found"
    />
  );
}