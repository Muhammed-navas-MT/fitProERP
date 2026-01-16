import { AttendanceEntity } from "../../domain/entities/shared/attendanceEntity";
import { AttendanceStatus } from "../../domain/enums/attendanceStatus";
import { AttendanceListItemResponseDTO, CurrentMonthAttendanceListResponseDto } from "../dtos/shared/markAttendanceDTO";

export const mapAttendanceToListResponse = (
  attendance: AttendanceEntity
): AttendanceListItemResponseDTO => ({
  id: attendance.id as string,
  date: attendance.date,
  checkInTime: attendance.checkInTime,
  checkOutTime: attendance.checkOutTime,
  status: attendance.status,
});


export function mapToMonthlyAttendanceWithSundayLeave(
  year: number,
  month: number,
  attendanceRecords: AttendanceEntity[]
): CurrentMonthAttendanceListResponseDto[] {
  const now = new Date();
  const isCurrentMonth = now.getFullYear() === year && now.getMonth() === month;
  const lastDay = isCurrentMonth ? now.getDate() : new Date(year, month + 1, 0).getDate();

  const attendanceMap = new Map<string, AttendanceEntity[]>();
  attendanceRecords.forEach(record => {
    const localDate = new Date(record.date);
    const key = localDate.toISOString().split("T")[0]; 
    if (!attendanceMap.has(key)) attendanceMap.set(key, []);
    attendanceMap.get(key)!.push(record);
  });

  const result: CurrentMonthAttendanceListResponseDto[] = [];

  for (let day = 1; day <= lastDay; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    const key = date.toISOString().split("T")[0];

    if (dayOfWeek === 0) {
      result.push({
        date,
        status: AttendanceStatus.LEAVE,
      });
      continue;
    }

    const recordsForDay = attendanceMap.get(key);

    if (recordsForDay && recordsForDay.length > 0) {
      const record = recordsForDay[recordsForDay.length - 1];
      result.push({
        date,
        status: record.status,
        checkInTime: record.checkInTime,
        checkOutTime: record.checkOutTime,
      });
    } else {
      result.push({
        date,
        status: AttendanceStatus.ABSENT,
      });
    }
  }

  return result;
}
