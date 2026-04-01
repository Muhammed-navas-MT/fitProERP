import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProgressService,
  findProgressService,
  listProgressGraphDataService,
  listProgressService,
  updateProgressService,
} from "@/services/member/progressService";
import {
  ICreateProgressType,
  IUpdateProgressType,
} from "@/types/member/progressTypes";

export const useListProgress = (page: number) => {
  return useQuery({
    queryKey: ["progress", page],
    queryFn: () => listProgressService(page),
    placeholderData: keepPreviousData,
  });
};

export const useListProgressGraphData = () => {
  return useQuery({
    queryKey: ["progress_graph"],
    queryFn: () => listProgressGraphDataService(),
    placeholderData: keepPreviousData,
  });
};

export const useFindProgress = (progressId: string) => {
  return useQuery({
    queryKey: ["progress", progressId],
    queryFn: () => findProgressService(progressId),
    enabled: !!progressId,
  });
};

export const useCreateProgress = (page?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateProgressType) => createProgressService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["progress_graph"] });

      if (page) {
        queryClient.invalidateQueries({ queryKey: ["progress", page] });
      }
    },
  });
};

export const useUpdateProgress = (page?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: IUpdateProgressType;
    }) => updateProgressService(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["progress"] });
      queryClient.invalidateQueries({ queryKey: ["progress_graph"] });
      queryClient.invalidateQueries({
        queryKey: ["progress", variables.id],
      });

      if (page) {
        queryClient.invalidateQueries({ queryKey: ["progress", page] });
      }
    },
  });
};