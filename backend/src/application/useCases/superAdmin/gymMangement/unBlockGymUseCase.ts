import { Status } from "../../../../domain/enums/status";
import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { NOtFoundException, UpdateFailedException } from "../../../constants/exceptions";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IUnBlockGymUseCase } from "../../../interfaces/useCase/superAdmin/gymMangement/unBlockGymUseCaseInterface";

export class UnBlockGymUseCase implements IUnBlockGymUseCase {
  constructor(
    private _gymAdminRepository: IGymAdminRepository
  ) {}

  async unBlockGym(id: string): Promise<void> {
    const gymAdmin = await this._gymAdminRepository.findById(id);
    console.log(gymAdmin?.subscriptionEnd);

    if (!gymAdmin) {
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
    }
    const today = new Date();
    let status:Status;
    if (
      gymAdmin.subscriptionEnd &&
      gymAdmin.subscriptionEnd >= today
    ) {
      status = Status.ACTIVE;
    } else {
      status = Status.IN_ACTIVE;
    }

    await this._gymAdminRepository.update({status},id);
  }
}
