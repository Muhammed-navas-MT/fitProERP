import { NOtFoundException } from "../../../application/constants/exceptions";
import { IMemberRepository } from "../../../application/interfaces/repository/member/addMemberRepoInterface";
import { AttendanceRule } from "../../../application/interfaces/service/attendanceRule";
import { AttendanceEntity } from "../../../domain/entities/shared/attendanceEntity";
import { MemberError } from "../../../presentation/shared/constants/errorMessage/memberMessage";

export class MemberAttendanceRule implements AttendanceRule {
  constructor(private _memberRepository:IMemberRepository){}
  async validate(attendance: AttendanceEntity): Promise<string> {
    const member = await this._memberRepository.findById(attendance.userId);
    if(!member){
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    };
    return member.branchId as string;
  }
}
