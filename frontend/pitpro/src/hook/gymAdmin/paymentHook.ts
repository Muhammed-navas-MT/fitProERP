import { PurchaseSubscriptionService } from "@/services/gymAdmin/paymentService";
import { useMutation } from "@tanstack/react-query";

export const usePurchaseSubscriptionViaStripe = () => {
  return useMutation({
    mutationFn:(planId:string)=> PurchaseSubscriptionService(planId),
  });
};
