import { trainerLogoutService } from "@/services/trainer/trainerLogoutService";
import { useMutation } from "@tanstack/react-query";

export const useTrainerLogout = () => {
  return useMutation({
    mutationFn: trainerLogoutService,
  });
};
