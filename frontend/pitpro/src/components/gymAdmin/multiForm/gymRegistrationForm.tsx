import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import OwnerInformationStep from "./ownerInfoStep";
import GymInformationStep from "./gymInfostep";
import UploadDocumentsStep from "./uploadDocument";
import { useNavigate } from "react-router-dom";
import { step1Schema, step2Schema, step3Schema } from "@/validation/gymRegistrationSchema";
import { SignupPayload } from "@/types/authPayload";
import { useGymAdminEmailVerification, useGymAdminSignUp } from "@/hook/gymAdmin/gymAdminSignupHook";
import { ZodError } from "zod";
import { toast } from "sonner";
import OTPGymAdminModal from "@/components/modal/OtpgymAdminModal";

export default function GymRegistrationForm() {
  const navigate = useNavigate();
  const { mutate: registerGymAdmin, isPending } = useGymAdminSignUp();
  const { mutate: emailVerification} = useGymAdminEmailVerification();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showModal,setShowModal] = useState(false);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<SignupPayload>({
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "GYMADMIN",
    gymName: "",
    tagline: "",
    description: "",
    logo: null,
    businessLicense: null,
    insuranceCertificate: null,
  });

  const handleFormDataChange = (data: Partial<SignupPayload>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const validateCurrentStep = (): boolean => {
    let dataToValidate: Partial<SignupPayload>;
    let result;

    try {
      switch (currentStep) {
        case 1:
          dataToValidate = {
            ownerName: formData.ownerName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            role: "GYMADMIN",
          };
          result = step1Schema.safeParse(dataToValidate);
          break;

        case 2:
          dataToValidate = {
            gymName: formData.gymName,
            tagline: formData.tagline,
            description: formData.description,
            logo: formData.logo,
          };
          result = step2Schema.safeParse(dataToValidate);
          break;

        case 3:
          dataToValidate = {
            businessLicense: formData.businessLicense,
            insuranceCertificate: formData.insuranceCertificate,
          };
          result = step3Schema.safeParse(dataToValidate);
          break;

        default:
          toast.error("Invalid step");
          return false;
      }

      if (!result.success) {
        const errorsFormatted: Record<string, string> = {};

        result.error.issues.forEach((err) => {
          const field = err.path[0] as string;
          if (!errorsFormatted[field]) {
            errorsFormatted[field] = err.message;
          }
        });

        setStepErrors(errorsFormatted);
        return false;
      }

      setStepErrors({});
      return true;
    } catch (error) {
      
      if (error instanceof ZodError) {
        const errorsFormatted: Record<string, string> = {};
        error.issues.forEach((err) => {
          const field = err.path[0] as string;
          if (!errorsFormatted[field]) {
            errorsFormatted[field] = err.message;
          }
        });
        setStepErrors(errorsFormatted);
        toast.error("Validation failed. Please check your inputs.");
      } else {
        toast.error("An unexpected error occurred during validation");
      }
      
      return false;
    }
  };

  const handleNext = async () => {
    const isValid = validateCurrentStep();
    if (!isValid) return;

    if (currentStep < 3) {
      if(currentStep == 1){
        emailVerification(formData.email,{
          onSuccess:(res)=>{
            toast.success(res.data.message || "Otp sent your Email!");
            setShowModal(true);
          },
          onError:(err)=>{
            toast.error(err.message||"Please try again!")
          }
        })
      }
      setCurrentStep((s) => s + 1);
      setStepErrors({});
    } else {
      try {
        const data = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            if (value instanceof File) {
              data.append(key, value);
            } else {
              data.append(key, String(value));
            }
          }
        });

        registerGymAdmin(data, {
          onSuccess: () => {
            toast.success("Registration completed successfully!");
            navigate("/gym-admin/dashboard");
          },
          onError: (error: any) => {
            const errorMessage =
              error?.response?.data?.message || 
              error?.message || 
              "Registration failed. Please try again.";
            
            toast.error(errorMessage);
          },
        });
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handlePrevious = () => {
    setStepErrors({});
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const steps = [
    { number: 1, label: "Owner\nInformation" },
    { number: 2, label: "Gym\nInformation" },
    { number: 3, label: "Documents" },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <OwnerInformationStep
            formData={formData}
            onDataChange={handleFormDataChange}
            errors={stepErrors}
          />
        );
      case 2:
        return (
          <GymInformationStep
            formData={formData}
            onDataChange={handleFormDataChange}
            errors={stepErrors}
          />
        );
      case 3:
        return (
          <UploadDocumentsStep
            formData={formData}
            onDataChange={handleFormDataChange}
            errors={stepErrors}
          />
        );
      default:
        return null;
    }
  };
  return (
  <div className="relative">
    <OTPGymAdminModal open={showModal} onClose={() => setShowModal(false)} />
    <div
      className={`flex flex-col min-h-screen bg-gray-900 text-white transition-all duration-300 ${
        showModal ? "blur-sm pointer-events-none" : ""
      }`}
    >
      <header className="bg-gray-800">
        <div className="flex items-center justify-between max-w-6xl mx-auto text-white py-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm hover:text-gray-200 transition"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </button>
          <h1 className="text-2xl font-bold">Gym Registration</h1>
          <div className="text-sm">Step {currentStep} of 3</div>
        </div>
      </header>

      <div className="bg-gray-800 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-1 ${
                    step.number <= currentStep ? "bg-orange-500" : "bg-gray-700"
                  }`}
                >
                  {step.number}
                </div>
                <div className="text-xs text-center text-gray-400 whitespace-pre-line">
                  {step.label}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">{renderStep()}</div>
      </div>

      <div className="border-t border-gray-800 bg-gray-800 px-6 py-6">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-2 rounded-lg border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={isPending}
            className="px-6 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending
              ? "Processing..."
              : currentStep === 3
              ? "Complete Registration"
              : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  </div>
);
}