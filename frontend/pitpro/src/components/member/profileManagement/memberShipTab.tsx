import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, AlertCircle } from "lucide-react"
import { MemberDTO } from "./healthDetailsTab"

interface MembershipTabProps {
  member: MemberDTO
}

export function MembershipTab({ member }: MembershipTabProps) {
  if (!member.package) {
    return (
      <Card className="bg-[#0a0a0a] border border-gray-800 p-10 text-center rounded-xl shadow-lg">
        <AlertCircle size={32} className="text-gray-500 mx-auto mb-3" />
        <p className="text-gray-400">No active membership package</p>
      </Card>
    )
  }

  const pkg = member.package
  const startDate = new Date(pkg.startDate || "")
  const endDate = new Date(pkg.endDate || "")
  const today = new Date()

  const daysRemaining = Math.ceil(
    (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "expired":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "cancelled":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Package Card */}
      <Card className="bg-gradient-to-br from-orange-600/15 to-orange-500/5 border border-orange-500/30 p-8 rounded-2xl shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Plan {pkg.planId}
            </h3>
            <Badge
              className={`${getStatusColor(pkg.status)} border px-3 py-1`}
            >
              {pkg.status}
            </Badge>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-400">Monthly Fee</p>
            <p className="text-3xl font-bold text-orange-500">
              ₹{pkg.price}
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-orange-500/20">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Start Date
            </p>
            <p className="text-lg font-semibold text-white mt-2">
              {startDate.toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              End Date
            </p>
            <p className="text-lg font-semibold text-white mt-2">
              {endDate.toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Days Remaining
            </p>
            <p
              className={`text-lg font-semibold mt-2 ${
                daysRemaining > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {Math.max(0, daysRemaining)} days
            </p>
          </div>
        </div>
      </Card>

      {/* Membership Details */}
      <Card className="bg-[#0a0a0a] border border-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard size={20} className="text-orange-500" />
          <h3 className="text-lg font-semibold text-white">
            Membership Details
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-400">Plan ID</p>
              <p className="text-white font-mono font-semibold">
                {pkg.planId}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Monthly Cost</p>
              <p className="text-white font-semibold">₹{pkg.price}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-400">Total Duration</p>
              <p className="text-white font-semibold">
                {Math.ceil(
                  (endDate.getTime() - startDate.getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Status</p>
              <p className="text-white font-semibold capitalize">
                {pkg.status}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
