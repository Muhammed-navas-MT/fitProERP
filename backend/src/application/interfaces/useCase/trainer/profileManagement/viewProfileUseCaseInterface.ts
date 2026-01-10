import { TrainerDTO } from "../../../../dtos/trainerDto/listAllTrainerDto";

export interface IViewProfileUseCase {
  execute(trainerId:string): Promise<TrainerDTO> }
