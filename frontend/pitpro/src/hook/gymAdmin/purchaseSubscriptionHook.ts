import { PurchaseSubscriptionService2 } from "@/services/gymAdmin/purchaseSubscriptionService";
import { useMutation } from "@tanstack/react-query";

export const usePurchaseSubscription = () => {
  return useMutation({
    mutationFn: PurchaseSubscriptionService2,
  });
};
