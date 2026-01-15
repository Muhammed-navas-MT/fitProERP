import { AttendanceListItemResponseDTO, ListAttendanceRequestDto } from "../../../../dtos/shared/markAttendanceDTO";

export interface IGetAttendanceListUseCase {
    execute(params:ListAttendanceRequestDto): Promise<{ data: AttendanceListItemResponseDTO[]; total: number }>;
}