import { AttendanceUserType } from "../../../../../domain/enums/attendanceUserType";
import { CurrentMonthAttendanceListResponseDto } from "../../../../dtos/shared/markAttendanceDTO";

export interface IGetCurrentMonthAttendanceUseCase {
  execute(
    userId: string,
    userType: AttendanceUserType
  ): Promise<CurrentMonthAttendanceListResponseDto[]>;
}
