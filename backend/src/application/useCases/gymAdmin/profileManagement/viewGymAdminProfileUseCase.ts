import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError"
import { ForbiddenException, NOtFoundException } from "../../../constants/exceptions"
import { GymAdminProfileResponseDTO } from "../../../dtos/gymAdminDto/gymAdminProfileDtos"
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface"
import { IViewGymAdminProfileUseCase } from "../../../interfaces/useCase/gymAdmin/profileManagement/viewGymadminProfileUseCaseInterface"

export class ViewGymAdminProfileUseCase implements IViewGymAdminProfileUseCase {
  constructor(
    private readonly gymAdminRepository: IGymAdminRepository
  ) {}
  async execute(gymAdminId: string): Promise<GymAdminProfileResponseDTO> {
  const gymAdmin = await this.gymAdminRepository.findGymAdminWithBranches(gymAdminId);
  if (!gymAdmin) {
    throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
  }
  if (gymAdmin.status !== "ACTIVE") {
    throw new ForbiddenException(GymAdminAuthError.GYM_NOT_ACTIVE);
  }

  console.log(gymAdmin);
  return gymAdmin;
}

}
