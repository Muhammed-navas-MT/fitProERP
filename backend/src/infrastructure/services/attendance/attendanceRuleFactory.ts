import { IMemberRepository } from "../../../application/interfaces/repository/member/addMemberRepoInterface";
import { ITrainerRepository } from "../../../application/interfaces/repository/trainer.ts/tranerRepoInterface";
import { AttendanceRule } from "../../../application/interfaces/service/attendanceRule";
import { AttendanceUserType } from "../../../domain/enums/attendanceUserType";
import { MemberAttendanceRule } from "./memberAttendanceRule";
import { TrainerAttendanceRule } from "./trainerAttendanceRule";

export class AttendanceRuleFactory {
  static create(
    userType: AttendanceUserType,
    trainerRepository: ITrainerRepository,
    memberRepository:IMemberRepository,
  ): AttendanceRule {
    if (userType === AttendanceUserType.TRAINER) {
      return new TrainerAttendanceRule(trainerRepository);
    }
    return new MemberAttendanceRule(memberRepository);
  }
}
