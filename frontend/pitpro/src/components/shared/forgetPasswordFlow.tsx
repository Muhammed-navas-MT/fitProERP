import { useEffect, useMemo, useState } from "react";
import {
  Mail,
  ShieldCheck,
  LockKeyhole,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  EmailFormValues,
  emailSchema,
  OtpFormValues,
  otpSchema,
  PasswordFormValues,
  passwordSchema,
} from "@/validation/forgetPasswordValidationSchema";

type ThemeColor = "purple" | "blue" | "orange";
type Step = 1 | 2 | 3 | 4;

interface ForgetPasswordFlowProps {
  loginPath: string;
  theme?: ThemeColor;
  storageKey?: string;
  sessionExpiryMs?: number;
  onSendEmail: (email: string) => Promise<{ message?: string } | void>;
  onVerifyOtp: (data: {
    email: string;
    otp: number;
  }) => Promise<{ message?: string } | void>;
  onResetPassword: (data: {
    email: string;
    password: string;
  }) => Promise<{ message?: string } | void>;
  onSessionExpired?: () => void;
  isEmailLoading?: boolean;
  isOtpLoading?: boolean;
  isPasswordLoading?: boolean;
}

interface SessionState {
  step: Step;
  email: string;
  otpVerified: boolean;
  emailVerified: boolean;
  expiresAt?: number;
}

const DEFAULT_SESSION_STATE: SessionState = {
  step: 1,
  email: "",
  otpVerified: false,
  emailVerified: false,
};

const DEFAULT_SESSION_EXPIRY_MS = 10 * 60 * 1000;

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
  sessionExpiryMs = DEFAULT_SESSION_EXPIRY_MS,
  onSendEmail,
  onVerifyOtp,
  onResetPassword,
  onSessionExpired,
  isEmailLoading = false,
  isOtpLoading = false,
  isPasswordLoading = false,
}: ForgetPasswordFlowProps) {
  const navigate = useNavigate();
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  const [step, setStep] = useState<Step>(1);
  const [savedEmail, setSavedEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const isLoading = isEmailLoading || isOtpLoading || isPasswordLoading;

  const clearSessionState = () => {
    sessionStorage.removeItem(storageKey);
  };

  const resetToInitialState = () => {
    setStep(1);
    setSavedEmail("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    emailForm.reset({ email: "" });
    otpForm.reset({ otp: "" });
    passwordForm.reset({ password: "", confirmPassword: "" });
  };

  const expireSession = () => {
    clearSessionState();
    resetToInitialState();
    onSessionExpired?.();
  };

  const saveSessionState = (data: Partial<SessionState>) => {
    const existingRaw = sessionStorage.getItem(storageKey);
    const existing: SessionState = existingRaw
      ? JSON.parse(existingRaw)
      : DEFAULT_SESSION_STATE;

    const updated: SessionState = {
      ...existing,
      ...data,
      expiresAt: Date.now() + sessionExpiryMs,
    };

    sessionStorage.setItem(storageKey, JSON.stringify(updated));
  };

  useEffect(() => {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return;

    try {
      const parsed: SessionState = JSON.parse(raw);

      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        expireSession();
        return;
      }

      setStep(parsed.step || 1);
      setSavedEmail(parsed.email || "");

      if (parsed.email) {
        emailForm.setValue("email", parsed.email);
      }
    } catch {
      clearSessionState();
    }
  }, [storageKey, emailForm]);

  useEffect(() => {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return;

    try {
      const parsed: SessionState = JSON.parse(raw);

      if (!parsed.expiresAt) return;

      const remainingTime = parsed.expiresAt - Date.now();

      if (remainingTime <= 0) {
        expireSession();
        return;
      }

      const timer = window.setTimeout(() => {
        expireSession();
      }, remainingTime);

      return () => window.clearTimeout(timer);
    } catch {
      clearSessionState();
    }
  }, [step, storageKey]);

  const handleSendOtp = async (values: EmailFormValues) => {
    await onSendEmail(values.email);

    setSavedEmail(values.email);
    setStep(2);

    saveSessionState({
      step: 2,
      email: values.email,
      emailVerified: true,
      otpVerified: false,
    });
  };

  const handleVerifyOtp = async (values: OtpFormValues) => {
    const email = savedEmail || emailForm.getValues("email");

    await onVerifyOtp({
      email,
      otp: Number(values.otp),
    });

    setStep(3);
    otpForm.reset();

    saveSessionState({
      step: 3,
      email,
      emailVerified: true,
      otpVerified: true,
    });
  };

  const handleResetPassword = async (values: PasswordFormValues) => {
    const email = savedEmail || emailForm.getValues("email");

    await onResetPassword({
      email,
      password: values.password,
    });

    setStep(4);

    saveSessionState({
      step: 4,
      email,
      emailVerified: true,
      otpVerified: true,
    });
  };

  const handleChangeEmail = () => {
    setStep(1);
    otpForm.reset({ otp: "" });
    passwordForm.reset({ password: "", confirmPassword: "" });

    saveSessionState({
      step: 1,
      email: emailForm.getValues("email"),
      emailVerified: false,
      otpVerified: false,
    });
  };

  const handleGoToLogin = () => {
    clearSessionState();
    resetToInitialState();
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
                  {isEmailLoading ? "Sending OTP..." : "Send OTP"}
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
                    {isOtpLoading ? "Verifying..." : "Verify OTP"}
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
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    New password
                  </label>

                  <div
                    className={`flex h-12 items-center gap-3 rounded-xl border px-4 transition ${
                      passwordForm.formState.errors.password
                        ? "border-red-500/40 bg-red-500/5"
                        : `border-white/10 bg-white/5 ${currentTheme.primaryRing}`
                    }`}
                  >
                    <LockKeyhole size={18} className="text-gray-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
                      {...passwordForm.register("password")}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-gray-400 transition hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {passwordForm.formState.errors.password && (
                    <p className="text-xs text-red-400">
                      {passwordForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Confirm password
                  </label>

                  <div
                    className={`flex h-12 items-center gap-3 rounded-xl border px-4 transition ${
                      passwordForm.formState.errors.confirmPassword
                        ? "border-red-500/40 bg-red-500/5"
                        : `border-white/10 bg-white/5 ${currentTheme.primaryRing}`
                    }`}
                  >
                    <LockKeyhole size={18} className="text-gray-400" />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 focus:outline-none"
                      {...passwordForm.register("confirmPassword")}
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="text-gray-400 transition hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="text-xs text-red-400">
                      {passwordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${currentTheme.primaryBtn}`}
                >
                  {isPasswordLoading ? "Updating Password..." : "Update Password"}
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