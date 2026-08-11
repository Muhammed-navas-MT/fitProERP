import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IGymAdminSubscriptionExpiryUseCase } from "../../interfaces/useCase/gymAdmin/gymAdminSubscriptionExpiryUseCaseInterface";

export class GymAdminSubscriptionExpiryUseCase implements IGymAdminSubscriptionExpiryUseCase {
  constructor(private _gymAdminRepository: IGymAdminRepository) {}
  async execute(): Promise<void> {
    await this._gymAdminRepository.updateExpiredGymAdmins(new Date());
  }
}
