import { getDashboardDetailService } from "@/services/member/dashboardService";
import { useQuery } from "@tanstack/react-query";

export const useDashboardDetail = () => {
  return useQuery({
    queryKey: ["dashboard_data"],
    queryFn: getDashboardDetailService,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
