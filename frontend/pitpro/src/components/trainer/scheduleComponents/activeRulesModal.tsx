import { X, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slot {
  startTime: string;
  endTime: string;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-md bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl">

        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-[#2a2a2a]">
          <h2 className="text-white font-semibold">Rule Details</h2>

          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">

          {/* Dates */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>
              {rule.startDate} → {rule.endDate}
            </span>
          </div>

          {/* Status */}
          <div>
            <span
              className={`text-xs px-2 py-1 rounded-full border ${
                rule.isActive
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}
            >
              {rule.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Slots */}
          <div className="space-y-2">
            <h3 className="text-xs text-gray-400 uppercase">Slots</h3>

            {rule.slots.map((slot, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-[#0f0f0f] border border-[#2a2a2a] rounded-lg"
              >
                <span className="text-sm text-white flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  {slot.startTime} - {slot.endTime}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#2a2a2a] flex justify-between">
          
          {/* Close */}
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#2a2a2a] bg-[#1a1a1a] text-gray-300"
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