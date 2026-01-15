import { AttendanceEntity } from "../../../../domain/entities/shared/attendanceEntity";
import { ListAttendanceRequestDto } from "../../../dtos/shared/markAttendanceDTO";
import { IBaseRepository } from "../base/baseRepo";

export interface IAttendanceRepository extends IBaseRepository<AttendanceEntity> {
  findByUserAndDate(
    userId: string,
    date: Date
  ): Promise<AttendanceEntity | null>;
  findAll( params: ListAttendanceRequestDto): Promise<{ data: AttendanceEntity[]; total: number }>
}
