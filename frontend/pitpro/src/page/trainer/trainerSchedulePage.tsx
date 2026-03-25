import { useMemo, useState } from "react";
import { Sidebar } from "@/components/trainer/trainerSidebar";
import { Header } from "@/components/trainer/trainerHeader";
import {
  Clock,
  Settings2,
  Plus,
  MoreHorizontal,
  User,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateSlotRuleModal } from "@/components/trainer/scheduleComponents/createSlotRuleModal";
import { ViewRuleModal } from "@/components/trainer/scheduleComponents/activeRulesModal";
import { useListSession } from "@/hook/trainer/sessionHooks";
import { useListSlot } from "@/hook/trainer/slotRuleHooks";
import { TrainerSlotCard } from "@/components/trainer/scheduleComponents/trainerSlotCard";

enum SessionStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

interface ListSessionItem {
  id: string;
  memberDetail: {
    name: string;
    profileImg?: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  status: SessionStatus;
}

interface TrainerSlotItem {
  startTime: string;
  endTime: string;
  isBooked: boolean;
  amount?: number;
}

interface TrainerSlotDay {
  date: string;
  slots: TrainerSlotItem[];
}

const LIMIT = 6;

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusClass = (status: SessionStatus) => {
  switch (status) {
    case SessionStatus.CONFIRMED:
      return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
    case SessionStatus.PENDING:
      return "bg-yellow-500/10 border-yellow-500/30 text-yellow-400";
    case SessionStatus.COMPLETED:
      return "bg-purple-500/10 border-purple-500/30 text-purple-400";
    case SessionStatus.CANCELLED:
      return "bg-red-500/10 border-red-500/30 text-red-400";
    default:
      return "bg-zinc-500/10 border-zinc-500/30 text-zinc-400";
  }
};

const getDayName = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
  });
};

const getDayNumber = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
  });
};

const getMonthShort = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    month: "short",
  });
};

