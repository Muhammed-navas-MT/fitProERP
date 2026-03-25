import { X, Calendar, Clock, Wallet, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFindSlotRule } from "@/hook/trainer/slotRuleHooks";

interface Slot {
  _id?: string;
  startTime: string;
  endTime: string;
  amount: number;
}

interface RuleData {
  _id: string;
  slots: Slot[];
  startDate: string;
  endDate?: string;
  isActive: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const formatDate = (date?: string) => {
  if (!date) return "No end date";
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const ViewRuleModal = ({ isOpen, onClose }: Props) => {
  const { data, isLoading: isFindingRule } = useFindSlotRule();
  const existingRule: RuleData | undefined = data?.data;

  if (!isOpen) return null;

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
        {isFindingRule ? (
          <div className="flex items-center justify-center py-10 text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Loading rule...
          </div>
        ) : !existingRule ? (
          <div className="py-10 text-center text-sm text-gray-400">
            No slot rule found
          </div>
        ) : (
          <>
            <div className="space-y-5 p-5">

              {/* Dates */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(existingRule.startDate)} →{" "}
                  {formatDate(existingRule.endDate)}
                </span>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`rounded-full border px-2 py-1 text-xs ${
                    existingRule.isActive
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-red-500/30 bg-red-500/10 text-red-400"
                  }`}
                >
                  {existingRule.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Slots */}
              <div className="space-y-2">
                <h3 className="text-xs uppercase text-gray-400">Slots</h3>

                {existingRule.slots.map((slot) => (
                  <div
                    key={slot._id ?? `${slot.startTime}-${slot.endTime}`}
                    className="flex items-center justify-between rounded-lg border border-[#2a2a2a] bg-[#0f0f0f] p-3"
                  >
                    <div className="flex items-center gap-2 text-sm text-white">
                      <Clock className="h-3 w-3" />
                      {slot.startTime} - {slot.endTime}
                    </div>

                    <div className="flex items-center gap-1 text-sm font-medium text-purple-400">
                      <Wallet className="h-3 w-3" />
                      ₹{slot.amount}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-[#2a2a2a] p-5">
              <Button
                onClick={onClose}
                className="bg-[#2a2a2a] hover:bg-[#333] text-white"
              >
                Close
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};