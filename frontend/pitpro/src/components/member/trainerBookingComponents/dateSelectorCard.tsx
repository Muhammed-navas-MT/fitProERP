import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { format, parseISO } from "date-fns";
import type { AvailableSlotDay } from "@/types/member/memberSessionType";

interface Props {
  days: AvailableSlotDay[];
  selectedDate: string | null;
  isLoadingSlots: boolean;
  onSelectDate: (date: string) => void;
}

export function DateSelectorCard({
  days,
  selectedDate,
  isLoadingSlots,
  onSelectDate,
}: Props) {
  return (
    <Card className="border border-gray-800 bg-[#0a0a0a]">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-orange-600">
          <CalendarDays className="h-4 w-4" />
          <h2>Select Date</h2>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {isLoadingSlots
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="min-w-[100px] animate-pulse rounded-2xl bg-zinc-900"
                    style={{ height: 96 }}
                  />
                ))
            : days.map((day) => {
                const dateObj = parseISO(day.date);
                const isSelected = selectedDate === day.date;

                return (
                  <button
                    key={day.date}
                    onClick={() => onSelectDate(day.date)}
                    className={`flex min-w-[100px] flex-col items-center justify-center rounded-2xl border px-4 py-4 transition-all ${
                      isSelected
                        ? "border-orange-600 bg-orange-600 text-white shadow-lg"
                        : "border-gray-800 bg-zinc-950 text-gray-400 hover:border-gray-700 hover:text-white"
                    }`}
                  >
                    <span className="text-[11px] font-medium uppercase tracking-wide opacity-70">
                      {format(dateObj, "EEE")}
                    </span>
                    <span className="text-xl font-bold">
                      {format(dateObj, "dd")}
                    </span>
                    <span className="mt-1 text-xs">{format(dateObj, "MMM")}</span>
                  </button>
                );
              })}
        </div>
      </CardContent>
    </Card>
  );
}