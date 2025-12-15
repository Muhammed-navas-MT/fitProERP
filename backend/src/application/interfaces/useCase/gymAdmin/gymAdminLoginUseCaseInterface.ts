import { GymAdminLoginRequestDTO, GymAdminLoginResponseDTO } from "../../../dtos/auth/loginDto";

export interface IGymAdminLoginUseCase  {
    login(data:GymAdminLoginRequestDTO): Promise<GymAdminLoginResponseDTO>;
}