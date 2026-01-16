// utils/mapAttendanceToCalendar.ts
export type UIStatus = "present" | "absent" | "late" | "none";

interface BackendAttendance {
  date: string;
  status: "PRESENT" | "ABSENT" | "LEAVE" | "LATE";
  checkInTime?: string;
  checkOutTime?: string;
}


export function mapAttendanceToCalendar(
  data: BackendAttendance[],
  year: number,
  month: number
): UIStatus[][] {
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const lastDay = isCurrentMonth ? today.getDate() : new Date(year, month + 1, 0).getDate();

  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const attendanceMap = new Map<string, BackendAttendance>();
  data.forEach(item => {
    const d = new Date(item.date);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    attendanceMap.set(key, item);
  });

  const calendar: UIStatus[][] = [];
  let week: UIStatus[] = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    week.push("none");
  }

  for (let day = 1; day <= lastDay; day++) {
    const date = new Date(year, month, day);
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    const record = attendanceMap.get(key);

    if (date.getDay() === 0) {
      week.push("none");
    } else if (record) {
      switch (record.status) {
        case "PRESENT":
          week.push("present");
          break;
        case "LEAVE":
          week.push("none");
          break;
        default:
          week.push("absent");
      }
    } else {
      week.push("absent");
    }

    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) week.push("none");
    calendar.push(week);
  }

  return calendar;
}
