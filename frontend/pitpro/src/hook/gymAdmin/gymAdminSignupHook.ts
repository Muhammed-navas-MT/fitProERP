import {
  emailVerifincation,
  gymInfoService,
  otpVerification,
  resendOtpService,
  resumeRegistrationService,
  signupGymAdmin,
} from "@/services/gymAdmin/gymAdminSignUpService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGymAdminSignUp = () => {
  return useMutation({
    mutationFn: (data: FormData) => signupGymAdmin(data),
  });
};

export const useGymInfo = () => {
  return useMutation({
    mutationFn: (data:FormData) => gymInfoService(data),
  });
};

export const useGymAdminEmailVerification = () => {
  return useMutation({
    mutationFn: (data: {
      email: string;
      ownerName: string;
      phone: string;
      password: string;
      confirmPassword: string;
      signupId?: string;
    }) => emailVerifincation(data),
  });
};

export const useGymAdminOtpVerification = () => {
  return useMutation({
    mutationFn: (data: { signupId: string; otp: string; email: string }) =>
      otpVerification(data),
  });
};

export const useGymAdminResendOtp = () => {
  return useMutation({
    mutationFn: (signupId: string) => resendOtpService(signupId),
  });
};

export const useGymAdminResumeRegistration = (signupId: string) => {
  return useQuery({
    queryKey: ["gym_admin_registration", signupId],
    queryFn: () => resumeRegistrationService(signupId),
    enabled: !!signupId,
  });
};
