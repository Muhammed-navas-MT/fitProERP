import { AttendanceEntity } from "../../../domain/entities/shared/attendanceEntity";

export interface AttendanceRule {
  validate(attendance: AttendanceEntity): Promise<string>;
}
