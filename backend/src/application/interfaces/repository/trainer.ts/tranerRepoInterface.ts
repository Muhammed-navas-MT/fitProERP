import { IBaseRepository } from "../base/baseRepo"
import { TrainerEntity } from "../../../../domain/entities/trainer/trainerEntity"

export interface ITrainerRepository extends IBaseRepository<TrainerEntity> {
    findByEmail(email:string):Promise<TrainerEntity | null>
}