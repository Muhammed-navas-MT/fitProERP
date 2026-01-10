import { SignupPayload } from "@/types/authPayload"
import { Users, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface OwnerInformationStepProps {
  formData: SignupPayload
  onDataChange: (data: Partial<SignupPayload>) => void
  errors: Record<string, string>
}

export default function OwnerInformationStep({
  formData,
  onDataChange,
  errors,
}: OwnerInformationStepProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  return (
    <div className="rounded-2xl border border-orange-500/40 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black overflow-hidden shadow-[0_0_40px_-12px_rgba(249,115,22,0.4)]">
      {/* Header */}
      <div className="bg-black px-4 sm:px-8 py-6 sm:py-8 text-center border-b border-neutral-800">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Users className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-orange-500 mb-2">Owner Information</h2>
        <p className="text-xs sm:text-sm text-neutral-400">Tell us about yourself</p>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-8 py-6 sm:py-8 space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.ownerName}
            onChange={(e) => onDataChange({ ownerName: e.target.value })}
            placeholder="Enter your name"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-neutral-900 text-white placeholder-neutral-500 border border-neutral-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
          />
          {errors?.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onDataChange({ email: e.target.value })}
              placeholder="example@gmail.com"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-neutral-900 text-white placeholder-neutral-500 border border-neutral-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
            {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onDataChange({ phone: e.target.value })}
              placeholder="Enter your number"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-neutral-900 text-white placeholder-neutral-500 border border-neutral-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            />
            {errors?.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => onDataChange({ password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 rounded-lg bg-neutral-900 text-white placeholder-neutral-500 border border-neutral-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-orange-400 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors?.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => onDataChange({ confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 rounded-lg bg-neutral-900 text-white placeholder-neutral-500 border border-neutral-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-orange-400 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors?.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
