import { InputField } from "@/components/trainer/profileMangement/profileInputField";
import ProfileSkeleton from "@/components/trainer/profileMangement/profileSkeleton";
import { Header } from "@/components/trainer/trainerHeader";
import { Sidebar } from "@/components/trainer/trainerSidebar";
import { Button } from "@/components/ui/button";
import { useUpdateTrainerpassword, useViewTrainerProfile } from "@/hook/trainer/profileMangementHook";
import { Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useUpdateTrainerProfile } from "@/hook/trainer/profileMangementHook";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateTrainerProfileSchema,
  UpdateTrainerProfileInput,
} from "@/validation/updateTrainerProfileValidation";
import { UpdateTrainerPasswordInput, updateTrainerPasswordSchema } from "@/validation/passwordChangeValidation";

interface ProfileData {
  id: string;
  gymId: string;
  branchId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  specialization: string[];
  experience: number;
  baseSalary: number;
  commisionRate: number;
  status: string;
  dutyTime: {
    startTime: string;
    endTime: string;
  };
  address: string;
  createdAt: Date;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const { data, isLoading, refetch } = useViewTrainerProfile();
  const { mutate: updateProfile, isPending } = useUpdateTrainerProfile();
  const {
  register: registerPassword,
  handleSubmit: handleSubmitPassword,
  formState: { errors: passwordErrors },
  reset: resetPasswordForm,
} = useForm<UpdateTrainerPasswordInput>({
  resolver: zodResolver(updateTrainerPasswordSchema),
});

const { mutate: updatePassword, isLoading:isUpdatingPassword } = useUpdateTrainerpassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateTrainerProfileInput>({
    resolver: zodResolver(updateTrainerProfileSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name,
        phone: data.data.phone,
        address: data.data.address,
      });
    }
  }, [data, reset]);

  if (isLoading || !data?.data) {
    return (
      <div className="flex min-h-screen bg-[#0f0f0f]">
        <Sidebar />
        <div className="flex-1 lg:ml-[220px] p-6">
          <ProfileSkeleton />
        </div>
      </div>
    );
  }

  const profileData: ProfileData = data.data;

  const handleCancel = () => {
    reset({
      name: profileData.name,
      phone: profileData.phone,
      address: profileData.address,
    });
    setIsEditing(false);
  };

  const getMonthsSinceJoined = () => {
    const joined = new Date(profileData.createdAt);
    const now = new Date();
    const months =
      (now.getFullYear() - joined.getFullYear()) * 12 +
      (now.getMonth() - joined.getMonth());
    return months > 0 ? `${months} months` : "New Trainer";
  };

  const onSubmit = (formData: UpdateTrainerProfileInput) => {
    const updatedData = {
      id: profileData.id,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
    };

    updateProfile(updatedData, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        setIsEditing(false);
        refetch();
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to update profile");
      },
    });
  };

  const onPasswordSubmit = (data: UpdateTrainerPasswordInput) => {
  updatePassword(
    { oldPassword: data.currentPassword, newPassword: data.newPassword },
    {
      onSuccess: () => {
        toast.success("Password updated successfully");
        setShowPasswordModal(false);
        resetPasswordForm();
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to update password");
      },
    }
  );
};

  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      <Sidebar />
      <div className="flex-1 lg:ml-[220px] flex flex-col">
        <Header
          avatar={profileData.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
          title="Profile"
          subtitle="Manage your personal information"
        />

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {profileData.name}
                    </h2>
                    <p className="text-sm text-gray-400">{profileData.role}</p>
                    <span className="inline-block mt-1 text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-md border border-purple-500/30">
                      ID: {profileData.id}
                    </span>
                  </div>
                </div>

                <div className="flex gap-8">
                  <div>
                    <p className="text-xs text-gray-400">Salary</p>
                    <p className="text-lg font-semibold text-white">
                      ₹{profileData.baseSalary.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Commission</p>
                    <p className="text-lg font-semibold text-white">
                      {profileData.commisionRate}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-400">Joined</p>
                    <p className="text-lg font-semibold text-white">
                      {getMonthsSinceJoined()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <p className="text-xs text-gray-400">Experience</p>
                <p className="text-lg font-semibold text-white">
                  {profileData.experience} Years
                </p>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 md:col-span-2">
                <p className="text-sm font-semibold text-white mb-2">
                  Specializations
                </p>
                <div className="flex flex-wrap gap-2">
                  {profileData.specialization.map((spec, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs border border-purple-500/30"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 md:col-span-2">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <p className="text-lg font-semibold text-white">
                    {profileData.dutyTime.startTime} -{" "}
                    {profileData.dutyTime.endTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Personal & Professional Information
                  </h2>
                  <p className="text-sm text-gray-400">
                    Your basic personal details
                  </p>
                </div>

                {!isEditing && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => setShowPasswordModal(true)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Change Password
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  editable={isEditing}
                  {...register("name")}
                  error={errors.name?.message}
                />

                <InputField
                  label="Phone"
                  editable={isEditing}
                  {...register("phone")}
                  error={errors.phone?.message}
                />

                <InputField
                  label="Email"
                  value={profileData.email}
                  editable={false}
                />
                <InputField
                  label="Role"
                  value={profileData.role}
                  editable={false}
                />

                <InputField
                  label="Address"
                  editable={isEditing}
                  full
                  {...register("address")}
                  error={errors.address?.message}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 mt-6">
                  <Button onClick={handleCancel} className="bg-gray-700">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    className="bg-purple-500"
                    disabled={isPending}
                  >
                    {isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">
              Change Password
            </h3>

            <form
              onSubmit={handleSubmitPassword(onPasswordSubmit)}
              className="flex flex-col gap-3"
            >
              <input
                type="password"
                placeholder="Current password"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-4 py-2 text-gray-300"
                {...registerPassword("currentPassword")}
              />
              {passwordErrors.currentPassword && (
                <p className="text-red-500 text-xs">
                  {passwordErrors.currentPassword.message}
                </p>
              )}

              <input
                type="password"
                placeholder="New password"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-4 py-2 text-gray-300"
                {...registerPassword("newPassword")}
              />
              {passwordErrors.newPassword && (
                <p className="text-red-500 text-xs">
                  {passwordErrors.newPassword.message}
                </p>
              )}

              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg px-4 py-2 text-gray-300"
                {...registerPassword("confirmPassword")}
              />
              {passwordErrors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {passwordErrors.confirmPassword.message}
                </p>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  className="bg-gray-700"
                  onClick={() => {
                    setShowPasswordModal(false);
                    resetPasswordForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-purple-500"
                  disabled={isUpdatingPassword}
                >
                  {isUpdatingPassword ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
