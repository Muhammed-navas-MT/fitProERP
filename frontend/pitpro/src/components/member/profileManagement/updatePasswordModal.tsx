import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  UpdateMemberPasswordSchema,
  UpdateMemberPasswordFormValues,
} from "@/validation/udatePasswordValidation";
import { useChangeMemberPassword } from "@/hook/member/profileManagementHook";

interface UpdatePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpdatePasswordModal({ isOpen, onClose }: UpdatePasswordModalProps) {
  const { mutate: updatePassword, isPending } = useChangeMemberPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateMemberPasswordFormValues>({
    resolver: zodResolver(UpdateMemberPasswordSchema),
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen) return null;

  const onSubmit = (data: UpdateMemberPasswordFormValues) => {
    updatePassword(
      { oldPassword: data.oldPassword, newPassword: data.newPassword },
      {
        onSuccess: () => {
          toast.success("Password updated successfully!");
          onClose();
          reset();
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to update password");
        },
      }
    );
  };

  const EyeIcon = ({ isVisible }: { isVisible: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {isVisible ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8 0-.616.078-1.215.225-1.788M12 5c4.418 0 8 3.582 8 8 0 .616-.078 1.215-.225 1.788M3 3l18 18"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      )}
    </svg>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => {
          onClose();
          reset();
        }}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#0b0b0b] border border-neutral-800 shadow-2xl p-6">
        <h2 className="text-xl font-semibold text-white text-center mb-6">
          Update Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Old Password */}
          <div className="space-y-1">
            <label className="text-sm text-gray-400">Old Password</label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                {...register("oldPassword")}
                className="w-full rounded-lg bg-[#111] border border-neutral-700 px-3 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <EyeIcon isVisible={showOld} />
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-xs text-red-500">{errors.oldPassword.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-1">
            <label className="text-sm text-gray-400">New Password</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                {...register("newPassword")}
                className="w-full rounded-lg bg-[#111] border border-neutral-700 px-3 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <EyeIcon isVisible={showNew} />
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-500">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-sm text-gray-400">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                className="w-full rounded-lg bg-[#111] border border-neutral-700 px-3 py-2 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <EyeIcon isVisible={showConfirm} />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                reset();
              }}
              className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-gray-300 hover:bg-neutral-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-50"
            >
              {isPending ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
