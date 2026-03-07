import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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
  open: boolean;
  onClose: () => void;
  revenue: IListRevenueItemType | null;
}

export function ViewRevenueModal({ open, onClose, revenue }: Props) {
  if (!revenue) return null;

  const isSuccess = revenue.status === "SUCCESS";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
        bg-zinc-950 border border-zinc-800
        text-white max-w-xl p-0
        data-[state=open]:animate-in
        data-[state=open]:fade-in-0
        data-[state=open]:zoom-in-95
        duration-200
      "
      >
        {/* Header */}
        <div className="bg-orange-600 px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold tracking-wide">
            Revenue Details
          </h2>
        </div>

        {/* Status Row */}
        <div className="px-6 pt-4 flex justify-end">
          <Badge
            className={`text-xs px-3 py-1 ${
              isSuccess
                ? "bg-green-600/20 text-green-400"
                : "bg-red-600/20 text-red-400"
            }`}
          >
            {revenue.status}
          </Badge>
        </div>

        {/* Body */}
        <div className="px-6 py-5 text-sm space-y-5 font-medium">

          {/* Amount */}
          <div className="text-center">
            <p className="text-zinc-400 text-xs uppercase tracking-wider">
              Total Amount
            </p>
            <p className="text-3xl font-bold text-green-400 mt-1">
              ₹{revenue.amount}
            </p>
          </div>

          <div className="h-px bg-zinc-800" />

          {/* Member */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-zinc-500 text-xs">Member</p>
              <p>{revenue.memberName}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs">Email</p>
              <p>{revenue.email}</p>
            </div>
          </div>

          <div className="h-px bg-zinc-800" />

          {/* Branch */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-zinc-500 text-xs">Branch</p>
              <p>{revenue.branchName}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs">Location</p>
              <p>
                {revenue.branchAddress.city} -{" "}
                {revenue.branchAddress.pincode}
              </p>
            </div>
          </div>

          <div className="h-px bg-zinc-800" />

          {/* Payment */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-zinc-500 text-xs">Source</p>
              <p>{revenue.source}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs">Method</p>
              <p>{revenue.paymentMethod}</p>
            </div>
            <div className="col-span-2">
              <p className="text-zinc-500 text-xs">Transaction ID</p>
              <p className="break-all text-zinc-300">
                {revenue.id}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-zinc-500 text-xs">Date</p>
              <p>
                {new Date(revenue.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}