import { gymAdminLogoutService } from "@/services/gymAdmin/gymAdminLogotService";
import { useMutation } from "@tanstack/react-query";

export const useGymAdminLogout = () => {
  return useMutation({
    mutationFn: gymAdminLogoutService,
  });
};
