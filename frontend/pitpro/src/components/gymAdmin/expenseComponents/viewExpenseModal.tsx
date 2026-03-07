import { format } from "date-fns";
import {
  Building2,
  MapPin,
  User,
  Mail,
  CreditCard,
  CalendarDays,
  FileText,
  Tag,
  Clock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExpenseType } from "@/constants/expenseTypes";
import { PaymentMethod } from "@/types/paymentMethod";
import { useFindExpenseDetail } from "@/hook/gymAdmin/expenseHooks";

export interface IExpenseItem {
  id: string;
  branch: {
    branchName: string;
    city: string;
    pincode: string;
  };
  expenseType: ExpenseType;
  description?: string;
  createdBy: {
    model: string;
    email: string;
  };
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: Date;
  status: string;
  createdAt: Date;
}

interface ExpenseModalProps {
  expenseId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "pending":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "rejected":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "paid":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    default:
      return "bg-zinc-800 text-zinc-400 border-zinc-700";
  }
};

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2 py-1.5">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-800">
        <Icon className="h-3.5 w-3.5 text-zinc-400" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-zinc-400">{label}</p>
        <p className="text-sm font-medium text-white truncate">{value}</p>
      </div>
    </div>
  );
}

export function ViewExpenseModal({
  expenseId,
  open,
  onOpenChange,
}: ExpenseModalProps) {
  const { data, isLoading } = useFindExpenseDetail(expenseId);
  const expense: IExpenseItem | undefined = data?.data;

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border border-zinc-800 bg-zinc-900 p-0">
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold text-white">
              Expense Details
            </DialogTitle>

            {isLoading ? (
              <DialogDescription className="text-xs text-zinc-400">
                Loading expense...
              </DialogDescription>
            ) : (
              <>
              </>
            )}
          </DialogHeader>

          {!isLoading && expense && (
            <div className="mt-3 flex items-center justify-between rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2">
              <div>
                <p className="text-[11px] text-zinc-400">Total Amount</p>
                <p className="text-xl font-bold text-orange-400">
                  ₹{expense!.amount.toLocaleString("en-IN")}
                </p>
              </div>

              <Badge
                className={`${statusColor(expense!.status)} rounded-md text-xs`}
              >
                {expense!.status}
              </Badge>
            </div>
          )}
        </div>

        {!isLoading && expense && (
          <>
            <Separator className="bg-zinc-800" />
            

            {/* Details */}
            <div className="px-5 py-3 grid grid-cols-2 gap-x-4">

              <DetailRow
                icon={Tag}
                label="Expense Type"
                value={expense.expenseType}
              />
              <DetailRow
                icon={CreditCard}
                label="Payment Method"
                value={expense.paymentMethod}
              />

              <DetailRow
                icon={CalendarDays}
                label="Payment Date"
                value={format(new Date(expense.paymentDate), "dd MMM yyyy")}
              />

              <DetailRow
                icon={Clock}
                label="Created At"
                value={format(
                  new Date(expense.createdAt),
                  "dd MMM yyyy, hh:mm a",
                )}
              />
            </div>

            <Separator className="bg-zinc-800" />

            {/* Branch */}
            <div className="px-5 py-3">
              <p className="text-[11px] uppercase tracking-wider text-orange-600  mb-1">
                Branch Information
              </p>

              <div className="grid grid-cols-2 gap-x-4">
                <DetailRow
                  icon={Building2}
                  label="Branch"
                  value={expense.branch.branchName}
                />

                <DetailRow
                  icon={MapPin}
                  label="Location"
                  value={`${expense.branch.city} — ${expense.branch.pincode}`}
                />
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            {/* Created by */}
            <div className="px-5 py-3">
              <p className="text-[11px] uppercase tracking-wider text-orange-600  mb-1">
                Created By
              </p>

              <div className="grid grid-cols-2 gap-x-4">
                <DetailRow
                  icon={User}
                  label="Model"
                  value={expense.createdBy.model}
                />
                <DetailRow
                  icon={Mail}
                  label="Email"
                  value={expense.createdBy.email}
                />
              </div>
            </div>

            {expense.description && (
              <>
                <Separator className="bg-zinc-800" />

                <div className="px-5 py-3 pb-4">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-zinc-800">
                      <FileText className="h-3.5 w-3.5 text-zinc-400" />
                    </div>

                    <div>
                      <p className="text-[11px] text-zinc-400">Description</p>
                      <p className="text-sm text-white mt-0.5">
                        {expense.description}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
