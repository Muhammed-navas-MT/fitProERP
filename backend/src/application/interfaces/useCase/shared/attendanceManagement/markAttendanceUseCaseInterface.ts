import { MarkAttendanceDTO } from "../../../../dtos/shared/markAttendanceDTO";

export interface IMarkAttendanceUseCase{
    execute(data:MarkAttendanceDTO):Promise<void>
}