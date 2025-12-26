import { SubscriptionError } from "../../../../presentation/shared/constants/errorMessage/subscriptionError";
import { UpdateFailedException } from "../../../constants/exceptions";
import { ISubscripctionRespoditery } from "../../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { IBlockSubscriptionUseCase } from "../../../interfaces/useCase/superAdmin/subscription/blockSubscriptionUseCaseInterface";

export class BlockSubscriptionUseCase implements IBlockSubscriptionUseCase {
  constructor(private _subscriptionRepository: ISubscripctionRespoditery) {}

  async blockSubscription(id: string): Promise<void> {
    const result = await this._subscriptionRepository.blockById(id);
    if (!result) {
      throw new UpdateFailedException(
        SubscriptionError.SUBSCRIPTION_UPDATE_FAILED
      );
    }
  }
}
