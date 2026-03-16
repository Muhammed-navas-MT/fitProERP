import { createWorkoutPlanService, listWorkoutService } from "@/services/member/workoutPlanServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateWorkoutPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkoutPlanService,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workout"],
      });
    },
  });
};

export const useListWorkout = () => {
  return useQuery({
    queryKey: ["workout"],
    queryFn: listWorkoutService,
  });
};