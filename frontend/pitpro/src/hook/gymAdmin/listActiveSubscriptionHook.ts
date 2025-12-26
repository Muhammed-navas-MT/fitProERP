import { listAllActiveSubscription } from "@/services/gymAdmin/listActiveSubscription";
import { useQuery } from "@tanstack/react-query";

export const useListActiveSubscription = () => {
  return useQuery({
    queryKey: ["activeSubscriptions"],
    queryFn: listAllActiveSubscription,
  });
};
