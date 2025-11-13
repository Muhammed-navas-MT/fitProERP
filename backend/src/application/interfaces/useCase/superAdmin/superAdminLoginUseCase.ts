import {ISuperAdminLoginRequestDTO, ISuperAdminLoginResponseDTO } from "../../../dtos/auth/superAdminLoginDto";

export interface SuperAdminLoginUseCase {
    superAdminLogin(data:ISuperAdminLoginRequestDTO):Promise<ISuperAdminLoginResponseDTO>;
}