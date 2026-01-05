import { IListActiveTrainers } from "../../../../dtos/trainerDto/listAllTrainerDto";

export interface IListActiveTrainersByBranchIdUseCase {
    listTrainers(gymId:string,branchId:string):Promise<IListActiveTrainers[]|null>
}