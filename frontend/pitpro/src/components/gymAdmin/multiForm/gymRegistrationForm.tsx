import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import OwnerInformationStep from "./ownerInfoStep";
import GymInformationStep from "./gymInfostep";
import UploadDocumentsStep from "./uploadDocument";
import { useNavigate } from "react-router-dom";
import { step1Schema, step2Schema, step3Schema } from "@/validation/gymRegistrationSchema";
import { SignupPayload } from "@/types/authPayload";
import { useGymAdminSignUp } from "@/hook/gymAdmin/gymAdminSignupHook";

export default function GymRegistrationForm() {
  const navigate = useNavigate();
  const { mutate: registerGymAdmin, isPending } = useGymAdminSignUp();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<SignupPayload>({
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role:"GYMADMIN",
    gymName: "",
    tagline: "",
    description: "",
    logo: null,
    businessLicense: null,
    insuranceCertificate: null,
  });

  useEffect(() => {
    const saved = sessionStorage.getItem("gym-registration");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      } catch (err) {
        console.log(err, "data fetch from session storage")
      }
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem("gym-registration", JSON.stringify(formData));
    } catch(err) {
      console.log("datas tore into session storage...",err);
    }
  }, [formData]);

  const handleFormDataChange = (data: Partial<typeof formData>) => {
    setFormData((prev: SignupPayload) => ({ ...prev, ...data }));
  };

const validateCurrentStep = (): boolean => {
  let dataToValidate;
  let result;

  switch (currentStep) {
    case 1:
      dataToValidate = {
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role:"GYMADMIN"
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
      return false;
  }
  console.log(result,"from result  ")

  if (!result.success) {
    const errorsFormatted: Record<string, string> = {};

    result.error.issues.forEach((err) => {
      const field = err.path[0] as string;
      if (!errorsFormatted[field]) errorsFormatted[field] = err.message;
    });

    setStepErrors(errorsFormatted);
    return false;
  }

  setStepErrors({});
  return true;
};



  const handleNext = () => {
    const ok = validateCurrentStep();
    if (!ok) return;

    if (currentStep < 3) {
      setCurrentStep((s) => s + 1);
      setStepErrors({});
    } else {
      console.log(formData,"from signup form")
      registerGymAdmin(formData, {
        onSuccess: (response) => {
          console.log("Registration successful:", response);
          sessionStorage.removeItem("gym-registration");
          alert("Registration completed successfully!");
          navigate("/gym-admin/dashboard");
        },
        onError: (error: any) => {
          console.error("Registration failed:", error);
          const errorMessage =
            error?.response?.data?.message || "Registration failed. Please try again.";
          alert(errorMessage);
        },
      });
    }
  };

  const handlePrevious = () => {
    setStepErrors({});
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const steps = [
    { number: 1, label: "Owner\nInformation" },
    { number: 2, label: "Gym\nInformation" },
    { number: 3, label: "Documents" },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <OwnerInformationStep formData={formData} onDataChange={handleFormDataChange} errors={stepErrors} />;
      case 2:
        return <GymInformationStep formData={formData} onDataChange={handleFormDataChange} errors={stepErrors} />;
      case 3:
        return <UploadDocumentsStep formData={formData} onDataChange={handleFormDataChange} errors={stepErrors} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800">
        <div className="flex items-center justify-between max-w-6xl mx-auto text-white py-3">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm hover:text-gray-200 transition">
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
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-1 ${step.number <= currentStep ? "bg-orange-500" : "bg-gray-700"}`}>
                  {step.number}
                </div>
                <div className="text-xs text-center text-gray-400 whitespace-pre-line">{step.label}</div>
              </div>
            ))}
          </div>

          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 transition-all" style={{ width: `${(currentStep / 3) * 100}%` }} />
          </div>
        </div>
      </div>
      <div className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">{renderStep()}</div>
      </div>

      <div className="border-t border-gray-800 bg-gray-800 px-6 py-6">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <button onClick={handlePrevious} disabled={currentStep === 1} className="px-6 py-2 rounded-lg border border-gray-600">
            Previous
          </button>

          <button onClick={handleNext} className="px-6 py-2 rounded-lg bg-orange-500 text-white">
            {currentStep === 3 ? "Complete Registration" : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
}
