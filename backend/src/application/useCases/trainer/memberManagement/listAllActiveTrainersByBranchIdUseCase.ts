import { IListActiveTrainers } from "../../../dtos/trainerDto/listAllTrainerDto";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IListActiveTrainersByBranchIdUseCase } from "../../../interfaces/useCase/trainer/memberManagement/listActiveTrainersByBranchIdUseCaseInterface";
import { TrainerMapper } from "../../../mappers/trainerMapper";

export class ListAllActiveTrainersByBranch implements  IListActiveTrainersByBranchIdUseCase{
    constructor(
        private _trainerRepository:ITrainerRepository
    ) {}

    async listTrainers(branchId: string): Promise<IListActiveTrainers[] | null> {
        try {
            const trainers = await this._trainerRepository.findActiveTrainersByBranch(branchId);
            return TrainerMapper.toActiveTrainersResponse(trainers);
        } catch (error) {
            throw error;
        }
    }
}
