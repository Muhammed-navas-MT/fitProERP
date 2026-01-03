import { IBaseRepository } from "../base/baseRepo"
import { TrainerEntity } from "../../../../domain/entities/trainer/trainerEntity"
import { IListTrainerRequestDTO } from "../../../dtos/trainerDto/listAllTrainerDto"

export interface ITrainerRepository extends IBaseRepository<TrainerEntity> {
    findByEmail(email:string):Promise<TrainerEntity | null>
    listAllTrainers(params: IListTrainerRequestDTO): Promise<{ trainers: (TrainerEntity & { branchName: string })[]; total: number }>;
    countTrainersByGymId(gymId: string): Promise<number>;
    countByBranchId(branchId: string): Promise<number>;
    listAllActiveTrainers(gymId:string):Promise<TrainerEntity[]>
    findActiveTrainersByBranchAndGym(branchId: string, gymId: string): Promise<TrainerEntity[]>;
    countActiveTrainersByBranch(branchId: string): Promise<number>;
    findActiveTrainersByBranchExcludingTrainer(branchId: string,trainerId: string): Promise<{ id: string }[]>;
}