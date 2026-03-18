import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import type { TimeSlot } from "@/types/member/memberSessionType";

interface Props {
  selectedDate: string;
  selectedSlot: TimeSlot;
  isPending: boolean;
  onConfirm: () => void;
}

export function BookingCtaCard({
  selectedDate,
  selectedSlot,
  isPending,
  onConfirm,
}: Props) {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
      <Card className="overflow-hidden border border-orange-600/30 bg-gradient-to-r from-zinc-950 to-[#161616]">
        <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-600/15">
              <CalendarIcon className="h-6 w-6 text-orange-500" />
            </div>

            <div>
              <p className="text-sm text-gray-400">Confirm your session for</p>
              <p className="text-base font-semibold text-white">
                {format(parseISO(selectedDate), "MMMM dd, yyyy")} at{" "}
                {selectedSlot.startTime}
              </p>
              <p className="mt-1 text-sm text-orange-500">
                Session Fee: ₹{selectedSlot.amount}
              </p>
            </div>
          </div>

          <button
            onClick={onConfirm}
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-500 md:w-auto disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending
              ? "Redirecting..."
              : `Confirm Booking • ₹${selectedSlot.amount}`}
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}