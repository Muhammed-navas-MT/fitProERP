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
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
      <h3 className="text-white font-semibold text-lg mb-6">{month} month Attendance</h3>

      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          <div className="grid grid-cols-7 gap-4 mb-4">
            {days.map(day => (
              <div key={day} className="text-center text-gray-400 text-sm font-semibold">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-4">
            {attendanceData.flat().map((status, index) => (
              <div key={index} className="flex flex-col gap-2 items-center">
                <div className={cn("h-4 w-4 rounded-full", getStatusColor(status))} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
