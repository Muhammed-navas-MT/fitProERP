import { memberLogoutService } from "@/services/member/memberLogoutService";
import { useMutation } from "@tanstack/react-query";

export const useMemberLogout = () => {
  return useMutation({
    mutationFn: memberLogoutService,
  });
};
