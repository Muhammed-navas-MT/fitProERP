import { TrainerError } from "../../../presentation/shared/constants/errorMessage/trainerMessage";
import { NOtFoundException } from "../../constants/exceptions";
import { IListActiveBranchResponseDTO } from "../../dtos/gymAdminDto/BranchDto";
import { IBranchRepository } from "../../interfaces/repository/gymAdmin/branchRepoInterface";
import { ITrainerRepository } from "../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IListActiveBranchUseCase } from "../../interfaces/useCase/trainer/listActiveBranchUseCaseIterface";
import { BranchResponseMapper } from "../../mappers/gymAdmin/branchMapper";

export class ListActiveBranchUseCase implements IListActiveBranchUseCase {
    constructor(
        private _branchRepository:IBranchRepository,
        private _trainerRepository:ITrainerRepository
    ){}
    async listActiveBranch(trainerId: string): Promise<IListActiveBranchResponseDTO | null> {
        try {
            const trainer = await this._trainerRepository.findById(trainerId);
            if(!trainer) {
                throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND)
            };
            const branches = await this._branchRepository.listAllActiveBranch(trainer.gymId);
            return BranchResponseMapper.toListActiveItem(branches);
        } catch (error) {
            throw error
        }
    }
}