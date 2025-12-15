import { Calendar } from "lucide-react"

interface SubscriptionCardProps {
  currentPlan: string
  monthlyCost: string | number
  memberSince: string
}

export default function SubscriptionCard({ currentPlan, monthlyCost, memberSince }: SubscriptionCardProps) {
  return (
    <div className="bg-[#0a0b0d] border border-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6">Subscription Details</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Current Plan</span>
          <span className="text-lg font-semibold text-white">{currentPlan}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Monthly Cost</span>
          <span className="text-lg font-semibold text-white">{monthlyCost}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <Calendar className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">Member since {memberSince}</span>
        </div>
      </div>
    </div>
  )
}
