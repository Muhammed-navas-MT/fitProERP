import {
  generateTrainerSalaryService,
  listTrainerSalaryService,
  createBillingSetupIntentService,
  getBillingConfigService,
  saveBillingEmailService,
  saveBillingPaymentMethodService,
  payTrainerSalaryService,
  findSalaryDetailService,
} from "@/services/gymAdmin/salaryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGenerateSalary = (params: { page: number; limit: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => generateTrainerSalaryService(),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["salaries", params],
      });
    },
  });
};

export const useListSalary = (params: { page: number; limit: number }) => {
  return useQuery({
    queryKey: ["salaries", params],
    queryFn: () => listTrainerSalaryService(params),
  });
};

export const useCreateBillingSetupIntent = () => {
  return useMutation({
    mutationFn: createBillingSetupIntentService,
  });
};

export const useGetBillingConfig = () => {
  return useQuery({
    queryKey: ["billing-config"],
    queryFn: getBillingConfigService,
  });
};

export const useSaveBillingEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => saveBillingEmailService(email),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["billing-config"],
      });
    },
  });
};

export const useSaveBillingPaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { paymentMethodId: string; billingEmail: string }) =>
      saveBillingPaymentMethodService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billing-config"] });
    },
  });
};

export const usePaySalarySalary = (params: { page: number; limit: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (salaryId: string) => payTrainerSalaryService(salaryId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["salaries", params],
      });
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ["salaries", params],
        });
      }, 5000);
    },
  });
};

export const useFindSalaryDetail = (salaryId: string) => {
  return useQuery({
    queryKey: ["salary_detail", salaryId],
    queryFn: () => findSalaryDetailService(salaryId),
    enabled: !!salaryId,
  });
};
