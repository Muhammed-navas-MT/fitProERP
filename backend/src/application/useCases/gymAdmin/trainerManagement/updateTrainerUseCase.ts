import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import {
  BadRequestException,
  ForbiddenException,
  NOtFoundException,
} from "../../../constants/exceptions";
import { IUpdateTrainerDTO } from "../../../dtos/trainerDto/listAllTrainerDto";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { IUpdateTrainerUseCase } from "../../../interfaces/useCase/gymAdmin/trainerManagement/updateTrainerUseCaseInterface";
import { Status } from "../../../../domain/enums/status";

export class UpdateTrainerUseCase implements IUpdateTrainerUseCase {
  constructor(
    private readonly _trainerRepository: ITrainerRepository,
    private readonly _memberRepository: IMemberRepository
  ) {}

  async updateTrainer(
    trainerData: IUpdateTrainerDTO,
    trainerId: string
  ): Promise<void> {

    if (!trainerId) {
      throw new ForbiddenException(TrainerError.ID_INVALID);
    }

    const existingTrainer =
      await this._trainerRepository.findById(trainerId);

    if (!existingTrainer) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }

    if(!existingTrainer.branchId){
      throw new BadRequestException(TrainerError.BRANCH_ID_INVALID)
    }

    const statusChangedToInactive =
      existingTrainer.status === Status.ACTIVE &&
      trainerData.status === Status.IN_ACTIVE;

    const branchChanged =
      trainerData.branchId &&
      trainerData.branchId !== existingTrainer.branchId;

    if (statusChangedToInactive || branchChanged) {

      const activeTrainerCount =
        await this._trainerRepository.countActiveTrainersByBranch(
          existingTrainer.branchId
        );

      if (activeTrainerCount <= 1) {
        throw new ForbiddenException(
          TrainerError.ONE_TRAINER_REQUIRED
        );
      }

      const otherTrainers =
        await this._trainerRepository.findActiveTrainersByBranchExcludingTrainer(
          existingTrainer.branchId,
          trainerId
        );

      const members =
        await this._memberRepository.findMembersByTrainer(trainerId);

      if (members.length) {
        const reassignmentPayload = members.map((member, index) => ({
          memberId: member.id,
          trainerId: otherTrainers[index % otherTrainers.length].id,
        }));

        await this._memberRepository.reassignMembers(reassignmentPayload);
      }
    }

    await this._trainerRepository.update(trainerData, trainerId);
  }
}
