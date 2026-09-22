import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AdminTable,
  type AdminTableColumn,
} from "@/components/gymAdmin/ui/AdminTable";
import { StatusBadge } from "@/components/gymAdmin/ui/StatusBadge";
import { adminIconBtn } from "@/components/gymAdmin/ui/adminUi";

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
  const columns: AdminTableColumn<IListRevenueItemType>[] = [
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
        <span className="font-semibold text-green-400">
          ₹{rev.amount.toLocaleString()}
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
        <StatusBadge
          status={rev.status}
          tone={rev.status === "SUCCESS" ? "success" : "danger"}
        />
      ),
    },
    {
      header: "Date",
      render: (rev) => (
        <span className="text-sm text-zinc-400">
          {new Date(rev.createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-center",
      render: (rev) => (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => onView(rev.id)}
            className={cn(adminIconBtn, "hover:text-blue-400")}
            aria-label="View revenue record"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminTable
      title="Revenue List"
      data={revenues}
      columns={columns}
      rowKey={(rev) => rev.id}
      emptyText="No revenue records found"
    />
  );
}