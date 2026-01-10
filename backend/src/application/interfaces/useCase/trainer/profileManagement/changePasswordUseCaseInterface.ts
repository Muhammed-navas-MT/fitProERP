import { IChangePasswordRequestDTO } from "../../../../dtos/trainerDto/listAllTrainerDto";

export interface IChangePasswordUseCase {
  execute( data: IChangePasswordRequestDTO): Promise<void>}
