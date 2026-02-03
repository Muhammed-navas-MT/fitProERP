import { IListActiveTrainers } from "../../../../dtos/trainerDto/listAllTrainerDto";

export interface IListActiveTrainersByBranchIdUseCase {
    listTrainers(branchId:string):Promise<IListActiveTrainers[]|null>
}