import { findPaymentService, listPaymentsService } from "@/services/superAdmin/paymentmanagement";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAllPayments = (page: number, search: string) => {
  return useQuery({
    queryKey: ["payments", page, search],
    queryFn: () => listPaymentsService(page, search),
    placeholderData: keepPreviousData,
  });
};

export const usePaymentDetail = (id: string) => {
  return useQuery({
    queryKey: ["paymentDetail", id],
    queryFn: () => findPaymentService(id),
    enabled: !!id,
  });
};