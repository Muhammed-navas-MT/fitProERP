import { createDietPlanService, listDietPlanService } from "@/services/member/dietPlanService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateDietPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDietPlanService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dietPlan"],
      });
    },
  });
};

export const useListDiet = () => {
  return useQuery({
    queryKey: ["dietPlan"],
    queryFn: listDietPlanService,
  });
};