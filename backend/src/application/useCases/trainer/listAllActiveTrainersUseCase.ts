import { TrainerError } from "../../../presentation/shared/constants/errorMessage/trainerMessage";
import { NOtFoundException } from "../../constants/exceptions";
import { IListActiveTrainers } from "../../dtos/trainerDto/listAllTrainerDto";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ITrainerRepository } from "../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IListActiveTrainersUseCase } from "../../interfaces/useCase/trainer/listAllActiveTrainerUseCaseInterface";
import { TrainerMapper } from "../../mappers/trainerMapper";

export class ListActiveTrainers implements IListActiveTrainersUseCase{
    constructor(
        private _trainerRepository:ITrainerRepository,
        private _geyAdminRepository:IGymAdminRepository
    ){};
    async listActiveTrainers(trainerId:string): Promise<IListActiveTrainers[] | null> {
        try {
            const trainer = await this._trainerRepository.findById(trainerId);
            if(!trainer){
                throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND)
            }
            const gymAdmin = await this._geyAdminRepository.findById(trainer.gymId);
            if(!gymAdmin){
                throw new NOtFoundException(TrainerError.GYM_NOT_FOUND);
            }
            const trainers = await this._trainerRepository.listAllActiveTrainers(trainer.gymId);
            return TrainerMapper.toActiveTrainersResponse(trainers)
        } catch (error) {
            throw error
        }
    }
}