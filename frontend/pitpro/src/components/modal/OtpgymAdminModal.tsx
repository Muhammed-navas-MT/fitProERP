import { Modal } from "flowbite-react";
import { OTPVerification } from "@/components/shared/OtpVerification";
import { useGymAdminOtpVerification } from "@/hook/gymAdmin/gymAdminSignupHook";
import { toast } from "sonner";
import { signupStorage } from "@/utils/signupStorage";

interface OTPGymAdminModalProps {
  open: boolean;
  onClose: () => void;
  email:string;
  handleResendOtp: ()=>void;
}

export default function OTPGymAdminModal({ open, onClose,email,handleResendOtp }: OTPGymAdminModalProps) {
  const { mutate: verifyOtp, } = useGymAdminOtpVerification();

  const signupId = signupStorage.getSignupId();
  if(!signupId)return;

  const handleSubmit = async (otp: string) => {
    verifyOtp({signupId,otp,email}, {
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
          onSubmit={handleSubmit}
          onResend={async()=>handleResendOtp()}
        />
    </Modal>
  );
}
