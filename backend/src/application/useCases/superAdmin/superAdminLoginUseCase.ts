import { Roles } from "../../../domain/enums/roles";
import { ISuperAdminRepository } from "../../interfaces/repository/superAdmin/superAdminRepoInterface";
import { SuperAdminLoginUseCase } from "../../interfaces/useCase/superAdmin/superAdminLoginUseCase";
import { ISuperAdminLoginResponseDTO,ISuperAdminLoginRequestDTO } from "../../dtos/auth/superAdminLoginDto";
import { SuperAdminMapper } from "../../mappers/superAdminMapper";

export class SuperAdminUseCase implements SuperAdminLoginUseCase {
  constructor(private _superAdminRepository: ISuperAdminRepository) {}

  async superAdminLogin(
    data:ISuperAdminLoginRequestDTO
  ): Promise<ISuperAdminLoginResponseDTO> {
    const superAdmin = await this._superAdminRepository.findByEmail(data.email);

    if (!superAdmin) {
      throw new Error("Super Admin Not found");
    }

    if (superAdmin.role !== Roles.SUPERADMIN) {
      throw new Error("invalid credintials");
    }

    if (superAdmin.password !== data.password) {
      throw new Error("Password not match");
    }

    const response: ISuperAdminLoginResponseDTO =
      SuperAdminMapper.toSuperAdminLoginResponse(superAdmin);
    return response;
  }
}
