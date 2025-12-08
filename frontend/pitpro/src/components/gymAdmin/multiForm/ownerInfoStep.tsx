import { SignupPayload } from "@/types/authPayload"
import { Users } from "lucide-react"


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
  return (
    <div className="rounded-xl border-2 border-orange-500 bg-gray-800 overflow-hidden">
      <div className="bg-black px-8 py-8 text-center border-b border-gray-700">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
            <Users className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-orange-500 mb-2">Owner Information</h2>
        <p className="text-sm text-gray-400">Tell us about yourself</p>
      </div>

      <div className="px-8 py-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.ownerName}
            onChange={(e) => onDataChange({ ownerName: e.target.value })}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none"
          />
          {errors?.ownerName && (
            <p className="text-red-400 text-xs mt-1">{errors.ownerName}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onDataChange({ email: e.target.value })}
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none"
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
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none"
            />
            {errors?.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => onDataChange({ password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none"
            />
            {errors?.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => onDataChange({ confirmPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-500 border border-gray-600 focus:border-orange-500 focus:outline-none"
            />
            {errors?.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
