import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  updateGymAdminPasswordService,
  updateGymAdminProfileService,
  viewGymAdminProfileService
} from "@/services/gymAdmin/profileService"

export const useViewGymAdminProfile = () => {
  return useQuery({
    queryKey: ['gym-admin-profile'],
    queryFn: viewGymAdminProfileService,
  })
}

export const useUpdateGymAdminProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: FormData) =>
      updateGymAdminProfileService(data),

    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(['gym-admin-profile'], updatedProfile)
      toast.success("Profile updated successfully")
    },

    onError: (err) => {
      console.error("Profile update failed:", err)
      toast.error(err?.message || "Failed to update profile")
    },
  })
}

export const useUpdateGymAdminPassword = () => {
  return useMutation({
    mutationFn: (data: { oldPassword: string; newPassword: string }) =>
      updateGymAdminPasswordService(data),

    onSuccess: () => {
      toast.success("Password updated successfully")
    },

    onError: (err) => {
      console.error("Password update failed:", err)
      toast.error(err?.message || "Failed to update password")
    },
  })
}
