import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateLeaveItem, ListLeaveResponse } from "@/types/trainer/leaveType";
import { createLeaveService, findLeaveService, listAllLeaveService, updateLeaveService } from "@/services/trainer/leaveServices";


export const useCreateLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLeaveItem) => createLeaveService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainer-leaves"] });
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


export const useUpdateLeave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateLeaveItem & { id: string }) =>
      updateLeaveService(data),

    onSuccess: (updatedLeave) => {
      queryClient.setQueriesData<ListLeaveResponse>(
        { queryKey: ["trainer-leaves"] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              leaves: oldData.data.leaves.map((leave) =>
                leave.id === updatedLeave.data.id
                  ? updatedLeave.data
                  : leave
              ),
            },
          };
        }
      );
    },
  });
};

export const useLeaves = (
  page: number,
  search: string,
  status?: string
) => {
  return useQuery({
    queryKey: ["trainer-leaves", page, search, status],

    queryFn: () => listAllLeaveService(page, search, status),

    placeholderData: keepPreviousData,
  });
};