import { useState } from "react";
import { Sidebar } from "@/components/trainer/trainerSidebar";
import { Header } from "@/components/trainer/trainerHeader";
import {
  Clock,
  Settings2,
  Plus,
  MoreHorizontal,
  User,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateSlotRuleModal } from "@/components/trainer/scheduleComponents/createSlotRuleModal";
import { ViewRuleModal } from "@/components/trainer/scheduleComponents/activeRulesModal";

const UPCOMING_SESSIONS = [
  {
    id: 1,
    client: "Alex Rivera",
    time: "09:00 AM",
    duration: "60 min",
    type: "Strength Training",
    status: "Confirmed" as const,
  },
  {
    id: 2,
    client: "Sarah Chen",
    time: "11:30 AM",
    duration: "45 min",
    type: "Yoga Flow",
    status: "Pending" as const,
  },
  {
    id: 3,
    client: "Marcus Vogt",
    time: "02:00 PM",
    duration: "60 min",
    type: "HIIT",
    status: "Confirmed" as const,
  },
  {
    id: 4,
    client: "Priya Sharma",
    time: "04:30 PM",
    duration: "60 min",
    type: "Pilates",
    status: "Confirmed" as const,
  },
];

const AVAILABLE_SLOTS = [
  { id: 1, time: "06:00 AM", status: "Available" },
  { id: 2, time: "07:00 AM", status: "Booked" },
  { id: 3, time: "08:00 AM", status: "Blocked" },
  { id: 4, time: "09:30 AM", status: "Available" },
];

const ruleData = {
  slots: [
    { startTime: "06:00", endTime: "07:00",amount:1000 },
    { startTime: "07:00", endTime: "08:00",amount :800 },
  ],
  startDate: "2026-03-17",
  endDate: "2026-03-19",
  isActive: true,
};

export default function TrainerSchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white">
      <Sidebar />

      <div className="lg:pl-[220px]">
        <Header
          title="Schedule"
          subtitle="Manage training sessions and availability"
          avatar="TR"
        />

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 lg:p-7">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-purple-400 mb-2">
                    Overview
                  </h2>
                  <p className="text-sm text-gray-400">
                    You have {UPCOMING_SESSIONS.length} sessions scheduled for
                    today.
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

              {/* Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Upcoming Sessions */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 px-1">
                      Upcoming Sessions
                    </h3>

                    <div className="space-y-3">
                      {UPCOMING_SESSIONS.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 rounded-xl border border-dashed border-[#2a2a2a] bg-[#1a1a1a]">
                          <Calendar className="w-8 h-8 text-gray-500 mb-3" />
                          <p className="text-sm text-gray-400">
                            No sessions today
                          </p>
                        </div>
                      ) : (
                        UPCOMING_SESSIONS.map((session) => (
                          <div
                            key={session.id}
                            className="group flex items-center justify-between p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] hover:border-purple-500/30 transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                                <User className="w-5 h-5" />
                              </div>

                              <div>
                                <h4 className="font-medium text-white">
                                  {session.client}
                                </h4>

                                <div className="flex items-center gap-3 mt-1">
                                  <span className="flex items-center gap-1 text-xs text-gray-400">
                                    <Clock className="w-3 h-3" /> {session.time}
                                  </span>
                                  <span className="text-gray-600">•</span>
                                  <span className="text-xs text-gray-400">
                                    {session.type}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <span
                                className={`text-xs px-2 py-1 rounded-full border ${
                                  session.status === "Confirmed"
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                    : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                                }`}
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

                  {/* ✅ Available Slots (FIXED POSITION) */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 px-1">
                      Available Slots
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {AVAILABLE_SLOTS.map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]"
                        >
                          <span className="text-sm text-white">
                            {slot.time}
                          </span>

                          <span
                            className={`text-xs px-2 py-1 rounded-full border ${
                              slot.status === "Available"
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                : slot.status === "Booked"
                                  ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                                  : "bg-red-500/10 border-red-500/30 text-red-400"
                            }`}
                          >
                            {slot.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE */}
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
                          1,248
                        </span>
                      </div>

                      <p className="text-xs text-gray-500">
                        Total sessions completed in your gym career.
                      </p>
                    </div>
                  </section>

                  <section className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/20">
                    <h3 className="text-sm font-medium text-purple-400 mb-2">
                      Rule-based Scheduling
                    </h3>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      Your availability is currently managed by 4 active RRULE
                      patterns. Clients can book slots up to 30 days in advance.
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

      <ViewRuleModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        rule={ruleData}
      />
    </div>
  );
}
