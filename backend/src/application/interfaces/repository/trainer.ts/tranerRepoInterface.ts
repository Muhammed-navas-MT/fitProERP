import { IBaseRepository } from "../base/baseRepo"
import { TrainerEntity } from "../../../../domain/entities/trainer/trainerEntity"
import { IListTrainerRequestDTO } from "../../../dtos/trainerDto/listAllTrainerDto"

export interface ITrainerRepository extends IBaseRepository<TrainerEntity> {
    findByEmail(email:string):Promise<TrainerEntity | null>
    listAllTrainers(params:IListTrainerRequestDTO):Promise<{trainers:TrainerEntity[],total:number}>
    countTrainersByGymId(gymId: string): Promise<number>;
    listAllTrainers(params:IListTrainerRequestDTO):Promise<{trainers:TrainerEntity[],total:number}>
    countTrainersByGymId(gymId: string): Promise<number>;
    countByBranchId(branchId: string): Promise<number>;
}