import { AttendanceEntity } from "../../../../domain/entities/shared/attendanceEntity";
import { AttendanceListItemResponseDTO, AttendanceListResponseDTO, ListAttendanceRequestDto } from "../../../dtos/shared/markAttendanceDTO";
import { IAttendanceRepository } from "../../../interfaces/repository/shared/attendanceRepositoryInterface";
import { IGetAttendanceListUseCase } from "../../../interfaces/useCase/shared/attendanceManagement/getAttendanceListUseCaseInterface";
import { mapAttendanceToListResponse } from "../../../mappers/attendanceMapper";

export class GetAttendanceListUseCase implements IGetAttendanceListUseCase {
  constructor(private _attendanceRepository: IAttendanceRepository) {}

  async execute(
    params: ListAttendanceRequestDto
  ): Promise<{ data:AttendanceListItemResponseDTO[]; total: number }> {
    const attendances = await this._attendanceRepository.findAll(params);
    return {
      data: attendances.data.map(mapAttendanceToListResponse),
      total: attendances.total,
    };
  }
}
