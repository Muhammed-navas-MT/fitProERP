import { signupGymAdmin } from "@/services/gymAdmin/gymAdminSignUpService";
import { useMutation } from "@tanstack/react-query";
import type { SignupPayload } from "@/types/authPayload";

export const useGymAdminSignUp = () => {
  return useMutation({
    mutationFn: (data: SignupPayload) => signupGymAdmin(data),
  });
};
