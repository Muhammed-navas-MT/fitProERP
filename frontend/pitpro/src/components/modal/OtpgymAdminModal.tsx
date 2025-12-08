import { Modal } from "flowbite-react";
import { OTPVerification } from "@/components/shared/OtpVerification";
import { useGymAdminOtpVerification } from "@/hook/gymAdmin/gymAdminSignupHook";
import { toast } from "sonner";

interface OTPGymAdminModalProps {
  open: boolean;
  onClose: () => void;
}

export default function OTPGymAdminModal({ open, onClose }: OTPGymAdminModalProps) {
  const { mutate: verifyOtp, } = useGymAdminOtpVerification();

  const handleSubmit = async (otp: string) => {
    verifyOtp(otp, {
      onSuccess: () => {
        toast.success("OTP Verified Successfully!");
        onClose();
      },
      onError: (err: any) => {
        toast.error(err?.message || "OTP Verification Failed!");
      },
    });
  };

  const handleResend = async () => {
    toast.info("Sending new OTP...");
    await new Promise((resolve) => setTimeout(resolve, 700));
    toast.success("New OTP Sent!");
  };

  return (
    <Modal show={open} onClose={onClose}>
        <OTPVerification
          userType="GYMADMIN"
          onSubmit={handleSubmit}
          onResend={handleResend}
        />
    </Modal>
  );
}
