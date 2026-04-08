"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Mail,
  ShieldCheck,
  LockKeyhole,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  useMemberEmail,
  useMemberOtp,
  useMemberNewPassword,
} from "@/hook/member/memberForgetPasswordHook";

type ThemeColor = "purple" | "blue" | "orange";
type Step = 1 | 2 | 3 | 4;

interface ForgetPasswordFlowProps {
  loginPath: string;
  theme?: ThemeColor;
  storageKey?: string;
}

const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

const otpSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .regex(/^\d{4,6}$/, "OTP must be 4 to 6 digits"),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type EmailFormValues = z.infer<typeof emailSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

interface SessionState {
  step: Step;
  email: string;
  otpVerified: boolean;
  emailVerified: boolean;
}

const DEFAULT_SESSION_STATE: SessionState = {
  step: 1,
  email: "",
  otpVerified: false,
  emailVerified: false,
};

const themeStyles: Record<
  ThemeColor,
  {
    primaryBtn: string;
    primarySoft: string;
    primaryBorder: string;
    primaryText: string;
    primaryRing: string;
  }
> = {
  purple: {
    primaryBtn: "bg-purple-600 hover:bg-purple-700",
    primarySoft: "bg-purple-500/10",
    primaryBorder: "border-purple-500/30",
    primaryText: "text-purple-400",
    primaryRing: "focus-within:ring-purple-500/30",
  },
  blue: {
    primaryBtn: "bg-blue-600 hover:bg-blue-700",
    primarySoft: "bg-blue-500/10",
    primaryBorder: "border-blue-500/30",
    primaryText: "text-blue-400",
    primaryRing: "focus-within:ring-blue-500/30",
  },
  orange: {
    primaryBtn: "bg-orange-500 hover:bg-orange-600",
    primarySoft: "bg-orange-500/10",
    primaryBorder: "border-orange-500/30",
    primaryText: "text-orange-400",
    primaryRing: "focus-within:ring-orange-500/30",
  },
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  themeClass?: string;
}

function InputField({
  label,
  error,
  icon,
  themeClass,
  ...props
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>

      <div
        className={`flex h-12 items-center gap-3 rounded-xl border px-4 transition ring-0 ${
          error
            ? "border-red-500/40 bg-red-500/5"
            : `border-white/10 bg-white/5 ${themeClass ?? ""}`
        }`}
      >
        {icon && <span className="text-gray-400">{icon}</span>}
        <input
          {...props}
          className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
        />
      </div>

      {error ? <p className="text-xs text-red-400">{error}</p> : null}
    </div>
  );
}

