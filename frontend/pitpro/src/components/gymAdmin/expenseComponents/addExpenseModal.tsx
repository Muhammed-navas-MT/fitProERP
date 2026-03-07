import { ExpenseType } from "@/constants/expenseTypes";
import { PaymentMethod } from "@/types/paymentMethod";
import { useCreateExpense } from "@/hook/gymAdmin/expenseHooks";
import { useListActiveBranch } from "@/hook/gymAdmin/branchHooks";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExpenseFormData,
  expenseSchema,
} from "@/validation/expenseValidationSchema";
import { toast } from "sonner";

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddExpenseModal({ open, onClose }: AddExpenseModalProps) {
  const { data: branchResponse } = useListActiveBranch();
  const activeBranches = branchResponse?.data?.branches ?? [];

  const { mutate: createExpense, isPending } = useCreateExpense();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),

    defaultValues: {
      amount: 0,
      description: "",
      paymentMethod: PaymentMethod.CASH,
      expenseType: ExpenseType.OTHER,
      paymentDate: new Date(),
      branchId: "",
    },
  });

  if (!open) return null;

  const onSubmit = (data: ExpenseFormData) => {
    createExpense(data, {
      onSuccess: () => {
        toast.success("Expense added successfully");
        reset();
        onClose();
      },
      onError: (error) => {
        const message = error.message || "Failed to create expense";
        toast.error(message);
      },
    });
  };

  const handleClose = ()=> {
    reset();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-full max-w-lg rounded-xl border border-zinc-800 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white">Add Expense</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Branch */}
          <div>
            <label className="text-sm text-zinc-400">Branch</label>
            <select
              {...register("branchId")}
              className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white"
            >
              <option value="">Select branch</option>

              {activeBranches.map(
                (branch: {
                  id: string;
                  branchName: string;
                  address: string;
                }) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branchName} - {branch.address}
                  </option>
                ),
              )}
            </select>

            {errors.branchId && (
              <p className="text-red-400 text-xs mt-1">
                {errors.branchId.message}
              </p>
            )}
          </div>

          {/* Expense Type */}
          <div>
            <label className="text-sm text-zinc-400">Expense Type</label>
            <select
              {...register("expenseType")}
              className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white"
            >
              {Object.values(ExpenseType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {errors.expenseType && (
              <p className="text-red-400 text-xs mt-1">
                {errors.expenseType.message}
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm text-zinc-400">Amount</label>
            <input
              type="number"
              {...register("amount", { valueAsNumber: true })}
              className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white"
            />

            {errors.amount && (
              <p className="text-red-400 text-xs mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-sm text-zinc-400">Payment Method</label>
            <select
              {...register("paymentMethod")}
              className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white"
            >
              {Object.values(PaymentMethod).map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>

            {errors.paymentMethod && (
              <p className="text-red-400 text-xs mt-1">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>

          {/* Payment Date */}
          <div>
            <label className="text-sm text-zinc-400">Payment Date</label>

            <input
              type="date"
              onChange={(e) =>
                setValue("paymentDate", new Date(e.target.value))
              }
              className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white"
            />

            {errors.paymentDate && (
              <p className="text-red-400 text-xs mt-1">
                {errors.paymentDate.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-zinc-400">Description</label>

            <textarea
              {...register("description")}
              className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white"
            />

            {errors.description && (
              <p className="text-red-400 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={()=>handleClose()}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-sm font-medium"
            >
              {isPending ? "Saving..." : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
