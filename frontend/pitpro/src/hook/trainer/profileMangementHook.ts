import { updateTrainerPasswordService, updateTrainerProfileService, viewTrainerProfileService } from "@/services/trainer/profileManagementService"
import { UpdateTrainerProfileInput } from "@/validation/updateTrainerProfileValidation"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useViewTrainerProfile = () => {
  return useQuery({
    queryKey: ['trainer-profile'],
    queryFn: viewTrainerProfileService,
  })
}

export const useUpdateTrainerProfile = () => {
  return useMutation({
    mutationFn: (data: UpdateTrainerProfileInput) =>
      updateTrainerProfileService(data),
  })
}

export const useUpdateTrainerpassword = () => {
  return useMutation({
    mutationFn: (data:{oldPassword:string;newPassword:string}) =>
      updateTrainerPasswordService(data),
  })
}

