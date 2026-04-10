import ForgetPasswordFlow from "@/components/shared/forgetPasswordFlow";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import {
  useGymAdminEmail,
  useGymAdminNewPassword,
  useGymAdminOtp,
} from "@/hook/gymAdmin/gymAdminForgetPasswordHook";
import { toast } from "sonner";

export default function GymAdminForgetPasswordPage() {
  const emailMutation = useGymAdminEmail();
  const otpMutation = useGymAdminOtp();
  const newPasswordMutation = useGymAdminNewPassword();

  const handleSendEmail = async (email: string) => {
    try {
      const response = await emailMutation.mutateAsync(email);
      toast.success(response?.message || "OTP sent successfully");
      return response;
    } catch (error) {
      let message = "Failed to send OTP";
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  };

  const handleVerifyOtp = async (data: { email: string; otp: number }) => {
    try {
      const response = await otpMutation.mutateAsync(data);
      toast.success(response?.message || "OTP verified successfully");
      return response;
    } catch (error) {
      let message = "Invalid OTP";
      if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
      throw error;
    }
  };

  const handleResetPassword = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await newPasswordMutation.mutateAsync(data);
      toast.success(response?.message || "Password updated successfully");
      return response;
    } catch (error) {
      let message = "Failed to update password";

    if (error instanceof Error) {
      message = error.message;
    }

    toast.error(message);
    throw error;
    }
  };

  return (
    <ForgetPasswordFlow
      loginPath={`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.LOGIN}`}
      theme="orange"
      storageKey="gymadmin-forget-password"
      onSendEmail={handleSendEmail}
      onVerifyOtp={handleVerifyOtp}
      onResetPassword={handleResetPassword}
      isEmailLoading={emailMutation.isPending}
      isOtpLoading={otpMutation.isPending}
      isPasswordLoading={newPasswordMutation.isPending}
    />
  );
}
