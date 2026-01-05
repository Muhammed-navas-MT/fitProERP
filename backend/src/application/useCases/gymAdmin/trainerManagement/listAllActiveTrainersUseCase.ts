import { IListActiveTrainers } from "../../../dtos/trainerDto/listAllTrainerDto";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IListActiveTrainersByBranchIdUseCase } from "../../../interfaces/useCase/gymAdmin/trainerManagement/listActiveTrainersUseCase";
import { TrainerMapper } from "../../../mappers/trainerMapper";

export class ListAllActiveTrainersByBranch implements IListActiveTrainersByBranchIdUseCase {
    constructor(
        private _trainerRepository:ITrainerRepository
    ) {}

    async listTrainers(gymId: string, branchId: string): Promise<IListActiveTrainers[] | null> {
        try {
            const trainers = await this._trainerRepository.findActiveTrainersByBranchAndGym(branchId,gymId);
            return TrainerMapper.toActiveTrainersResponse(trainers);
        } catch (error) {
            throw error;
        }
    }
}
