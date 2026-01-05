import {
  createMemberService,
  listMemberService,
  findMemberService,
  updateMemberService,
  blockMemberService,
  unBlockMemberService,
} from "@/services/gymAdmin/memberServices";
import { MemberAddPayload, MemberUpdatePayload } from "@/types/authPayload";
import { useMutation, useQuery, useQueryClient, keepPreviousData  } from "@tanstack/react-query";

export const memberQueryKeys = {
  all: ["members"] as const,
  list: (page: number, search: string, branchId?: string) =>
    [...memberQueryKeys.all, page, search, branchId] as const,
  detail: (memberId: string) =>
    [...memberQueryKeys.all, memberId] as const,
};

export const useListMembers = (
  page: number,
  search: string,
  branchId?: string
) => {
  return useQuery({
    queryKey: memberQueryKeys.list(page, search, branchId),
    queryFn: () => listMemberService(page, search, branchId),
    placeholderData: keepPreviousData,
  });
};

export const useFindMember = (memberId: string) => {
  return useQuery({
    queryKey: memberQueryKeys.detail(memberId),
    queryFn: () => findMemberService(memberId),
    enabled: !!memberId,
  });
};


export const useCreateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MemberAddPayload) =>
      createMemberService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.all,
      });
    },
  });
};


export const useUpdateMember = (memberId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MemberUpdatePayload) =>
      updateMemberService(data, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.detail(memberId),
      });
    },
  });
};


export const useBlockMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: string) =>
      blockMemberService(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.all,
      });
    },
  });
};


export const useUnBlockMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: string) =>
      unBlockMemberService(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memberQueryKeys.all,
      });
    },
  });
};
