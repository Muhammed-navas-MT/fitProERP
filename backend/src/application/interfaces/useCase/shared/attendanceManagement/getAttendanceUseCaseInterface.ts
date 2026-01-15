import { AttendanceEntity } from "../../../../../domain/entities/shared/attendanceEntity";

export interface IGetAttendanceUseCase {
    execute(userId: string,date :Date):Promise<AttendanceEntity | null>;
}