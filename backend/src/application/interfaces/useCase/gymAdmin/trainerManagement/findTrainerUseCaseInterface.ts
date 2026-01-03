import { TrainerDTO } from "../../../../dtos/trainerDto/listAllTrainerDto";

export interface IFindTrainerUseCase {
    findTrainer(trainerId:string):Promise<TrainerDTO>
}