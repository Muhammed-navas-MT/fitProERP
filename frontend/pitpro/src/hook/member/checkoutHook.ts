import { checkoutPackageService } from "@/services/member/checkoutService";
import { useMutation } from "@tanstack/react-query";

export const useCheckoutPackage = () => {
  return useMutation({
    mutationFn:(planId:string)=> checkoutPackageService(planId),
  });
};
