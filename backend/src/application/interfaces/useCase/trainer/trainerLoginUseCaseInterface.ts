import { TrainerLoginResponseDTO, LoginRequestDTO } from "../../../dtos/auth/loginDto";

export interface ITrainerLoginUseCase  {
    login(data:LoginRequestDTO): Promise<TrainerLoginResponseDTO>;
}