export default function TrainerSchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const {
    data: sessionRes,
    isLoading: isSessionLoading,
    isError: isSessionError,
  } = useListSession(page, LIMIT);

  const {
    data: slotRes,
    isLoading: isSlotLoading,
    isError: isSlotError,
  } = useListSlot();

  const sessionData = sessionRes?.data;
  const sessions: ListSessionItem[] = sessionData?.sessions ?? [];
  const totalPages = sessionData?.totalPages ?? 1;
  const total = sessionData?.total ?? 0;

  const slotData: TrainerSlotDay[] = slotRes?.data?.slots ?? [];

  const selectedDaySlots = useMemo(() => {
    if (!selectedDate && slotData.length > 0) {
      return slotData[0].slots;
    }
    return slotData.find((day) => day.date === selectedDate)?.slots ?? [];
  }, [slotData, selectedDate]);

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      <Sidebar />

      <div className="lg:pl-[220px] w-full">
        <Header
          title="Schedule"
          subtitle="Manage training sessions and availability"
          avatar="TR"
        />

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 lg:p-7">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-purple-400 mb-2">
                    Overview
                  </h2>
                  <p className="text-sm text-gray-400">
                    You have {total} total sessions.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsViewOpen(true)}
                    className="border-[#2a2a2a] bg-[#1a1a1a] hover:bg-[#2a2a2a] text-gray-300 gap-2"
                  >
                    <Settings2 className="w-4 h-4" />
                    View Active Rules
                  </Button>

                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-purple-500 hover:bg-purple-600 text-white gap-2 shadow-lg shadow-purple-500/20"
                  >
                    <Plus className="w-4 h-4" />
                    Create Slot Rule
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Upcoming Sessions */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 px-1">
                        Upcoming Sessions
                      </h3>

                      {totalPages > 1 && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              setPage((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={page === 1}
                            className="border-[#2a2a2a] bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a]"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>

                          <span className="text-xs text-gray-400">
                            Page {page} of {totalPages}
                          </span>

                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              setPage((prev) => Math.min(prev + 1, totalPages))
                            }
                            disabled={page === totalPages}
                            className="border-[#2a2a2a] bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a]"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {isSessionLoading ? (
                        <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-[#2a2a2a] bg-[#1a1a1a]">
                          <Loader2 className="w-8 h-8 animate-spin text-purple-400 mb-3" />
                          <p className="text-sm text-gray-400">
                            Loading sessions...
                          </p>
                        </div>
                      ) : isSessionError ? (
                        <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-red-500/20 bg-[#1a1a1a]">
                          <p className="text-sm text-red-400">
                            Failed to load sessions
                          </p>
                        </div>
                      ) : sessions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-[#2a2a2a] bg-[#1a1a1a]">
                          <Calendar className="w-8 h-8 text-gray-500 mb-3" />
                          <p className="text-sm text-gray-400">
                            No sessions found
                          </p>
                        </div>
                      ) : (
                        sessions.map((session) => (
                          <div
                            key={session.id}
                            className="group flex items-center justify-between p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-purple-500/30 transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 overflow-hidden">
                                {session.memberDetail.profileImg ? (
                                  <img
                                    src={session.memberDetail.profileImg}
                                    alt={session.memberDetail.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <User className="w-5 h-5" />
                                )}
                              </div>

                              <div>
                                <h4 className="font-medium text-white">
                                  {session.memberDetail.name}
                                </h4>

                                <div className="flex flex-wrap items-center gap-3 mt-1">
                                  <span className="flex items-center gap-1 text-xs text-gray-400">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(session.date)}
                                  </span>

                                  <span className="text-gray-600">•</span>

                                  <span className="flex items-center gap-1 text-xs text-gray-400">
                                    <Clock className="w-3 h-3" />
                                    {session.startTime} - {session.endTime}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <span
                                className={`text-xs px-2 py-1 rounded-full border ${getStatusClass(
                                  session.status,
                                )}`}
                              >
                                {session.status}
                              </span>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  {/* slot */}
                  <section className="rounded-3xl border border-purple-500/10 bg-[#1a1a1a] p-4 ">
                    {/* Header */}
                    <div className="mb-4 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <h3 className="text-sm font-semibold text-purple-300">
                        Select Date
                      </h3>
                    </div>

                    {isSlotLoading ? (
                      <div className="flex items-center justify-center py-10 text-gray-400">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Loading slots...
                      </div>
                    ) : isSlotError ? (
                      <div className="py-8 text-center text-red-400">
                        Failed to load slot dates
                      </div>
                    ) : slotData.length === 0 ? (
                      <div className="py-8 text-center text-gray-400">
                        No slot dates available
                      </div>
                    ) : (
                      <div className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-1">
                        {slotData.map((day, index) => {
                          const currentSelectedDate =
                            selectedDate ?? slotData[0]?.date ?? null;
                          const isSelected = currentSelectedDate === day.date;

                          return (
                            <button
                              key={`${day.date}-${index}`}
                              onClick={() => setSelectedDate(day.date)}
                              className={`min-w-[85px] px-3 py-3 mb-4 rounded-xl border transition-all  ${
                                isSelected
                                  ? "border-purple-500 bg-purple-500/20 text-white shadow-md"
                                  : "border-[#2a2a2a] bg-[#121212] text-gray-400 hover:border-purple-500/40"
                              }`}
                            >
                              <div className="text-[10px] font-medium uppercase">
                                {getDayName(day.date)}
                              </div>

                              <div className="mt-1 text-xl font-bold">
                                {getDayNumber(day.date)}
                              </div>

                              <div className="text-[11px]">
                                {getMonthShort(day.date)}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </section>
                  {/* Available Slots */}
                  <section className="rounded-3xl border border-purple-500/10 bg-[#1a1a1a] p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-400" />
                        <h3 className="text-lg font-semibold text-purple-300">
                          Available Slots
                        </h3>
                      </div>

                      <span className="text-xs uppercase tracking-wider text-gray-500">
                        {selectedDaySlots.length} slots found
                      </span>
                    </div>

                    {isSlotLoading ? (
                      <div className="grid grid-cols-1 gap-3">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <div
                            key={index}
                            className="h-24 animate-pulse rounded-2xl border border-purple-500/10 bg-[#161122]"
                          />
                        ))}
                      </div>
                    ) : !(selectedDate ?? slotData[0]?.date) ? (
                      <div className="py-10 text-center text-gray-400">
                        Select a date to view slots
                      </div>
                    ) : selectedDaySlots.length === 0 ? (
                      <div className="py-10 text-center text-gray-400">
                        No slots available for this date
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-3">
                        {selectedDaySlots.map((slot, index) => (
                          <TrainerSlotCard
                            key={`${slot.startTime}-${slot.endTime}-${index}`}
                            slot={slot}
                          />
                        ))}
                      </div>
                    )}
                  </section>
                </div>

                <div className="space-y-8">
                  <section className="p-6 rounded-2xl bg-[#1a1a1a] border border-[#2a2a2a]">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-4">
                      Quick Stats
                    </h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-sm text-gray-400">
                          Total Sessions
                        </span>
                        <span className="text-xl font-semibold text-white">
                          {total}
                        </span>
                      </div>

                      <div className="flex justify-between items-end">
                        <span className="text-sm text-gray-400">
                          Current Page
                        </span>
                        <span className="text-xl font-semibold text-white">
                          {page}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500">
                        Showing paginated trainer session data from backend.
                      </p>
                    </div>
                  </section>

                  <section className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/20">
                    <h3 className="text-sm font-medium text-purple-400 mb-2">
                      Rule-based Scheduling
                    </h3>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      Manage your availability rules and review upcoming booked
                      sessions from members here.
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <CreateSlotRuleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ViewRuleModal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} />
    </div>
  );
}
