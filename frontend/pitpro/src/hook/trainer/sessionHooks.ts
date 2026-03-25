import { listSessionService } from "@/services/trainer/sessionService";
import { useQuery } from "@tanstack/react-query";

export const useListSession = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["sessions", page, limit],
    queryFn: () => listSessionService(page, limit),
  });
};