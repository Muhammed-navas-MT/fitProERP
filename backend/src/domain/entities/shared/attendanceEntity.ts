import { AttendanceStatus } from "../../enums/attendanceStatus";
import { AttendanceUserType } from "../../enums/attendanceUserType";

export interface AttendanceEntity {
  id?: string;
  userId: string;
  userType: AttendanceUserType;
  branchId: string;
  date: Date;
  status: AttendanceStatus;
  checkInTime?: Date;
  checkOutTime?: Date;
}
