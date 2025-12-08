import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
import { addSubscriptionService, blockSubscription, getSingleSubscription, getSubscriptions, unBlockSubscription, updateSubscriptionService } from "@/services/superAdmin/subscriptionService";
import { FinalSubmissionType } from "@/validation/subscriptionShema";

export const useGetSubscription = (page: number, search: string) => {
  return useQuery({
    queryKey: ["subscriptions", page, search],
    queryFn: () => getSubscriptions(page, search),
    placeholderData: keepPreviousData,
  });
};

export const useAddSubscription = () =>{
  return useMutation ({
    mutationFn:(data:FinalSubmissionType)=>addSubscriptionService(data),
  })
};

export const useBlockSubscription = () => {
  return useMutation({
    mutationFn: (subscriptionId: string) => blockSubscription(subscriptionId),
  });
};

export const useUnBlockSubscription = () => {
  return useMutation({
    mutationFn: (subscriptionId: string) => unBlockSubscription(subscriptionId),
  });
};

export const useGetSingleSubscription = (id: string) => {
  return useQuery({
    queryKey: ["subscription", id],
    queryFn: () => getSingleSubscription(id),
    enabled: !!id,
  });
};

export const useUpdateSubscription = () =>
  useMutation({
    mutationFn: ({
      id,
      updateData,
    }: {
      id: string;
      updateData: FinalSubmissionType;
    }) => updateSubscriptionService(id, updateData),
  });

