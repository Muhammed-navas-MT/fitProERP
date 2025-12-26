import { AttendanceStatus } from "../../enums/attendanceStatus";

export interface TrainerAttendanceEntity {
  id?: string;
  trainerId: string;
  date: Date;
  status: AttendanceStatus;
  checkInTime?: Date;
  checkOutTime?: Date;
}
