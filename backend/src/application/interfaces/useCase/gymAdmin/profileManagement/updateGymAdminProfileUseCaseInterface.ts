import { GymAdminProfileResponseDTO, UpdateGymAdminProfileRequestDTO } from "../../../../dtos/gymAdminDto/gymAdminProfileDtos";

export interface IUpdateGymAdminProfileUseCase {
  execute(data: UpdateGymAdminProfileRequestDTO,gymAdminId:string): Promise<GymAdminProfileResponseDTO>;
}