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
import { AttendanceUserType } from "../../../../domain/enums/attendanceUserType";

export class UpdateAttendanceUseCase implements IUpdateAttendceUseCase {
  constructor(
    private _attendanceRepository: IAttendanceRepository,
    private _trainerRepository: ITrainerRepository,
    private _memberRepository: IMemberRepository
  ) {}

  async execute(attendanceId: string): Promise<void> {

    const rawAttendance = await this._attendanceRepository.findById(attendanceId);
    if (!rawAttendance) {
      throw new NOtFoundException(attendanceMessage.NOT_FOUND);
    }

    if (rawAttendance.checkOutTime) {
      throw new BadRequestException(attendanceMessage.ALREADY_CHECKED_OUT);
    }

    const attendance: AttendanceEntity = {
      id: attendanceId,
      userId: rawAttendance.userId.toString(),
      userType: rawAttendance.userType as AttendanceUserType,
      branchId: rawAttendance.branchId.toString(),
      date: new Date(rawAttendance.date),
      status: rawAttendance.status as AttendanceStatus,
      checkInTime: rawAttendance.checkInTime
        ? new Date(rawAttendance.checkInTime)
        : undefined,
      checkOutTime: rawAttendance.checkOutTime
        ? new Date(rawAttendance.checkOutTime)
        : undefined,
    };

    const now = new Date();

    const rule = AttendanceCheckOutRuleFactory.create(
      attendance.userType,
      this._trainerRepository,
      this._memberRepository
    );

    await rule.validate({
      ...attendance,
      checkOutTime: now,
    });

    await this._attendanceRepository.update(
      {
        checkOutTime: now,
        status: AttendanceStatus.PRESENT,
      },
      attendanceId
    );
  }
}
