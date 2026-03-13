import {
  approveLeaveService,
  findLeaveService,
  listAllLeaveService,
  rejectLeaveService,
} from "@/services/gymAdmin/leaveServices";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


export const useRejectLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      leaveId,
      reason,
    }: {
      leaveId: string;
      reason: string;
    }) => rejectLeaveService(leaveId, reason),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trainer-leaves"],
      });
    },
  });
};


export const useFindLeave = (leaveId: string) => {
  return useQuery({
    queryKey: ["trainer-leave", leaveId],
    queryFn: () => findLeaveService(leaveId),
    enabled: !!leaveId,
  });
};


export const useApproveLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (leaveId: string) => approveLeaveService(leaveId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trainer-leaves"],
      });
    },
  });
};


export const useLeaves = (
  page: number,
  search: string,
  branchId?: string,
  status?: string
) => {
  return useQuery({
    queryKey: ["trainer-leaves", page, search, branchId, status],

    queryFn: () =>
      listAllLeaveService(page, search, branchId, status),

    placeholderData: keepPreviousData,
  });
};