import { GymAdminLoginResponseDTO, LoginRequestDTO } from "../../../dtos/auth/loginDto";

export interface IGymAdminLoginUseCase  {
    login(data:LoginRequestDTO): Promise<GymAdminLoginResponseDTO>;
}