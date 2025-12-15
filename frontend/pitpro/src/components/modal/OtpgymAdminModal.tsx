import { Modal } from "flowbite-react";
import { OTPVerification } from "@/components/shared/OtpVerification";
import { useGymAdminOtpVerification } from "@/hook/gymAdmin/gymAdminSignupHook";
import { toast } from "sonner";

interface OTPGymAdminModalProps {
  open: boolean;
  onClose: () => void;
  email:string;
  handleResendOtp: ()=>void;
}

export default function OTPGymAdminModal({ open, onClose,email,handleResendOtp }: OTPGymAdminModalProps) {
  const { mutate: verifyOtp, } = useGymAdminOtpVerification();

  const handleSubmit = async (otp: string) => {
    verifyOtp({email,otp}, {
      onSuccess: () => {
        toast.success("OTP Verified Successfully!");
        onClose();
      },
      onError: (err) => {
        toast.error(err?.message || "OTP Verification Failed!");
      },
    });
  };

  return (
    <Modal show={open} onClose={onClose}>
        <OTPVerification
          userType="GYMADMIN"
          onSubmit={handleSubmit}
          onResend={async()=>handleResendOtp()}
        />
    </Modal>
  );
}
