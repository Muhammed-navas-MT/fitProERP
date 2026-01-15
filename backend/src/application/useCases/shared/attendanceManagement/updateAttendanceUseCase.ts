import { AttendanceEntity } from "../../../../domain/entities/shared/attendanceEntity";
import { AttendanceStatus } from "../../../../domain/enums/attendanceStatus";
import { AttendanceCheckOutRuleFactory } from "../../../../infrastructure/services/attendance/attendanceCheckOutRuleFactory";
import { attendanceMessage } from "../../../../presentation/shared/constants/messages/attendanceMessages";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import { IUpdateAttendceUseCase } from "../../../interfaces/useCase/shared/attendanceManagement/updateAttendanceUseCaseInterfance";
import { IAttendanceRepository } from "../../../interfaces/repository/shared/attendanceRepositoryInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";

export class UpdateAttendanceUseCase implements IUpdateAttendceUseCase {
  constructor(
    private _attendanceRepository: IAttendanceRepository,
    private _trainerRepository: ITrainerRepository,
    private _memberRepository: IMemberRepository
  ) {}

  async execute(attendanceId: string): Promise<void> {
    const attendance = await this._attendanceRepository.findById(attendanceId);

    if (!attendance) {
      throw new NOtFoundException(attendanceMessage.NOT_FOUND);
    }

    if (attendance.checkOutTime) {
      throw new BadRequestException(attendanceMessage.ALREADY_CHECKED_OUT);
    };

    const updatedAttendance: AttendanceEntity = {
      ...attendance,
      checkOutTime: new Date(),
      status: AttendanceStatus.PRESENT,
    };

    const rule = AttendanceCheckOutRuleFactory.create(
      attendance.userType,
      this._trainerRepository,
      this._memberRepository
    );

    await rule.validate(attendance);

    await this._attendanceRepository.update(
      {
        checkOutTime: updatedAttendance.checkOutTime,
        status: updatedAttendance.status,
      },
      attendanceId
    );
  }
}
