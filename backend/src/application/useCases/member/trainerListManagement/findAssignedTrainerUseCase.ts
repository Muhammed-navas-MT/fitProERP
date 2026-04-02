import { MemberError } from "../../../../presentation/shared/constants/errorMessage/memberMessage";
import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import { NOtFoundException } from "../../../constants/exceptions";
import { AssignedTrainerResponseDto } from "../../../dtos/auth/trainerDto";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IFindAssignedTrainerUseCase } from "../../../interfaces/useCase/member/trainersListingManagement/findAssignedTrainerUseCaseInterface";

export class FindAssignedTrainerUseCase implements IFindAssignedTrainerUseCase {
  constructor(
    private _trainerRepository: ITrainerRepository,
    private _memberRepository: IMemberRepository,
  ) {}
  async execute(memberId: string): Promise<AssignedTrainerResponseDto> {
    const member = await this._memberRepository.findById(memberId);
    if (!member) {
      throw new NOtFoundException(MemberError.MEMBER_NOT_FOUND);
    }

    const trainer = await this._trainerRepository.findById(member.trainerId);
    if (!trainer) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }
    return {
      name: trainer.name,
      id: trainer._id?.toString() as string,
    };
  }
}
