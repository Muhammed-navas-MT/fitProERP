import { cn } from "@/lib/utils";

interface AttendanceCalendarProps {
  month: string;
  attendanceData: ("present" | "absent" | "late" | "none")[][];
}

export function AttendanceCalendar({ month, attendanceData }: AttendanceCalendarProps) {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getStatusColor = (status: "present" | "absent" | "late" | "none") => {
    switch (status) {
      case "present":
        return "bg-green-500";
      case "absent":
        return "bg-red-500";
      case "late":
        return "bg-yellow-500";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-3 sm:p-4 lg:p-6 min-w-0">
      <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">{month} month Attendance</h3>

      <div className="w-full min-w-0">
        <div className="grid grid-cols-7 gap-1 sm:gap-2 lg:gap-4 mb-2 sm:mb-4">
          {days.map(day => (
            <div key={day} className="text-center text-gray-400 text-[10px] sm:text-xs lg:text-sm font-semibold">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2 lg:gap-4">
          {attendanceData.flat().map((status, index) => (
            <div key={index} className="flex flex-col gap-2 items-center">
              <div className={cn("h-2.5 w-2.5 sm:h-3 sm:w-3 lg:h-4 lg:w-4 rounded-full", getStatusColor(status))} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
