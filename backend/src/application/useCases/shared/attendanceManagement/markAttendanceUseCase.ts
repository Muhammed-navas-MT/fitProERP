import { AttendanceEntity } from "../../../../domain/entities/shared/attendanceEntity";
import { AttendanceStatus } from "../../../../domain/enums/attendanceStatus";
import { AttendanceRuleFactory } from "../../../../infrastructure/services/attendance/attendanceRuleFactory";
import { attendanceMessage } from "../../../../presentation/shared/constants/messages/attendanceMessages";
import { BadRequestException } from "../../../constants/exceptions";
import { MarkAttendanceDTO } from "../../../dtos/shared/markAttendanceDTO";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IAttendanceRepository } from "../../../interfaces/repository/shared/attendanceRepositoryInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IMarkAttendanceUseCase } from "../../../interfaces/useCase/shared/attendanceManagement/markAttendanceUseCaseInterface";


export class MarkAttendanceUseCase implements IMarkAttendanceUseCase{
  constructor(
    private _attendanceRepository: IAttendanceRepository,
    private _trainerRepository: ITrainerRepository,
    private _memberRepository:IMemberRepository
  ) {}

  async execute(data: MarkAttendanceDTO): Promise<void> {
    const existing = await this._attendanceRepository.findByUserAndDate(
      data.userId,
      data.date
    );

    if (existing) {
      throw new BadRequestException(attendanceMessage.ALREADY_MARKED);
    }


    const rule = AttendanceRuleFactory.create(
      data.userType,
      this._trainerRepository,
      this._memberRepository
    );

    const attendance: AttendanceEntity = {
      userId: data.userId,
      userType: data.userType,
      branchId: "",
      date: data.date,
      status: AttendanceStatus.PRESENT,
      checkInTime: new Date(),
    };

    const branchId = await rule.validate(attendance);

    await this._attendanceRepository.create({...attendance,branchId});
  }
}
