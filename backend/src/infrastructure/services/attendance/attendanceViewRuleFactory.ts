import { AttendanceUserType } from "../../../domain/enums/attendanceUserType";
import { ITrainerRepository } from "../../../application/interfaces/repository/trainer.ts/tranerRepoInterface";
import { IMemberRepository } from "../../../application/interfaces/repository/member/addMemberRepoInterface";
import { TrainerAttendanceViewRule } from "./trainerAttendanceViewRule";
import { MemberAttendanceViewRule } from "./memberAttendanceViewRule";
import { IAttendanceViewRule } from "../../../application/interfaces/service/attendanceViewRule";
import { BadRequestException } from "../../../application/constants/exceptions";


export class AttendanceViewRuleFactory {
  static create(
    userType: AttendanceUserType,
    trainerRepo: ITrainerRepository,
    memberRepo: IMemberRepository
  ): IAttendanceViewRule {

    switch (userType) {
      case AttendanceUserType.TRAINER:
        return new TrainerAttendanceViewRule(trainerRepo);

      case AttendanceUserType.MEMBER:
        return new MemberAttendanceViewRule(memberRepo);

      default:
        throw new BadRequestException("Invalid attendance user type");
    }
  }
}
