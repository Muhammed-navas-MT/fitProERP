import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTrainerStripeOnboardingLinkService,
  getTrainerSalaryconfigService,
  listAllSalaryService,
  refreshTrainerStripeStatusService,
  updateTrainerSalaryconfigService,
  viewSalaryDetailService,
} from "@/services/trainer/salaryConfigService";
import { SalaryPaymentMethod } from "@/types/trainer/salarypaymentMethod";

interface CreateTrainerStripeOnboardingLinkPayload {
  refreshUrl: string;
  returnUrl: string;
}

interface UpdateTrainerSalaryConfigPayload {
  paymentType: SalaryPaymentMethod;
  accountHolderName?: string;
  ifscCode?: string;
  upiId?: string;
}

export const useCreateTrainerStripeOnboardingLink = () => {
  return useMutation({
    mutationFn: (data: CreateTrainerStripeOnboardingLinkPayload) =>
      createTrainerStripeOnboardingLinkService(data),
  });
};

export const useGetTrainerSalaryConfig = () => {
  return useQuery({
    queryKey: ["trainer-salary-config"],
    queryFn: () => getTrainerSalaryconfigService(),
  });
};

export const useRefreshTrainerStripeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => refreshTrainerStripeStatusService(),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trainer-salary-config"],
      });
    },
  });
};

export const useUpdateTrainerSalaryConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateTrainerSalaryConfigPayload) =>
      updateTrainerSalaryconfigService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["trainer-salary-config"],
      });
    },
  });
};

export const useViewTrainerSalary = (salaryId: string) => {
  return useQuery({
    queryKey: ["salary_detail", salaryId],
    queryFn: () => viewSalaryDetailService(salaryId),
    enabled: !!salaryId,
  });
};

export const useListAllTrainerSalary = (data:{page:number;limit:number}) => {
  return useQuery({
    queryKey: ["list_salary", data],
    queryFn: () => listAllSalaryService(data),
  });
};
