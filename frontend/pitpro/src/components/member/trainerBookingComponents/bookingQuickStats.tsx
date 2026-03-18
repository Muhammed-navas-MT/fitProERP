import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock, Activity } from "lucide-react";
import type { AvailableSlotDay } from "@/types/member/memberSessionType";

interface Props {
  days: AvailableSlotDay[];
  activeDay?: AvailableSlotDay;
  upcomingSessionsCount: number;
}

export function BookingQuickStats({
  days,
  activeDay,
  upcomingSessionsCount,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card className="border border-gray-800 bg-[#0a0a0a] shadow-sm hover:shadow-md">
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-400">Available Days</p>
              <p className="text-3xl font-bold text-orange-600">{days.length}</p>
              <p className="text-xs text-gray-500">Currently open</p>
            </div>
            <div className="rounded-lg bg-green-700 p-3">
              <CalendarDays className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-800 bg-[#0a0a0a] shadow-sm hover:shadow-md">
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-400">Open Slots</p>
              <p className="text-3xl font-bold text-orange-600">
                {activeDay?.slots?.filter((slot) => !slot.isBooked).length || 0}
              </p>
              <p className="text-xs text-gray-500">For selected day</p>
            </div>
            <div className="rounded-lg bg-purple-700 p-3">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-gray-800 bg-[#0a0a0a] shadow-sm hover:shadow-md">
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-400">Upcoming Sessions</p>
              <p className="text-3xl font-bold text-orange-600">
                {upcomingSessionsCount}
              </p>
              <p className="text-xs text-gray-500">Already booked</p>
            </div>
            <div className="rounded-lg bg-indigo-700 p-3">
              <Activity className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}