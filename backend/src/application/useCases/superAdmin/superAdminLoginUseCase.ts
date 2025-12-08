import { Roles } from "../../../domain/enums/roles";
import { ISuperAdminRepository } from "../../interfaces/repository/superAdmin/superAdminRepoInterface";
import { SuperAdminLoginUseCase } from "../../interfaces/useCase/superAdmin/superAdminLoginUseCase";
import { ISuperAdminLoginResponseDTO,ISuperAdminLoginRequestDTO } from "../../dtos/auth/superAdminLoginDto";
import { SuperAdminMapper } from "../../mappers/superAdminMapper";
import { InvalidDataException, NOtFoundException } from "../../constants/exceptions";
import { SuperAdminError } from "../../../presentation/shared/constants/errorMessage/superAdminMessages";

export class SuperAdminUseCase implements SuperAdminLoginUseCase {
  constructor(
    private _superAdminRepository: ISuperAdminRepository,
  ) {}

  async superAdminLogin(
    data:ISuperAdminLoginRequestDTO
  ): Promise<ISuperAdminLoginResponseDTO> {
    const superAdmin = await this._superAdminRepository.findByEmail(data.email);

    if (!superAdmin) {
      throw new NOtFoundException(SuperAdminError.NOT_FOUND)
    }
    if (superAdmin.role !== Roles.SUPERADMIN) {
      throw new InvalidDataException(SuperAdminError.INVALID_CREDENTIALS)
    }
    if (superAdmin.password !== data.password) {
      throw new InvalidDataException(SuperAdminError.INVALID_CREDENTIALS)
    };
    const response: ISuperAdminLoginResponseDTO =
      SuperAdminMapper.toSuperAdminLoginResponse(superAdmin);
      return response;
  }
}
