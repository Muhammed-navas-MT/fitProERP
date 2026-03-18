import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { AvailableSlotDay, TimeSlot } from "@/types/member/memberSessionType";

interface Props {
  activeDay?: AvailableSlotDay;
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

export function SlotSelectorCard({
  activeDay,
  selectedSlot,
  onSelectSlot,
}: Props) {
  return (
    <Card className="border border-gray-800 bg-[#0a0a0a]">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-orange-600">
            <Clock className="h-4 w-4" />
            <h2>Available Slots</h2>
          </div>

          <span className="text-xs uppercase tracking-wide text-gray-500">
            {activeDay?.slots.length || 0} Slots Found
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {activeDay?.slots.map((slot) => {
              const isSelected = selectedSlot?.slotId === slot.slotId;

              return (
                <motion.button
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={slot.slotId}
                  disabled={slot.isBooked}
                  onClick={() => onSelectSlot(slot)}
                  className={`relative rounded-2xl border p-4 text-left transition-all ${
                    slot.isBooked
                      ? "cursor-not-allowed border-gray-900 bg-zinc-950 opacity-50"
                      : isSelected
                        ? "border-orange-600 bg-orange-600/10 shadow-[0_0_0_1px_rgba(249,115,22,0.4)]"
                        : "border-gray-800 bg-zinc-950 hover:border-gray-700"
                  }`}
                >
                  <div className="space-y-1">
                    <div
                      className={`text-base font-semibold ${
                        isSelected ? "text-orange-500" : "text-white"
                      }`}
                    >
                      {slot.startTime} - {slot.endTime}
                    </div>

                    <div className="text-sm text-gray-400">
                      Amount: ₹{slot.amount}
                    </div>

                    {slot.isBooked && (
                      <div className="pt-1 text-xs font-medium uppercase text-gray-500">
                        Reserved
                      </div>
                    )}
                  </div>

                  {isSelected && (
                    <div className="absolute right-3 top-3">
                      <CheckCircle2 className="h-5 w-5 text-orange-500" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}