import { IUpdateTrainerDTO } from "../../../../dtos/trainerDto/listAllTrainerDto";

export interface IUpdateProfileUseCase {
  execute( data: IUpdateTrainerDTO,trainerId:string): Promise<void>}
