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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="rounded-xl border-2 border-orange-500 bg-gray-800 overflow-hidden shadow-xl">
      <div className="bg-black px-4 sm:px-8 py-6 sm:py-8 text-center border-b border-gray-700">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
            <Users className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-orange-500 mb-2">Owner Information</h2>
        <p className="text-xs sm:text-sm text-gray-400">Tell us about yourself</p>
      </div>

      <div className="px-4 sm:px-8 py-6 sm:py-8 space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.ownerName}
            onChange={(e) => onDataChange({ ownerName: e.target.value })}
            placeholder="Enter your name"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none text-sm sm:text-base transition-all hover:bg-gray-650"
          />
          {errors?.ownerName && (
            <p className="text-red-400 text-xs mt-1">{errors.ownerName}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onDataChange({ email: e.target.value })}
              placeholder="example@gmail.com"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none text-sm sm:text-base transition-all hover:bg-gray-650"
            />
            {errors?.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => onDataChange({ phone: e.target.value })}
              placeholder="Enter your number"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none text-sm sm:text-base transition-all hover:bg-gray-650"
            />
            {errors?.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => onDataChange({ password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none text-sm sm:text-base transition-all hover:bg-gray-650"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-orange-400 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors?.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => onDataChange({ confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none text-sm sm:text-base transition-all hover:bg-gray-650"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-orange-400 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors?.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}