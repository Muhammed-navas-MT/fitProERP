import { IChangePasswordRequestDTO } from "../../../../dtos/memberDto/profileManagementDtos";

export interface IChangePasswordUseCase {
  execute( data: IChangePasswordRequestDTO): Promise<void>}
