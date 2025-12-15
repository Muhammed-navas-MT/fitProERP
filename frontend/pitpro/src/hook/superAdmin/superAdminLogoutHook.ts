import { superAdminLogoutService } from "@/services/superAdmin/superAdminlogoutService";
import { useMutation } from "@tanstack/react-query";

export const useSuperAdminLogout = () => {
  return useMutation({
    mutationFn: superAdminLogoutService,
  });
};
