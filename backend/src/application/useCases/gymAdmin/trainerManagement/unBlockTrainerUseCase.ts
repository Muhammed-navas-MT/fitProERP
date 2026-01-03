import { NOtFoundException } from "../../../constants/exceptions";
import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { Status } from "../../../../domain/enums/status";
import { IUnBlockTrainerUseCase } from "../../../interfaces/useCase/gymAdmin/trainerManagement/unBlockTrainerUseCaseInterface";

export class UnBlockTrainerUseCase implements IUnBlockTrainerUseCase {
  constructor(private _trainerRepository: ITrainerRepository) {}

  async unBlockTrainer(trainerId: string): Promise<void> {
    const trainer = await this._trainerRepository.findById(trainerId);
    if (!trainer) throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND)

    trainer.status = Status.ACTIVE;
    await this._trainerRepository.update({ status: trainer.status },trainerId );
  }
}
