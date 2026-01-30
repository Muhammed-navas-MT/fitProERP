import {
  addMemberService,
  blockMemberService,
  findMemberService,
  getAllActiveTrainers,
  getMembersService,
  unBlockMemberService,
  updateMemberService,
} from "@/services/trainer/memberService";
import { MemberAddPayload, MemberUpdatePayload } from "@/types/authPayload";
import { Member } from "@/types/trainer/memberType";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const QUERY_KEYS = {
  MEMBERS: "members",
  MEMBER: "member",
  ACTIVE_TRAINERS: "active-trainers",
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

export const useUpdateMember = (memberId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MemberUpdatePayload) =>
      updateMemberService(data, memberId),
    onSuccess: (updatedMember) => {
      queryClient.setQueryData<{ data: { data: Member[] } } | undefined>([QUERY_KEYS.MEMBERS], (oldData) => {
        if (!oldData) return oldData;
        const updatedData = { ...oldData };
        updatedData.data.data = oldData.data.data.map((m:Member) =>
          m.id === memberId ? updatedMember.data : m
        );
        return updatedData;
      });

      queryClient.setQueryData([QUERY_KEYS.MEMBER, memberId], updatedMember.data);
    },
  });
};

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
                m.id === memberId ? { ...m, status: _res.data.status} : m
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
                m.id === memberId ? { ...m, status: _res.data.status } : m
              ),
            },
          };
        }
      );
    },
  });
};

export const useGetAllActiveTrainers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVE_TRAINERS], 
    queryFn: getAllActiveTrainers,
  });
};
