import {
  addMemberService,
  blockMemberService,
  findMemberService,
  getAllActiveBranches,
  getAllActiveTrainers,
  getAllActiveTrainersByBranch,
  getMembersService,
  unBlockMemberService,
  updateMemberService,
} from "@/services/trainer/memberService";
import { MemberAddPayload } from "@/types/authPayload";
import { Member } from "@/types/trainer/memberType";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const QUERY_KEYS = {
  MEMBERS: "members",
  MEMBER: "member",
  ACTIVE_TRAINERS: "active-trainers",
  ACTIVE_BRANCH: "active-branches",
};


export const useGetAllMembers = (page: number, search: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MEMBERS, page, search],
    queryFn: () => getMembersService(page, search),
    placeholderData: keepPreviousData,
  });
};

export const useAddMember = (page:number,search:string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MemberAddPayload) => addMemberService(data),
    onSuccess: (newMember) => {
      queryClient.setQueryData<{ data: { data: Member[] } } | undefined>(
        [QUERY_KEYS.MEMBERS,page,search],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: [newMember.data as Member, ...oldData.data.data],
            },
          };
        }
      );
    },
  });
};

export const useFindMember = (memberId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MEMBER, memberId],
    queryFn: () => findMemberService(memberId),
    enabled: !!memberId,
  });
};

export const useUpdateMember = (
  memberId: string,
  page: number,
  search: string
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: {trainerId:string,branchId:string}) =>
      updateMemberService(data, memberId),

    onSuccess: (res: { success: boolean; data:{remove: boolean}; message:string }) => {
      if (res?.data?.remove) {
        queryClient.setQueryData<
          { data: { data: Member[] } } | undefined
        >(
          [QUERY_KEYS.MEMBERS, page, search],
          (oldData) => {
            if (!oldData) return oldData

            return {
              ...oldData,
              data: {
                ...oldData.data,
                data: oldData.data.data.filter(
                  (m: Member) => m.id !== memberId
                ),
              },
            }
          }
        )

        queryClient.removeQueries({
          queryKey: [QUERY_KEYS.MEMBER, memberId],
        })
      }
    },
  })
}


export const useBlockMember = (page: number, search: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: string) => blockMemberService(memberId),
    onSuccess: (_res, memberId) => {
      queryClient.setQueryData<{ data: { data: Member[] } } | undefined>(
        [QUERY_KEYS.MEMBERS, page, search],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              data: oldData.data.data.map((m) =>
                m.id === memberId ? { ...m, status:"BLOCKED"} : m
              ),
            },
          };
        }
      );
      toast.success("Updated successfully")
    },
  });
};

export const useUnblockMember = (page: number, search: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: string) => unBlockMemberService(memberId),
    onSuccess: (res, memberId) => {
  queryClient.setQueryData<{ data: { data: Member[] } } | undefined>(
    [QUERY_KEYS.MEMBERS, page, search],
    (oldData) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        data: {
          ...oldData.data,
          data: oldData.data.data.map((m) =>
            m.id === memberId
              ? { ...m, status: res.data.status }
              : m
          ),
        },
      };
    }
  );

  toast.success("Updated successfully");
},
  });
};

export const useGetAllActiveTrainers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVE_TRAINERS], 
    queryFn: getAllActiveTrainers,
  });
};

export const useGetAllActiveBranches = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVE_BRANCH], 
    queryFn: getAllActiveBranches,
  });
};


export const useGetAllActiveTrainersByBranch = (branchId:string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVE_TRAINERS,branchId], 
    queryFn: ()=>getAllActiveTrainersByBranch(branchId),
  });
};