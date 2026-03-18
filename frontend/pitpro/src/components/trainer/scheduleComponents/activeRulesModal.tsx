import { X, Calendar, Clock, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slot {
  startTime: string;
  endTime: string;
  amount: number;
}

interface RuleData {
  slots: Slot[];
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
  rule: RuleData | null;
}

export const ViewRuleModal = ({
  isOpen,
  onClose,
  onUpdate,
  rule,
}: Props) => {
  if (!isOpen || !rule) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2a2a2a] p-5">
          <h2 className="text-lg font-semibold text-white">Rule Details</h2>

          <button
            onClick={onClose}
            className="text-gray-400 transition hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-5">

          {/* Dates */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>
              {rule.startDate} → {rule.endDate}
            </span>
          </div>

          {/* Status */}
          <div>
            <span
              className={`rounded-full border px-2 py-1 text-xs ${
                rule.isActive
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-red-500/30 bg-red-500/10 text-red-400"
              }`}
            >
              {rule.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Slots */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase text-gray-400">Slots</h3>

            {rule.slots.map((slot, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-[#2a2a2a] bg-[#0f0f0f] p-3"
              >
                {/* Time */}
                <div className="flex items-center gap-2 text-sm text-white">
                  <Clock className="h-3 w-3" />
                  {slot.startTime} - {slot.endTime}
                </div>

                {/* Amount */}
                <div className="flex items-center gap-1 text-sm text-purple-400 font-medium">
                  <Wallet className="h-3 w-3" />
                  ₹{slot.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between border-t border-[#2a2a2a] p-5">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#2a2a2a] bg-[#1a1a1a] text-gray-300 hover:bg-[#252525] hover:text-white"
          >
            Close
          </Button>

          <Button
            onClick={onUpdate}
            className="bg-purple-500 hover:bg-purple-600"
          >
            Update Rule
          </Button>
        </div>
      </div>
    </div>
  );
};