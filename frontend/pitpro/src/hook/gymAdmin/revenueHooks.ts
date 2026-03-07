import { findRevenueService, listRevenuesService } from "@/services/gymAdmin/revenueServices";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetAllRevenues = (page: number, search: string,branch?:string,sourceType?:string) => {
  return useQuery({
    queryKey: ["revenues", page, search,branch,sourceType],
    queryFn: () => listRevenuesService(page, search,branch,sourceType),
    placeholderData: keepPreviousData,
  });
};

export const useRevenueDetail = (id: string) => {
  return useQuery({
    queryKey: ["revenueDetail", id],
    queryFn: () => findRevenueService(id),
    enabled: !!id,
  });
};