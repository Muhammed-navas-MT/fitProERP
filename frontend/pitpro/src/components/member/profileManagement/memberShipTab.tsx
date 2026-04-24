import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, AlertCircle } from "lucide-react";
import { MemberDetailType } from "./healthDetailsTab";

interface MembershipTabProps {
  member: MemberDetailType;
}

export function MembershipTab({ member }: MembershipTabProps) {
  if (!member.package) {
    return (
      <Card className="rounded-xl border border-gray-800 bg-[#0a0a0a] p-10 text-center shadow-lg">
        <AlertCircle size={32} className="mx-auto mb-3 text-gray-500" />
        <p className="text-gray-400">No active membership package</p>
      </Card>
    );
  }

  const pkg = member.package;
  const startDate = new Date(pkg.startDate || "");
  const endDate = new Date(pkg.endDate || "");
  const today = new Date();

  const daysRemaining = Math.ceil(
    (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  const totalDuration = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "border-green-500/30 bg-green-500/20 text-green-400";
      case "pending":
        return "border-yellow-500/30 bg-yellow-500/20 text-yellow-400";
      case "expired":
        return "border-red-500/30 bg-red-500/20 text-red-400";
      case "cancelled":
        return "border-gray-500/30 bg-gray-500/20 text-gray-400";
      default:
        return "border-gray-500/30 bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-600/15 to-orange-500/5 p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="mb-2 text-2xl font-bold text-white">
              Plan: {pkg.planName}
            </h3>
            <Badge className={`${getStatusColor(pkg.status)} border px-3 py-1`}>
              {pkg.status}
            </Badge>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-400">Monthly Fee</p>
            <p className="text-3xl font-bold text-orange-500">₹{pkg.price}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 border-t border-orange-500/20 pt-6 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Start Date
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {startDate.toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              End Date
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {endDate.toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Days Remaining
            </p>
            <p
              className={`mt-2 text-lg font-semibold ${
                daysRemaining > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {Math.max(0, daysRemaining)} days
            </p>
          </div>
        </div>
      </Card>

      <Card className="rounded-xl border border-gray-800 bg-[#0a0a0a] p-6 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <CreditCard size={20} className="text-orange-500" />
          <h3 className="text-lg font-semibold text-white">
            Membership Details
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-800 bg-[#111111] p-4">
            <p className="text-sm text-gray-400">Plan Name</p>
            <p className="mt-2 font-mono font-semibold text-white">
              {pkg.planName}
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#111111] p-4">
            <p className="text-sm text-gray-400">Monthly Cost</p>
            <p className="mt-2 font-semibold text-white">₹{pkg.price}</p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#111111] p-4">
            <p className="text-sm text-gray-400">Session Count</p>
            <p className="mt-2 font-semibold text-white">{pkg.sessionCount}</p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#111111] p-4">
            <p className="text-sm text-gray-400">Total Duration</p>
            <p className="mt-2 font-semibold text-white">
              {totalDuration} days
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#111111] p-4">
            <p className="text-sm text-gray-400">Status</p>
            <p className="mt-2 font-semibold capitalize text-white">
              {pkg.status}
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#111111] p-4">
            <p className="text-sm text-gray-400">Used Session Count</p>
            <p className="mt-2 font-semibold text-white">{pkg.usedSession}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
