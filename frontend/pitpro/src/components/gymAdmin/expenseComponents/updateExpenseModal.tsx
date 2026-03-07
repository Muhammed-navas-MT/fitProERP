import { useEffect } from "react";
import { ExpenseType } from "@/constants/expenseTypes";
import { PaymentMethod } from "@/types/paymentMethod";

import { useFindExpense, useUpdateExpense } from "@/hook/gymAdmin/expenseHooks";
import { useListActiveBranch } from "@/hook/gymAdmin/branchHooks";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  updateExpenseSchema,
  UpdateExpenseFormData,
} from "@/validation/expenseValidationSchema";

import { toast } from "sonner";

interface UpdateExpenseProps {
  open: boolean;
  expenseId: string;
  onClose: () => void;
}

export default function UpdateExpenseModal({
  open,
  expenseId,
  onClose,
}: UpdateExpenseProps) {
  const { data: expenseResponse, isLoading } = useFindExpense(expenseId);
  const expense = expenseResponse?.data;

  const { data: branchResponse } = useListActiveBranch();
  const activeBranches = branchResponse?.data?.branches ?? [];

  const { mutate: updateExpense, isPending } = useUpdateExpense(expenseId);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateExpenseFormData>({
    resolver: zodResolver(updateExpenseSchema),
  });

  useEffect(() => {
    if (expense) {
      reset({
        branchId: expense.branchId,
        expenseType: expense.expenseType,
        description: expense.description ?? "",
        amount: expense.amount,
        paymentMethod: expense.paymentMethod,
        paymentDate: new Date(expense.paymentDate),
      });
    }
  }, [expense, reset]);

  if (!open) return null;
  if (isLoading) return null;

  const onSubmit = (data: UpdateExpenseFormData) => {
    updateExpense(data, {
      onSuccess: () => {
        toast.success("Expense updated successfully");
        handleClose();
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to update expense");
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 w-full max-w-lg rounded-xl border border-zinc-800 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white">Update Expense</h2>

          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-white"
          >
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
              max={new Date().toISOString().split("T")[0]}
              defaultValue={
                expense?.paymentDate
                  ? new Date(expense.paymentDate).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setValue("paymentDate", new Date(e.target.value), {
                  shouldValidate: true,
                })
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
              onClick={handleClose}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-sm font-medium"
            >
              {isPending ? "Updating..." : "Update Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}