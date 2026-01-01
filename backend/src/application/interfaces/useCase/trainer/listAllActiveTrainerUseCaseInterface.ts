import { IListActiveTrainers } from "../../../dtos/trainerDto/listAllTrainerDto";

export interface IListActiveTrainersUseCase{
    listActiveTrainers(trainerId:string):Promise<IListActiveTrainers[]|null>
}