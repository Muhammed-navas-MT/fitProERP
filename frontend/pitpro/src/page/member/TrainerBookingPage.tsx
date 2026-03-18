import React, { useState } from "react";
import { toast } from "sonner";
import { Sidebar } from "@/components/member/memberSidebar";
import { Topbar } from "@/components/member/topbar";
import {
  useCheckoutSession,
  useListAllSession,
  useListAvailableSlot,
} from "@/hook/member/slotAndBookingHooks";
import { useSelector } from "react-redux";
import { rootstate } from "@/store/store";
import type { TimeSlot, AvailableSlotDay } from "@/types/member/memberSessionType";
import { BookingHeader } from "@/components/member/trainerBookingComponents/bookingHeader";
import { BookingQuickStats } from "@/components/member/trainerBookingComponents/bookingQuickStats";
import { DateSelectorCard } from "@/components/member/trainerBookingComponents/dateSelectorCard";
import { SlotSelectorCard } from "@/components/member/trainerBookingComponents/slotSelectorCard";
import { BookingCtaCard } from "@/components/member/trainerBookingComponents/bookingCtaCard";
import { UpcomingSessionsSection } from "@/components/member/trainerBookingComponents/upcomingSessionsSection";
import { MonthlyGoalCard } from "@/components/member/trainerBookingComponents/monthlyGoalCard";
import { TrainerBookingPageSkeleton } from "@/components/member/trainerBookingComponents/trainerBookingPageSkeleton";

export default function TrainerBookingPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const name = useSelector((state: rootstate) => state.authData.name);

  const avatarText = name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const {
    data: availableData,
    isLoading: isLoadingSlots,
  } = useListAvailableSlot();

  const {
    data: sessionsData,
    isLoading: isLoadingSessions,
    refetch: refetchSessions,
  } = useListAllSession();

  const checkoutMutation = useCheckoutSession();

  

  const days: AvailableSlotDay[] = availableData?.data?.slots || [];
  const activeDay = days.find((d) => d.date === selectedDate) || days[0];

  React.useEffect(() => {
    if (days.length > 0 && !selectedDate) {
      setSelectedDate(days[0].date);
    }
  }, [days, selectedDate]);

  if (isLoadingSlots || isLoadingSessions) {
    return <TrainerBookingPageSkeleton avatar={avatarText} />;
  }

  const handleBooking = () => {
    if (!selectedSlot || !selectedDate) return;

    checkoutMutation.mutate(
      {
        trainerId: availableData?.data?.trainerId || "",
        slotId: selectedSlot.slotId,
        sessionDate: selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        amount: selectedSlot.amount,
      },
      {
        onSuccess: (response) => {
          const checkoutUrl = response?.data?.data ?? response?.data;

          if (checkoutUrl) {
            window.location.href = checkoutUrl;
            return;
          }

          toast.success("Redirecting to payment...");
          setSelectedSlot(null);
          refetchSessions();
        },
        onError: (err) => {
          toast.error(err?.message || "Booking failed");
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />

      <div className="md:ml-56">
        <Topbar
          avatar={avatarText}
          title="Trainer Booking"
          subtitle="Book your personal training session easily."
        />

        <main className="mx-auto w-full max-w-[1400px] space-y-6 p-4 lg:p-8">
          <BookingHeader />

          <BookingQuickStats
            days={days}
            activeDay={activeDay}
            upcomingSessionsCount={sessionsData?.data?.session?.length || 0}
          />

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <DateSelectorCard
                days={days}
                selectedDate={selectedDate}
                isLoadingSlots={isLoadingSlots}
                onSelectDate={(date) => {
                  setSelectedDate(date);
                  setSelectedSlot(null);
                }}
              />

              <SlotSelectorCard
                activeDay={activeDay}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
              />

              {selectedSlot && selectedDate && (
                <BookingCtaCard
                  selectedDate={selectedDate}
                  selectedSlot={selectedSlot}
                  isPending={checkoutMutation.isPending}
                  onConfirm={handleBooking}
                />
              )}
            </div>

            <div className="space-y-6 lg:col-span-4">
              <UpcomingSessionsSection
                isLoadingSessions={isLoadingSessions}
                sessions={sessionsData?.data?.session || []}
              />

              {/* <MonthlyGoalCard /> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}