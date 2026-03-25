import { checkoutSessionService, listAllSessionService, listAvailabeSlotService } from "@/services/member/slotAndBookingServices";
import { CreateMemberSessionCheckoutType } from "@/types/member/memberSessionType";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useListAvailableSlot = (trainerId:string) => {
  return useQuery({
    queryKey: ["available_slot",trainerId],
    queryFn: ()=>listAvailabeSlotService(trainerId),
    enabled: !!trainerId,
    refetchInterval: 10000,
    refetchOnWindowFocus: false
  });
};

export const useCheckoutSession = () => {
  return useMutation({
    mutationFn:(data:CreateMemberSessionCheckoutType)=> checkoutSessionService(data),
  });
};


export const useListAllSession = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["sessions", page, limit],
    queryFn: () => listAllSessionService(page, limit),
  });
};