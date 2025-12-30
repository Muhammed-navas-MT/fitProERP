import { emailVerifincation, otpVerification, signupGymAdmin } from "@/services/gymAdmin/gymAdminSignUpService";
import { useMutation } from "@tanstack/react-query";

export const useGymAdminSignUp = () => {
  return useMutation({
    mutationFn: (data: FormData) => signupGymAdmin(data),
  });
};

export const useGymAdminEmailVerification = ()=>{
  return useMutation({
    mutationFn:(data:{email:string})=>emailVerifincation(data),
  })
}

export const useGymAdminOtpVerification = () => {
  return useMutation({
    mutationFn: (data:{email:string,otp:string}) => otpVerification(data),
  });
};
