import { BaseModal } from "@/components/shared/baseModal";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateLeave } from "@/hook/trainer/leaveHook";

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

interface AddLeaveModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddLeaveModal({ open, onClose }: AddLeaveModalProps) {
  const { mutateAsync: createLeave, isPending } = useCreateLeave();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
  });

  const onSubmit = async (data: LeaveFormData) => {
  try {
    await createLeave({
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    });

    toast.success("Leave request submitted");

    reset();
    onClose();
  } catch (error) {
    toast.error((error as Error).message || "Failed to submit leave");
  }
};

  return (
    <BaseModal isOpen={open} onClose={onClose} title="Apply for Leave">
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
            placeholder="Enter reason for leave..."
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
            {isPending ? "Submitting..." : "Submit"}
          </button>

        </div>

      </form>
    </BaseModal>
  );
}