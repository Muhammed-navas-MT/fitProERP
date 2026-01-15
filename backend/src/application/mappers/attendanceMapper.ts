import { AttendanceEntity } from "../../domain/entities/shared/attendanceEntity";
import { AttendanceListItemResponseDTO } from "../dtos/shared/markAttendanceDTO";

export const mapAttendanceToListResponse = (
  attendance: AttendanceEntity
): AttendanceListItemResponseDTO => ({
  id: attendance.id as string,
  date: attendance.date,
  checkInTime: attendance.checkInTime,
  checkOutTime: attendance.checkOutTime,
  status: attendance.status,
});
