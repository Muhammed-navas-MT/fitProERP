import { PaymentStatus } from "../../../domain/enums/paymentStatus";
import { Status } from "../../../domain/enums/status";
import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { SubscriptionError } from "../../../presentation/shared/constants/errorMessage/subscriptionError";
import { ForbiddenException, NOtFoundException } from "../../constants/exceptions";
import { PurchaseSubscriptionDTO } from "../../dtos/gymAdminDto/purchaseSubscriptionDto";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ISuperAdminPaymentRepository } from "../../interfaces/repository/superAdmin/paymentRepoInterface";
import { ISubscripctionRespoditery } from "../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { IPurchaseSubscriptionUseCase } from "../../interfaces/useCase/gymAdmin/purchaseSubscriptionUseCaseInterface";
import { mapSubscriptionToGymAdminUpdate } from "../../mappers/gymAdmin/subscriptionToGymAdminMapper";

export class PurchaseSubscriptionUseCase
  implements IPurchaseSubscriptionUseCase
{
  constructor(
    private _paymentRepository: ISuperAdminPaymentRepository,
    private _subscriptionRepository: ISubscripctionRespoditery,
    private _gymAdminRepository: IGymAdminRepository
  ) {}

  async execute(data: PurchaseSubscriptionDTO): Promise<void> {
    const subscription = await this._subscriptionRepository.findById(
      data.packageId
    );

    if (!subscription) {
      throw new NOtFoundException(SubscriptionError.SUBSCRIPTION_NOT_FOUND);
    }

    if (!subscription.isActive) {
      throw new ForbiddenException(SubscriptionError.SUBSCRIPTION_INACTIVE);
    }

    const gymAdmin = await this._gymAdminRepository.findById(data.gymId);

    if (!gymAdmin) {
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
    }

    await this._paymentRepository.create({
      gymId: data.gymId,
      packageId: data.packageId,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      status: PaymentStatus.PAID,
    });

    const updatedGymData = mapSubscriptionToGymAdminUpdate(
      data.packageId,
      subscription.duration
    );

    await this._gymAdminRepository.update(
      {...updatedGymData,status:Status.ACTIVE,limits:subscription.limits},
      data.gymId
    );
  }
}
