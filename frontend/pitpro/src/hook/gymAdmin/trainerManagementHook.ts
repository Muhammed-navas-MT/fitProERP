import { useMutation, useQuery, keepPreviousData } from "@tanstack/react-query";
import { addTrainerService, getTrainers } from "@/services/gymAdmin/trainerService";
import { TrainerAddPayload } from "@/types/authPayload";

export const useAddTrainer = () => {
  return useMutation({
    mutationFn: (data: TrainerAddPayload) => addTrainerService(data),
  });
};

export const useGetAllTrainers = (
  page: number,
  search: string,
) => {
  return useQuery({
    queryKey: ["trainers", page, search],
    queryFn: () => getTrainers(page,search),
    placeholderData: keepPreviousData,
  });
};
