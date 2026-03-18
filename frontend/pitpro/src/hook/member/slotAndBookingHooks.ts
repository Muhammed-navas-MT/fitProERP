import { checkoutSessionService, listAllSessionService, listAvailabeSlotService } from "@/services/member/slotAndBookingServices";
import { CreateMemberSessionCheckoutType } from "@/types/member/memberSessionType";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useListAvailableSlot = () => {
  return useQuery({
    queryKey: ["available_slot"],
    queryFn: listAvailabeSlotService,
  });
};

export const useCheckoutSession = () => {
  return useMutation({
    mutationFn:(data:CreateMemberSessionCheckoutType)=> checkoutSessionService(data),
  });
};


export const useListAllSession = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: listAllSessionService,
  });
};