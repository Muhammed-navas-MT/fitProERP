import { emailVerifincation, otpVerification, signupGymAdmin } from "@/services/gymAdmin/gymAdminSignUpService";
import { useMutation } from "@tanstack/react-query";

export const useGymAdminSignUp = () => {
  return useMutation({
    mutationFn: (data: FormData) => signupGymAdmin(data),
  });
};

export const useGymAdminEmailVerification = ()=>{
  return useMutation({
    mutationFn:(email:string)=>emailVerifincation(email),
  })
}

export const useGymAdminOtpVerification = () => {
  return useMutation({
    mutationFn: (otp:string) => otpVerification(otp),
  });
};
