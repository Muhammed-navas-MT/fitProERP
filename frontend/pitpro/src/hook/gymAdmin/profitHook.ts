import { profitAnalyticsService } from "@/services/gymAdmin/profitServices";
import { useQuery } from "@tanstack/react-query";

export const useProfitAnalytics = (startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: ["profit_analytics", startDate, endDate],
    queryFn: () => profitAnalyticsService(startDate, endDate!),
    // enabled: !!startDate && !!endDate, 
  });
};