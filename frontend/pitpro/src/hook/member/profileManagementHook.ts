import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  viewMemberProfileService,
  updateMemberProfileService,
  updateMemberPasswordService,
  uploacdProfilePicturedService,
  deleteProfilePicturedService,
} from "@/services/member/profileManagementServices";
import { UpdateMemberProfileFormValues } from "@/validation/updateMemberProfileValidation";
import { MemberDTO } from "@/components/member/profileManagement/healthDetailsTab";

export const memberQueryKeys = {
  profile: ["member-profile"] as const,
};


export const useViewMemberProfile = () => {
  return useQuery({
    queryKey: memberQueryKeys.profile,
    queryFn: viewMemberProfileService,
  });
};

export const useUpdateMemberProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateMemberProfileFormValues) =>
      updateMemberProfileService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.profile,
      });
    },
  });
};

export const useChangeMemberPassword = () => {
  return useMutation({
    mutationFn: updateMemberPasswordService,
  });
};

export const useUploadProfilePicture = () => {
  const queryClient = useQueryClient()
  console.log("khgjghjkghjg")
  return useMutation({
    mutationFn: (file: FormData) => uploacdProfilePicturedService(file),

    onSuccess: (data) => {
      queryClient.setQueryData<MemberDTO>(
        memberQueryKeys.profile,
        (old) => {
          if (!old) return old
          return {
            ...old,
            profileImg: data.image,
          }
        }
      )
    },
  })
}

export const useDeleteProfilePicture = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProfilePicturedService,

    onSuccess: () => {
      queryClient.setQueryData<MemberDTO>(
        memberQueryKeys.profile,
        (old) => {
          if (!old) return old
          return {
            ...old,
            profileImg:"",
          }
        }
      )
    },
  })
}
