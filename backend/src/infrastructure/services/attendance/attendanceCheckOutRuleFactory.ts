import { IMemberRepository } from "../../../application/interfaces/repository/member/addMemberRepoInterface";
import { ITrainerRepository } from "../../../application/interfaces/repository/trainer.ts/tranerRepoInterface";
import { AttendanceRule } from "../../../application/interfaces/service/attendanceRule";
import { AttendanceUserType } from "../../../domain/enums/attendanceUserType";
import { MemberCheckOutAttendanceRule } from "./memberCheckOutAttendanceRule";
import { TrainerCheckOutAttendanceRule } from "./trainerCheckOutAttendanceRule";

export class AttendanceCheckOutRuleFactory {
  static create(
    userType: AttendanceUserType,
    trainerRepository: ITrainerRepository,
    memberRepository: IMemberRepository
  ): AttendanceRule {
    if (userType === AttendanceUserType.TRAINER) {
      return new TrainerCheckOutAttendanceRule(trainerRepository);
    }

    return new MemberCheckOutAttendanceRule(memberRepository);
  }
}
