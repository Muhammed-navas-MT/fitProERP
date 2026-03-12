import React, { useEffect } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { BaseModal } from "@/components/shared/baseModal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateLeave } from "@/hook/trainer/leaveHook";

/* ---------------- Zod Schema ---------------- */

const leaveSchema = z
  .object({
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    reason: z.string().min(3, "Reason must be at least 3 characters"),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

type LeaveFormData = z.infer<typeof leaveSchema>;

interface LeaveData {
  id: string;
  startDate: Date;
  endDate: Date;
  reason: string;
}

interface UpdateLeaveModalProps {
  open: boolean;
  onClose: () => void;
  leave: LeaveData | null;
}

 function UpdateLeaveModal({
  open,
  onClose,
  leave,
}: UpdateLeaveModalProps) {

  const { mutateAsync: updateLeave, isPending } = useUpdateLeave(leave?.id as string);
  console.log(leave,"udpate modal")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
  });

  /* ---------------- Prefill form ---------------- */

  useEffect(() => {
    if (leave) {
      reset({
        startDate: format(new Date(leave.startDate), "yyyy-MM-dd"),
        endDate: format(new Date(leave.endDate), "yyyy-MM-dd"),
        reason: leave.reason,
      });
    }
  }, [leave, reset]);

  /* ---------------- Submit ---------------- */

  const onSubmit = async (data: LeaveFormData) => {
    if (!leave) return;

    try {
      await updateLeave({
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          reason: data.reason
      });

      toast.success("Leave updated successfully");
      onClose();
    } catch (error) {
      toast.error((error as Error).message || "Failed to update leave");
    }
  };

  if (!leave) return null;

  return (
    <BaseModal isOpen={open} onClose={onClose} title="Update Leave">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Start Date */}

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            Start Date
          </label>

          <input
            type="date"
            {...register("startDate")}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-purple-500 transition"
          />

          {errors.startDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>

        {/* End Date */}

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            End Date
          </label>

          <input
            type="date"
            {...register("endDate")}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-purple-500 transition"
          />

          {errors.endDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>

        {/* Reason */}

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            Reason
          </label>

          <textarea
            rows={3}
            {...register("reason")}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-purple-500 transition resize-none"
          />

          {errors.reason && (
            <p className="text-red-500 text-xs mt-1">
              {errors.reason.message}
            </p>
          )}
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-3 pt-2">

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition disabled:opacity-60"
          >
            {isPending ? "Updating..." : "Update"}
          </button>

        </div>

      </form>
    </BaseModal>
  );
}

export default React.memo(UpdateLeaveModal)