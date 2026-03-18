import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  useCheckoutSession,
  useListAvailableSlot,
} from "@/hook/member/slotAndBookingHooks";
import { CreateMemberSessionCheckoutType } from "@/types/member/memberSessionType";

interface SlotItem {
  slotId: string;
  startTime: string;
  endTime: string;
  amount:number;
  isBooked: boolean;
}

interface DaySlot {
  date: string;
  slots: SlotItem[];
}

interface AvailableSlotResponse {
  trainerId: string;
  slots: DaySlot[];
}

export default function Index() {
  const { data, isLoading } = useListAvailableSlot();
  const { mutate: checkoutSession, isPending: isCheckoutLoading } =
    useCheckoutSession();

  const slotData: AvailableSlotResponse | undefined = data?.data;
  const dates = slotData?.slots ?? [];
  console.log(slotData)

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0].date);
    }
  }, [dates, selectedDate]);

  const activeDay = useMemo(() => {
    return dates.find((d) => d.date === selectedDate);
  }, [dates, selectedDate]);

  const selectedSlotData = activeDay?.slots.find(
    (slot) => slot.slotId === selectedSlot,
  );

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleConfirmBooking = () => {
    if (!slotData?.trainerId || !selectedSlot || !selectedDate) return;

    const payload: CreateMemberSessionCheckoutType = {
      trainerId: slotData.trainerId,
      slotId: selectedSlot,
      sessionDate: selectedDate,
      startTime: selectedSlotData?.startTime as string,
      endTime: selectedSlotData?.endTime as string,
      amount: selectedSlotData?.amount as number,
    };

    checkoutSession(payload, {
      onSuccess: (response) => {
        console.log(response)
        const checkoutUrl = response?.data?.url ?? response?.data;
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        }
      },
      onError: (error) => {
        console.error("Checkout session error:", error);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-svh bg-background p-6">
        <div className="mx-auto max-w-md">
          <header className="mb-8">
            <h1 className="text-sm font-medium uppercase tracking-widest text-muted-foreground/60">
              Schedule
            </h1>
            <p className="text-2xl font-semibold tracking-tight text-foreground">
              Select a Session
            </p>
          </header>

          <div className="mb-10 flex gap-2 overflow-x-auto pb-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="min-w-[72px] animate-pulse rounded-2xl border bg-card p-4"
              >
                <div className="mx-auto mb-2 h-3 w-10 rounded bg-muted" />
                <div className="mx-auto h-6 w-8 rounded bg-muted" />
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border bg-card p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-2 h-3 w-12 rounded bg-muted" />
                    <div className="h-5 w-36 rounded bg-muted" />
                  </div>
                  <div className="h-4 w-4 rounded-full bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!slotData || dates.length === 0) {
    return (
      <div className="min-h-svh bg-background p-6">
        <div className="mx-auto max-w-md">
          <header className="mb-8">
            <h1 className="text-sm font-medium uppercase tracking-widest text-muted-foreground/60">
              Schedule
            </h1>
            <p className="text-2xl font-semibold tracking-tight text-foreground">
              Select a Session
            </p>
          </header>

          <div className="rounded-2xl border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">
              No available slots found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background p-6">
      <div className="mx-auto max-w-md">
        <header className="mb-8">
          <h1 className="text-sm font-medium uppercase tracking-widest text-muted-foreground/60">
            Schedule
          </h1>
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            Select a Session
          </p>
        </header>

        <DateRibbon
          dates={dates.map((d) => d.date)}
          selectedDate={selectedDate}
          onSelect={handleDateSelect}
        />

        <div className="space-y-3">
          {activeDay?.slots?.length ? (
            activeDay.slots.map((slot) => (
              <SlotCard
                key={slot.slotId}
                slot={slot}
                isSelected={selectedSlot === slot.slotId}
                onSelect={() => setSelectedSlot(slot.slotId)}
              />
            ))
          ) : (
            <div className="rounded-2xl border bg-card p-5 text-center">
              <p className="text-sm text-muted-foreground">
                No slots available for this date.
              </p>
            </div>
          )}
        </div>

        <AnimatePresence>
          {selectedSlot && selectedSlotData && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="fixed bottom-8 left-6 right-6 mx-auto max-w-md"
            >
              <button
                onClick={handleConfirmBooking}
                disabled={isCheckoutLoading}
                className={cn(
                  "h-14 w-full rounded-2xl bg-foreground font-semibold text-background shadow-2xl transition-transform active:scale-[0.98]",
                  isCheckoutLoading && "cursor-not-allowed opacity-70",
                )}
              >
                {isCheckoutLoading
                  ? "Redirecting..."
                  : `Confirm Booking • ${selectedDate} • ${selectedSlotData.startTime} - ${selectedSlotData.endTime}`}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface DateRibbonProps {
  dates: string[];
  selectedDate: string;
  onSelect: (date: string) => void;
}

function DateRibbon({ dates, selectedDate, onSelect }: DateRibbonProps) {
  return (
    <div className="no-scrollbar mb-10 flex gap-2 overflow-x-auto pb-2">
      {dates.map((date) => {
        const dateObj = new Date(`${date}T00:00:00`);
        const isSelected = selectedDate === date;

        return (
          <button
            key={date}
            onClick={() => onSelect(date)}
            className={cn(
              "flex min-w-[72px] flex-col items-center rounded-2xl border py-4 transition-all duration-200",
              isSelected
                ? "border-border bg-card shadow-[var(--shadow-soft)]"
                : "border-transparent opacity-50 hover:opacity-100",
            )}
          >
            <span className="mb-1 text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
              {dateObj.toLocaleDateString("en-US", { weekday: "short" })}
            </span>
            <span className="font-mono-time text-xl font-bold">
              {dateObj.getDate()}
            </span>
          </button>
        );
      })}
    </div>
  );
}

interface SlotCardProps {
  slot: SlotItem;
  isSelected: boolean;
  onSelect: () => void;
}

function SlotCard({ slot, isSelected, onSelect }: SlotCardProps) {
  return (
    <motion.div
      layout
      onClick={() => !slot.isBooked && onSelect()}
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300",
        slot.isBooked
          ? "cursor-not-allowed border-transparent bg-muted/30 opacity-40"
          : "cursor-pointer bg-card",
        isSelected
          ? "border-primary ring-1 ring-primary"
          : !slot.isBooked && "border-border hover:shadow-[var(--shadow-soft)]",
      )}
    >
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground/60">
            Time
          </span>
          <span className="font-mono-time text-lg font-bold tracking-tight">
            {slot.startTime} — {slot.endTime}
          </span>
        </div>

        <div className="text-right">
          {slot.isBooked ? (
            <span className="text-xs font-bold uppercase text-muted-foreground">
              Reserved
            </span>
          ) : (
            <div
              className={cn(
                "h-3 w-3 rounded-full transition-colors",
                isSelected ? "bg-primary" : "bg-green-500",
              )}
            />
          )}
        </div>
      </div>

      {slot.isBooked && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
            backgroundSize: "10px 10px",
          }}
        />
      )}
    </motion.div>
  );
}
