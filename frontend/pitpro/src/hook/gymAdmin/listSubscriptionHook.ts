import { listSubscription } from "@/services/gymAdmin/listSubscriptionService";
import { useQuery } from "@tanstack/react-query";

export const useListSubscription = () => {
  return useQuery({
    queryKey: ["subscriptions"],
    queryFn: listSubscription,
  });
};
