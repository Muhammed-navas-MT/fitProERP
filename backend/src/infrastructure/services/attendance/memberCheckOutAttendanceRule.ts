import {
  ForbiddenException,
  NOtFoundException,
} from "../../../application/constants/exceptions";
import { IMemberRepository } from "../../../application/interfaces/repository/member/addMemberRepoInterface";
import { AttendanceRule } from "../../../application/interfaces/service/attendanceRule";
import { AttendanceEntity } from "../../../domain/entities/shared/attendanceEntity";
import { MemberError } from "../../../presentation/shared/constants/errorMessage/memberMessage";
import { attendanceMessage } from "../../../presentation/shared/constants/messages/attendanceMessages";

export class MemberCheckOutAttendanceRule implements AttendanceRule {
  constructor(private _memberRepository: IMemberRepository) {}

  async validate(attendance: AttendanceEntity): Promise<string> {
    const member = await this._memberRepository.findById(attendance.userId);

    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const checkIn = new Date(attendance.checkInTime!);
    const checkOut = new Date(attendance.checkOutTime!);

    if (!checkIn || !checkOut) {
      throw new ForbiddenException(
        attendanceMessage.MEMBER_LOGOUT_BEFORE_ONE_HOUR,
      );
    }

    const oneHourInMs = 60 * 60 * 1000;
    const diff = checkOut.getTime() - checkIn.getTime();

    if (diff < oneHourInMs) {
      throw new ForbiddenException(
        attendanceMessage.MEMBER_LOGOUT_BEFORE_ONE_HOUR,
      );
    }

    return member.branchId as string;
  }
}
