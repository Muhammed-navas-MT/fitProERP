import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/validation/loginShema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

interface SignInFormProps {
  role: string;
  buttonColor: string;
  isLoading: boolean;
  onSubmit: (data: LoginSchemaType) => void;
  signUpLink?: string;
}

export function SignInForm({
  role,
  buttonColor,
  isLoading,
  onSubmit,
  signUpLink = "#",
}: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const submitHandler = (data: LoginSchemaType) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-5 w-full">
      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

          <Input
            {...register("email")}
            type="email"
            placeholder="Email address"
            className="bg-[#1A1D23] border-[#2A2D31] text-white placeholder:text-gray-500 pl-10 h-12 rounded-md"
          />

          {errors.email && (
            <p className="text-red-500 text-xs pt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="bg-[#1A1D23] border-[#2A2D31] text-white placeholder:text-gray-500 pl-10 pr-10 h-12 rounded-md"
          />

          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>

          {errors.password && (
            <p className="text-red-500 text-xs pt-1">{errors.password.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={rememberMe}
            onCheckedChange={(c) => setRememberMe(Boolean(c))}
          />
          <label className="text-sm text-gray-400 cursor-pointer">
            Remember me
          </label>
        </div>
        <a className="text-sm text-[#4C75FF] hover:underline">Forgot password?</a>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className={`${buttonColor} h-12 rounded-md`}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      {role !== "SUPERADMIN" && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2A2D31]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#111418] text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" className="bg-[#1A1D23] border-[#2A2D31]">
            Google
          </Button>

          <p className="text-center text-sm text-gray-400 pt-2">
            Don't have an account?{" "}
            <a href={signUpLink} className="text-[#4C75FF] hover:underline">
              Sign up
            </a>
          </p>
        </>
      )}
    </form>
  );
}
