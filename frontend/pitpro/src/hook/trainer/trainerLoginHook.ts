import { showGymDetailService, trainerLoginService } from "@/services/trainer/trainerLoginService"
import { LoginPayload } from "@/types/authPayload"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useTrainerLogin = ()=>{
    return useMutation({
        mutationFn:(data:LoginPayload)=>trainerLoginService(data)
    })
};

export const useShowGymDetail = () => {
  return useQuery({
    queryKey: ["trainer_gym_detail"],
    queryFn: showGymDetailService,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
