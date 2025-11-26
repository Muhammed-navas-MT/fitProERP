import { MemberLoginResponseDTO, LoginRequestDTO } from "../../../dtos/auth/loginDto";

export interface IMemberLoginUseCase  {
    login(data:LoginRequestDTO): Promise<MemberLoginResponseDTO>;
}