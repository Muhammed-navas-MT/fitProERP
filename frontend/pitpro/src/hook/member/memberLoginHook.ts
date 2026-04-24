import { memberLoginService, showGymDetailService } from "@/services/member/memberLoginService";
import { LoginPayload } from "@/types/authPayload"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useMemberLogin = ()=>{
    return useMutation({
        mutationFn:(data:LoginPayload)=>memberLoginService(data)
    })
};

export const useShowGymDetail = () => {
  return useQuery({
    queryKey: ["member_gym_detail"],
    queryFn: showGymDetailService,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
