import { Document, model } from "mongoose";
import { attendanceSchema } from "../schemas/attendanceSchema";
import { AttendanceUserType } from "../../../../domain/enums/attendanceUserType";
import { AttendanceStatus } from "../../../../domain/enums/attendanceStatus";

export interface IAttendanceModel extends Document {
  _id: string;
  userId: string;
  userType: AttendanceUserType;
  branchId: string;
  date: Date;
  status: AttendanceStatus;
  checkInTime?: Date;
  checkOutTime?: Date;
}

export const AttendanceModel = model<IAttendanceModel>(
  "Attendance",
  attendanceSchema
);

