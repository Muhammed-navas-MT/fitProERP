import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError"
import { NOtFoundException } from "../../../constants/exceptions"
import { GymAdminProfileResponseDTO, UpdateGymAdminProfileRequestDTO } from "../../../dtos/gymAdminDto/gymAdminProfileDtos"
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface"
import { IUpdateGymAdminProfileUseCase } from "../../../interfaces/useCase/gymAdmin/profileManagement/updateGymAdminProfileUseCaseInterface"

export class UpdateGymAdminProfileUseCase implements IUpdateGymAdminProfileUseCase {
  constructor(
    private readonly gymAdminRepository: IGymAdminRepository
  ) {}

  async execute(
    data: UpdateGymAdminProfileRequestDTO,
    gymAdminId: string
  ): Promise<GymAdminProfileResponseDTO> {
    const gymAdmin = await this.gymAdminRepository.findById(gymAdminId)
    if (!gymAdmin) {
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND)
    }
    await this.gymAdminRepository.update(
      { ...data, logo: data.logo as string },
      gymAdminId
    )
    const updatedGymAdmin = await this.gymAdminRepository.findGymAdminWithBranches(gymAdminId)

    if (!updatedGymAdmin) {
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND)
    }
    return updatedGymAdmin
  }
}
