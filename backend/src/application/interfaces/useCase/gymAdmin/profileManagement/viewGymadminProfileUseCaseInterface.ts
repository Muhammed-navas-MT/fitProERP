import { GymAdminProfileResponseDTO } from "../../../../dtos/gymAdminDto/gymAdminProfileDtos";

export interface IViewGymAdminProfileUseCase {
  execute(gymAdminId: string): Promise<GymAdminProfileResponseDTO>;
}