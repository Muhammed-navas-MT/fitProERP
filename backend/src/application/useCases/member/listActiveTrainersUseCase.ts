import { MemberError } from "../../../presentation/shared/constants/errorMessage/memberMessage";
import { NOtFoundException } from "../../constants/exceptions";
import { IListActiveTrainersResponseDto } from "../../dtos/auth/trainerDto";
import { IMemberRepository } from "../../interfaces/repository/member/addMemberRepoInterface";
import { ILeaveRepository } from "../../interfaces/repository/shared/leaveRepoInterface";
import { ITrainerRepository } from "../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IListActiveTrainerUseCase } from "../../interfaces/useCase/member/listActiveTrainersUseCaseInterface";
import { TrainerMapper } from "../../mappers/trainerMapper";
import { LeaveStatus } from "../../../domain/enums/leaveStatus";

export class ListActiveTrainersUseCase implements IListActiveTrainerUseCase {
  constructor(
    private _trainerRepository: ITrainerRepository,
    private _memberRepository: IMemberRepository,
    private _leaveRepository: ILeaveRepository,
  ) {}

  async execute(memberId: string): Promise<IListActiveTrainersResponseDto[]> {
    const member = await this._memberRepository.findById(memberId);

    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const trainers = await this._trainerRepository.findActiveTrainersByBranch(
      member.branchId as string,
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const availableTrainers = [];

    for (const trainer of trainers) {
      const leaves =
        await this._leaveRepository.findLeavesByTrainerIdAndDateRange(
          trainer._id as string,
          today,
          today,
        );

      const isOnLeave = leaves.some(
        (leave) =>
          leave.status === LeaveStatus.APPROVED ||
          leave.status === LeaveStatus.PENDING,
      );

      if (!isOnLeave) {
        availableTrainers.push(trainer);
      }
    }

    const response =
      TrainerMapper.toListAcitveTrainersResponse(availableTrainers);

    return response;
  }
}
