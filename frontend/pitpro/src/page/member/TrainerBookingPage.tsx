import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, Check, User } from "lucide-react";
import { toast } from "sonner";
import { Sidebar } from "@/components/member/memberSidebar";
import { Topbar } from "@/components/member/topbar";
import {
  useCheckoutSession,
  useListAllSession,
  useListAvailableSlot,
} from "@/hook/member/slotAndBookingHooks";
import { useGetActiveTrainers } from "@/hook/member/trainerHooks";
import { useSelector } from "react-redux";
import { rootstate } from "@/store/store";
import type {
  TimeSlot,
  AvailableSlotDay,
} from "@/types/member/memberSessionType";
import { BookingQuickStats } from "@/components/member/trainerBookingComponents/bookingQuickStats";
import { DateSelectorCard } from "@/components/member/trainerBookingComponents/dateSelectorCard";
import { SlotSelectorCard } from "@/components/member/trainerBookingComponents/slotSelectorCard";
import { BookingCtaCard } from "@/components/member/trainerBookingComponents/bookingCtaCard";
import { UpcomingSessionsSection } from "@/components/member/trainerBookingComponents/upcomingSessionsSection";
import { TrainerBookingPageSkeleton } from "@/components/member/trainerBookingComponents/trainerBookingPageSkeleton";

interface ActiveTrainer {
  id: string;
  name: string;
  specialization: string[];
}

export default function TrainerBookingPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [selectedTrainerId, setSelectedTrainerId] = useState("");
  const [isTrainerDropdownOpen, setIsTrainerDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 4;

  const name = useSelector((state: rootstate) => state.authData.name);

  const avatarText = name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const { data: trainersData, isLoading: isLoadingTrainers } =
    useGetActiveTrainers();

  const trainers: ActiveTrainer[] = trainersData?.data ?? [];

  const selectedTrainer = useMemo(
    () => trainers.find((trainer) => trainer.id === selectedTrainerId),
    [trainers, selectedTrainerId],
  );

  useEffect(() => {
    if (trainers.length > 0 && !selectedTrainerId) {
      setSelectedTrainerId(trainers[0].id);
    }
  }, [trainers, selectedTrainerId]);

  const { data: availableData, isLoading: isLoadingSlots } =
    useListAvailableSlot(selectedTrainerId);

  const {
    data: sessionsData,
    isLoading: isLoadingSessions,
    refetch: refetchSessions,
  } = useListAllSession(page, limit);

  const total = sessionsData?.data?.total ?? 0;
  const totalPages = sessionsData?.data?.totalPages ?? 1;

  const checkoutMutation = useCheckoutSession(page,limit);

  const days: AvailableSlotDay[] = availableData?.data?.slots ?? [];
  const activeDay = days.find((d) => d.date === selectedDate) || days[0];
  useEffect(() => {
    if (availableData?.data?.trainerId) {
      setSelectedTrainerId(availableData.data.trainerId);
    }
  }, []);

  useEffect(() => {
    if (days.length > 0) {
      setSelectedDate(days[0].date);
      setSelectedSlot(null);
    } else {
      setSelectedDate(null);
      setSelectedSlot(null);
    }
  }, [selectedTrainerId, availableData]);

  if (isLoadingTrainers || isLoadingSlots || isLoadingSessions) {
    return <TrainerBookingPageSkeleton avatar={avatarText} />;
  }

  const handleBooking = () => {
    if (!selectedSlot || !selectedDate || !selectedTrainerId) {
      toast.error("Please select trainer, date and slot");
      return;
    }

    checkoutMutation.mutate(
      {
        trainerId: selectedTrainerId,
        slotId: selectedSlot.slotId,
        sessionDate: selectedDate,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        amount: selectedSlot.amount,
      },
      {
        onSuccess: (response) => {
          const checkoutUrl = response?.data?.url;

          if(checkoutUrl == "BOOKED_WITH_PACKAGE"){
            toast.success("Session booked Successfully")
            return;
          };

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
          <BookingQuickStats
            days={days}
            activeDay={activeDay}
            upcomingSessionsCount={sessionsData?.data?.countOfUpComingSession|| 0}
          />

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <DateSelectorCard
                  days={days}
                  selectedDate={selectedDate}
                  isLoadingSlots={isLoadingSlots}
                  onSelectDate={(date) => {
                    setSelectedDate(date);
                    setSelectedSlot(null);
                  }}
                />

                <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                  <div className="mb-3">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-orange-600">
                      <User className="h-4 w-4" />
                      Select Trainer
                    </h3>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsTrainerDropdownOpen((prev) => !prev)}
                      className="flex w-full items-center justify-between rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-left"
                    >
                      <span className="truncate text-sm text-white">
                        {selectedTrainer?.name || "Select Trainer"}
                      </span>

                      <ChevronDown
                        className={`h-4 w-4 text-zinc-400 transition-transform ${
                          isTrainerDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isTrainerDropdownOpen && (
                      <div className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-zinc-700 bg-zinc-950 shadow-2xl">
                        {trainers.length === 0 ? (
                          <div className="px-4 py-3 text-sm text-zinc-400">
                            No active trainers found
                          </div>
                        ) : (
                          trainers.map((trainer) => {
                            const isSelected = selectedTrainerId === trainer.id;

                            return (
                              <button
                                key={trainer.id}
                                type="button"
                                onClick={() => {
                                  setSelectedTrainerId(trainer.id);
                                  setSelectedSlot(null);
                                  setIsTrainerDropdownOpen(false);
                                }}
                                className="flex w-full items-start justify-between border-b border-zinc-800 px-4 py-3 text-left hover:bg-zinc-900"
                              >
                                <div>
                                  <p className="text-sm font-medium text-white">
                                    {trainer.name}
                                  </p>
                                  <p className="mt-1 text-xs text-zinc-400">
                                    {trainer.specialization.join(", ")}
                                  </p>
                                </div>

                                {isSelected && (
                                  <Check className="mt-1 h-4 w-4 text-purple-400" />
                                )}
                              </button>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <SlotSelectorCard
                activeDay={activeDay}
                selectedSlot={selectedSlot}
                onSelectSlot={setSelectedSlot}
              />

              {selectedSlot && selectedDate && selectedTrainerId && (
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
                page={page}
                limit={limit}
              />
              {/* Pagination */}
              <div className="flex items-center justify-between text-sm text-zinc-400 mt-4">
                <p>
                  Showing {(page - 1) * limit + 1} -{" "}
                  {Math.min(page * limit, total)} of {total}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1 rounded bg-zinc-800 text-white disabled:opacity-40"
                  >
                    Prev
                  </button>

                  <span>
                    Page {page} / {totalPages}
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 rounded bg-zinc-800 text-white disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
