import { IGetCurrentMonthAttendanceUseCase } from "../../../interfaces/useCase/shared/attendanceManagement/getCurrentMonthAttendanceUseCaseInterface";
import { IAttendanceRepository } from "../../../interfaces/repository/shared/attendanceRepositoryInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { AttendanceEntity } from "../../../../domain/entities/shared/attendanceEntity";
import { AttendanceUserType } from "../../../../domain/enums/attendanceUserType";
import { AttendanceViewRuleFactory } from "../../../../infrastructure/services/attendance/attendanceViewRuleFactory";
import { CurrentMonthAttendanceListResponseDto } from "../../../dtos/shared/markAttendanceDTO";
import { mapToMonthlyAttendanceWithSundayLeave } from "../../../mappers/attendanceMapper";

export class GetCurrentMonthAttendanceUseCase
  implements IGetCurrentMonthAttendanceUseCase {

  constructor(
    private _attendanceRepository: IAttendanceRepository,
    private _trainerRepository: ITrainerRepository,
    private _memberRepository: IMemberRepository
  ) {}

  async execute(
    userId: string,
    userType: AttendanceUserType
  ): Promise<CurrentMonthAttendanceListResponseDto[]> {

    const rule = AttendanceViewRuleFactory.create(
      userType,
      this._trainerRepository,
      this._memberRepository
    );

    const branchId = await rule.resolveBranchId(userId);

     const attendances = await this._attendanceRepository.getCurrentMonthAttendance(
      userId,
      branchId
    );
    const day = new Date();
    return mapToMonthlyAttendanceWithSundayLeave(day.getFullYear(),day.getMonth(),attendances)
  }
}
