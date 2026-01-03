import { IUpdateTrainerDTO } from "../../../../dtos/trainerDto/listAllTrainerDto";

export interface IUpdateTrainerUseCase {
    updateTrainer(trainer:IUpdateTrainerDTO,id:string):Promise<void>
}