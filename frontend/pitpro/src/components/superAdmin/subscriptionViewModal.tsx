import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plan } from "./SubscriptionTable";

interface SubscriptionViewModalProps {
  open: boolean;
  onClose: () => void;
  plan: Plan|null;
}

export default function SubscriptionViewModal({
  open,
  onClose,
  plan,
}: SubscriptionViewModalProps) {
  if (!plan) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#111418] border border-gray-800 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {plan.planName} Plan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Price */}
          <div className="flex justify-between">
            <span className="text-gray-400">Price</span>
            <span className="font-semibold">₹ {plan.price}</span>
          </div>

          {/* Duration */}
          <div className="flex justify-between">
            <span className="text-gray-400">Duration</span>
            <span className="font-semibold">
              {plan.duration.replace("_", " ")}
            </span>
          </div>

          {/* Status */}
          <div className="flex justify-between">
            <span className="text-gray-400">Status</span>
            <span
              className={`font-semibold ${
                plan.isActive ? "text-green-500" : "text-red-500"
              }`}
            >
              {plan.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Limits */}
          <div>
            <h4 className="font-semibold mb-2">Limits</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-800/40 p-2 rounded">
                Max Branches: {plan.limits.maxBranches}
              </div>
              <div className="bg-gray-800/40 p-2 rounded">
                Max Trainers: {plan.limits.maxTrainers}
              </div>
              <div className="bg-gray-800/40 p-2 rounded">
                Max Members: {plan.limits.maxMembers}
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-2">Features</h4>
            <div className="flex flex-wrap gap-2">
              {plan.features.map((feature: string) => (
                <Badge
                  key={feature}
                  className="bg-blue-600 text-white text-xs"
                >
                  {feature.replace("_", " ")}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
