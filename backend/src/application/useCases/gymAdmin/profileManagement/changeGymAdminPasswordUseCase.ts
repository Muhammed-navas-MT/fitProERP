import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError"
import { ForbiddenException, NOtFoundException } from "../../../constants/exceptions"
import { IChangePasswordRequestDTO } from "../../../dtos/gymAdminDto/gymAdminProfileDtos"
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface"
import { IHashService } from "../../../interfaces/service/hashServiceInterface"
import { IChangeGymAdminPasswordUseCase } from "../../../interfaces/useCase/gymAdmin/profileManagement/changeGymAdminPasswordUseCaseInterface"

export class ChangeGymAdminPasswordUseCase implements IChangeGymAdminPasswordUseCase{
  constructor(
    private readonly gymAdminRepository: IGymAdminRepository,
    private readonly hashService: IHashService
  ) {}

  async execute(data: IChangePasswordRequestDTO): Promise<void> {
    const gymAdmin = await this.gymAdminRepository.findById(data.gymAdminId)

    if (!gymAdmin) {
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND)
    }
    const isPasswordValid = await this.hashService.compare(
      data.oldPassword,
      gymAdmin.password
    )
    if (!isPasswordValid) {
      throw new ForbiddenException(GymAdminAuthError.PASSWORD_INCORRECT)
    }
    const hashedPassword = await this.hashService.hash(data.newPassword)
    await this.gymAdminRepository.update(
        {password:hashedPassword},
        data.gymAdminId
    )
  }
}