function StepIndicator({
  step,
  currentTheme,
}: {
  step: Step;
  currentTheme: ReturnType<typeof getTheme>;
}) {
  const steps = [
    { id: 1, label: "Email" },
    { id: 2, label: "OTP" },
    { id: 3, label: "Password" },
  ];

  return (
    <div className="mb-8 flex items-center justify-between gap-2">
      {steps.map((item, index) => {
        const active = step >= (item.id as Step);
        const done = step > (item.id as Step);

        return (
          <div key={item.id} className="flex flex-1 items-center">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
                  active
                    ? `${currentTheme.primaryBtn.split(" ")[0]} border-transparent text-white`
                    : "border-white/10 bg-white/5 text-gray-400"
                }`}
              >
                {done ? "✓" : item.id}
              </div>

              <span
                className={`hidden text-sm sm:block ${
                  active ? "text-white" : "text-gray-500"
                }`}
              >
                {item.label}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`mx-2 h-[2px] flex-1 rounded-full ${
                  step > item.id
                    ? currentTheme.primaryBtn.split(" ")[0]
                    : "bg-white/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function getTheme(theme: ThemeColor) {
  return themeStyles[theme];
}

export default function ForgetPasswordFlow({
  loginPath,
  theme = "purple",
  storageKey = "member-forget-password-flow",
}: ForgetPasswordFlowProps) {
  const navigate = useNavigate();
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  const [step, setStep] = useState<Step>(1);
  const [savedEmail, setSavedEmail] = useState("");

  const emailMutation = useMemberEmail();
  const otpMutation = useMemberOtp();
  const newPasswordMutation = useMemberNewPassword();

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const isLoading =
    emailMutation.isPending ||
    otpMutation.isPending ||
    newPasswordMutation.isPending;

  const saveSessionState = (data: Partial<SessionState>) => {
    const existingRaw = sessionStorage.getItem(storageKey);
    const existing: SessionState = existingRaw
      ? JSON.parse(existingRaw)
      : DEFAULT_SESSION_STATE;

    const updated: SessionState = {
      ...existing,
      ...data,
    };

    sessionStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const clearSessionState = () => {
    sessionStorage.removeItem(storageKey);
  };

  useEffect(() => {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return;

    try {
      const parsed: SessionState = JSON.parse(raw);

      setStep(parsed.step || 1);
      setSavedEmail(parsed.email || "");

      if (parsed.email) {
        emailForm.setValue("email", parsed.email);
      }
    } catch {
      sessionStorage.removeItem(storageKey);
    }
  }, [storageKey, emailForm]);

  const handleSendOtp = (values: EmailFormValues) => {
    emailMutation.mutate(values.email, {
      onSuccess: (response: any) => {
        const successMessage = response?.message || "OTP sent successfully";
        toast.success(successMessage);

        setSavedEmail(values.email);
        setStep(2);

        saveSessionState({
          step: 2,
          email: values.email,
          emailVerified: true,
          otpVerified: false,
        });
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || error?.message || "Failed to send OTP");
      },
    });
  };

  const handleVerifyOtp = (values: OtpFormValues) => {
    otpMutation.mutate(
      {
        email: savedEmail || emailForm.getValues("email"),
        otp: Number(values.otp),
      },
      {
        onSuccess: (response: any) => {
          const successMessage = response?.message || "OTP verified successfully";
          toast.success(successMessage);

          setStep(3);

          saveSessionState({
            step: 3,
            email: savedEmail || emailForm.getValues("email"),
            emailVerified: true,
            otpVerified: true,
          });
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || error?.message || "Invalid OTP");
        },
      }
    );
  };

  const handleResetPassword = (values: PasswordFormValues) => {
    newPasswordMutation.mutate(
      {
        email: savedEmail || emailForm.getValues("email"),
        password: values.password,
      },
      {
        onSuccess: (response: any) => {
          const successMessage =
            response?.message || "Password updated successfully";

          toast.success(successMessage);
          setStep(4);

          saveSessionState({
            step: 4,
            email: savedEmail || emailForm.getValues("email"),
            emailVerified: true,
            otpVerified: true,
          });
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              error?.message ||
              "Failed to update password"
          );
        },
      }
    );
  };

  const handleChangeEmail = () => {
    setStep(1);
    otpForm.reset();
    passwordForm.reset();

    saveSessionState({
      step: 1,
      email: emailForm.getValues("email"),
      emailVerified: false,
      otpVerified: false,
    });
  };

  const handleGoToLogin = () => {
    clearSessionState();
    emailForm.reset();
    otpForm.reset();
    passwordForm.reset();
    navigate(loginPath);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111118] p-6 shadow-2xl sm:p-8">
          <Link
            to={loginPath}
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
            onClick={clearSessionState}
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>

          {step !== 4 && (
            <StepIndicator step={step} currentTheme={currentTheme} />
          )}

          <div
            className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border ${currentTheme.primarySoft} ${currentTheme.primaryBorder}`}
          >
            {step === 1 && (
              <Mail className={`h-6 w-6 ${currentTheme.primaryText}`} />
            )}
            {step === 2 && (
              <ShieldCheck className={`h-6 w-6 ${currentTheme.primaryText}`} />
            )}
            {step === 3 && (
              <LockKeyhole className={`h-6 w-6 ${currentTheme.primaryText}`} />
            )}
            {step === 4 && <CheckCircle2 className="h-6 w-6 text-green-400" />}
          </div>

          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold">Forgot Password</h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Enter your email address to receive OTP in your email.
              </p>

              <form
                onSubmit={emailForm.handleSubmit(handleSendOtp)}
                className="mt-6 space-y-5"
              >
                <InputField
                  label="Email address"
                  type="email"
                  placeholder="Enter your email"
                  icon={<Mail size={18} />}
                  error={emailForm.formState.errors.email?.message}
                  themeClass={currentTheme.primaryRing}
                  {...emailForm.register("email")}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${currentTheme.primaryBtn}`}
                >
                  {emailMutation.isPending ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold">Verify OTP</h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Enter the OTP sent to{" "}
                <span className="font-medium text-white">{savedEmail}</span>
              </p>

              <form
                onSubmit={otpForm.handleSubmit(handleVerifyOtp)}
                className="mt-6 space-y-5"
              >
                <InputField
                  label="OTP"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter OTP"
                  icon={<ShieldCheck size={18} />}
                  error={otpForm.formState.errors.otp?.message}
                  themeClass={currentTheme.primaryRing}
                  {...otpForm.register("otp")}
                />

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleChangeEmail}
                    className="flex h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Change Email
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${currentTheme.primaryBtn}`}
                  >
                    {otpMutation.isPending ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold">Create New Password</h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Enter your new password and confirm it.
              </p>

              <form
                onSubmit={passwordForm.handleSubmit(handleResetPassword)}
                className="mt-6 space-y-5"
              >
                <InputField
                  label="New password"
                  type="password"
                  placeholder="Enter new password"
                  icon={<LockKeyhole size={18} />}
                  error={passwordForm.formState.errors.password?.message}
                  themeClass={currentTheme.primaryRing}
                  {...passwordForm.register("password")}
                />

                <InputField
                  label="Confirm password"
                  type="password"
                  placeholder="Confirm new password"
                  icon={<LockKeyhole size={18} />}
                  error={passwordForm.formState.errors.confirmPassword?.message}
                  themeClass={currentTheme.primaryRing}
                  {...passwordForm.register("confirmPassword")}
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${currentTheme.primaryBtn}`}
                >
                  {newPasswordMutation.isPending
                    ? "Updating Password..."
                    : "Update Password"}
                </button>
              </form>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-2xl font-bold">Password Updated</h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                Your password has been reset successfully.
              </p>

              <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
                You can now login with your new password.
              </div>

              <button
                onClick={handleGoToLogin}
                className={`mt-6 flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold text-white transition ${currentTheme.primaryBtn}`}
              >
                Go to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}