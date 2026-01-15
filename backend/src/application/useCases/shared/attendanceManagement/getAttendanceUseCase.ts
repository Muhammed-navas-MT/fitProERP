import { AttendanceEntity } from "../../../../domain/entities/shared/attendanceEntity";
import { NOtFoundException } from "../../../constants/exceptions";
import { attendanceMessage } from "../../../../presentation/shared/constants/messages/attendanceMessages";
import { IAttendanceRepository } from "../../../interfaces/repository/shared/attendanceRepositoryInterface";
import { IGetAttendanceUseCase } from "../../../interfaces/useCase/shared/attendanceManagement/getAttendanceUseCaseInterface";

export class GetAttendanceUseCase implements IGetAttendanceUseCase {
  constructor(
    private _attendanceRepository: IAttendanceRepository
  ) {}

  async execute(userId: string,date :Date): Promise<AttendanceEntity | null>{
    const attendance = await this._attendanceRepository.findByUserAndDate(userId,date);

    if (!attendance) {
      throw new NOtFoundException(attendanceMessage.NOT_FOUND);
    }

    return attendance;
  }
}
