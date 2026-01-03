import { NOtFoundException, BadRequestException } from "../../../constants/exceptions";
import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import { IBlockTrainerUseCase } from "../../../interfaces/useCase/gymAdmin/trainerManagement/blockTrainerUseCaseInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IMemberRepository } from "../../../interfaces/repository/member/addMemberRepoInterface";
import { Status } from "../../../../domain/enums/status";

export class BlockTrainerUseCase implements IBlockTrainerUseCase {
  constructor(
    private readonly _trainerRepository: ITrainerRepository,
    private readonly _memberRepository: IMemberRepository
  ) {}

  async blockTrainer(trainerId: string): Promise<void> {
    const trainer = await this._trainerRepository.findById(trainerId);
    if (!trainer) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }
    if(!trainer.branchId){
      throw new BadRequestException(TrainerError.BRANCH_ID_INVALID);
    }
    const activeTrainers = await this._trainerRepository.findActiveTrainersByBranchAndGym(trainer.branchId,trainer.gymId);

    if (activeTrainers.length <= 1) {
      throw new BadRequestException(
        TrainerError.ONE_TRAINER_REQUIRED
      );
    }

    const members = await this._memberRepository.findByTrainerId(trainerId);

    const availableTrainers = activeTrainers.filter(
      (t) => t._id !== trainerId
    );

    let index = 0;
    for (const member of members) {
      const assignedTrainer =
        availableTrainers[index % availableTrainers.length];
        if(member._id){
          await this._memberRepository.update({trainerId:assignedTrainer._id},member._id);
        }
      index++;
    }

    await this._trainerRepository.update(
      { status: Status.IN_ACTIVE },
      trainerId
    );
  }
}
