import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateMemberProfileSchema,
  UpdateMemberProfileFormValues,
} from "@/validation/updateMemberProfileValidation";
import { MemberDTO } from "./healthDetailsTab";
import { mapMemberToUpdateForm } from "@/utils/mapMemberToUpdateForm";
import { useUpdateMemberProfile } from "@/hook/member/profileManagementHook";
import { toast } from "sonner";

interface UpdateProfileModalProps {
  member: MemberDTO;
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateProfileModal({
  member,
  isOpen,
  onClose,
}: UpdateProfileModalProps) {
  const updateProfileMutation = useUpdateMemberProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateMemberProfileFormValues>({
    resolver: zodResolver(UpdateMemberProfileSchema),
    defaultValues: mapMemberToUpdateForm(member),
  });

  const onSubmit = (formData: UpdateMemberProfileFormValues) => {
    updateProfileMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        onClose(); // ✅ close AFTER success
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to update profile");
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Centered modal */}
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-gray-800 shadow-2xl rounded-xl p-6 overflow-y-auto max-h-[90vh] z-10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Update Profile
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 text-white"
        >
          {/* Personal Info */}
          <h3 className="font-semibold text-lg mb-2">Personal Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Name</label>
              <input
                {...register("name")}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Phone</label>
              <input
                {...register("phone")}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">Emergency Number</label>
              <input
                {...register("emergencyNumber")}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
              />
              {errors.emergencyNumber && (
                <p className="text-red-500 text-sm">
                  {errors.emergencyNumber.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1">Address</label>
              <input
                {...register("address")}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
          </div>

          {/* Health Details */}
          <h3 className="font-semibold text-lg mt-4 mb-2">Health Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Gender</label>
              <select
                {...register("healthDetails.gender")}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                {...register("healthDetails.dateOfBirth")}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
              />
            </div>

            <div>
              <label>Weight (kg)</label>
              <input
                {...register("healthDetails.weight")}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
              />
            </div>

            <div>
              <label>Height (cm)</label>
              <input
                {...register("healthDetails.height")}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
              />
            </div>

            <div>
              <label>Target Weight (kg)</label>
              <input
                {...register("healthDetails.targetWeight")}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
              />
            </div>

            <div className="md:col-span-2">
              <label>Medical Conditions</label>
              <textarea
                {...register("healthDetails.medicalConditions")}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
              />
            </div>

            <div className="md:col-span-2">
              <label>Allergies</label>
              <textarea
                {...register("healthDetails.allergies")}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1">Fitness Goal</label>
              <select
                {...register("healthDetails.fitnessGoal")}
                className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700"
              >
                <option value="">Select fitness goal</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="general-fitness">General Fitness</option>
                <option value="endurance">Endurance</option>
                <option value="flexibility">Flexibility</option>
              </select>

              {errors.healthDetails?.fitnessGoal && (
                <p className="text-red-500 text-sm">
                  {errors.healthDetails.fitnessGoal.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-600 hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="px-4 py-2 rounded bg-orange-600 hover:bg-orange-500 font-semibold disabled:opacity-50"
            >
              {updateProfileMutation.isPending
                ? "Updating..."
                : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
