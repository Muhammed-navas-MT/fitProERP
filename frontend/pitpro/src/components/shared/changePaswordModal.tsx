import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseModal } from "./baseModal";
import { UpdateMemberPasswordFormValues, UpdateMemberPasswordSchema } from "@/validation/udatePasswordValidation";
import { Eye, EyeOff } from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateMemberPasswordFormValues) => void;
  primaryButtonClass?: string;
}

export function ChangePasswordModal({
  isOpen,
  onClose,
  onSubmit,
  primaryButtonClass = "bg-orange-500 hover:bg-orange-800",
}: ChangePasswordModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateMemberPasswordFormValues>({
    resolver: zodResolver(UpdateMemberPasswordSchema),
    defaultValues: {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
  });

  useEffect(() => {
  if (isOpen) {
    reset({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }
}, [isOpen, reset]);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen) return null;

  const handleFormSubmit = (data: UpdateMemberPasswordFormValues) => {
    onSubmit(data);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Change Password"
      containerClassName="bg-black border-black"
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Old Password */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              {...register("oldPassword")}
              className="w-full px-3 py-2 bg-zinc-900 border border-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-2 inset-y-0 flex items-center text-zinc-400"
            >
              {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message as string}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              {...register("newPassword")}
              className="w-full px-3 py-2 bg-zinc-900 border border-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-2 inset-y-0 flex items-center text-zinc-400"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message as string}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword")}
              className="w-full px-3 py-2 bg-zinc-900 border border-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2 inset-y-0 flex items-center text-zinc-400"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message as string}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            type="submit"
            className={`flex-1 px-4 py-2 text-white rounded-md transition-colors ${primaryButtonClass}`}
          >
            Update Password
          </button>
        </div>
      </form>
    </BaseModal>
  );
}