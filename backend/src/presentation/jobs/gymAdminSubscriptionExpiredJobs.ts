import { IGymAdminSubscriptionExpiryUseCase } from "../../application/interfaces/useCase/gymAdmin/gymAdminSubscriptionExpiryUseCaseInterface";

export class GymAdminSubscriptionExpiryJob {
  constructor(
    private _gymAdminSubscriptionExpiryUseCase: IGymAdminSubscriptionExpiryUseCase,
  ) {}

  async execute(): Promise<void> {
    await this._gymAdminSubscriptionExpiryUseCase.execute();
  }
}
