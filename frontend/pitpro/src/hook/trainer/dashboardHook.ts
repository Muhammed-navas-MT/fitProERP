import { getDashboardDetailsService } from "@/services/trainer/dashboardService";
import { useQuery } from "@tanstack/react-query"

export const useGetDashboardData = ()=>{
     return useQuery({
        queryKey: ["dashboard_details"],
        queryFn: () => getDashboardDetailsService(),
      });
}