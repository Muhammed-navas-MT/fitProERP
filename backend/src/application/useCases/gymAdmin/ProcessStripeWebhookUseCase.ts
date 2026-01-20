import Stripe from "stripe";
import { SuperAdminPaymentEntity } from "../../../domain/entities/superAdmin/paymentEntity";
import { PaymentMethod } from "../../../domain/enums/paymentMethod";
import { PaymentStatus } from "../../../domain/enums/paymentStatus";
import { Status } from "../../../domain/enums/status";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ISuperAdminPaymentRepository } from "../../interfaces/repository/superAdmin/paymentRepoInterface";
import { ISubscripctionRespoditery } from "../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { mapSubscriptionToGymAdminUpdate } from "../../mappers/gymAdmin/subscriptionToGymAdminMapper";
import { SubscriptionError } from "../../../presentation/shared/constants/errorMessage/subscriptionError";
import { ForbiddenException, NOtFoundException } from "../../constants/exceptions";
import { IProcessStripeWebhookUseCase } from "../../interfaces/useCase/gymAdmin/processStripeWebhookUseCaseInterface";

export class ProcessStripeWebhookUseCase implements IProcessStripeWebhookUseCase {
  constructor(
    private _paymentRepository: ISuperAdminPaymentRepository,
    private _gymAdminRepository: IGymAdminRepository,
    private _subscriptionRepository: ISubscripctionRespoditery,
  ) {}

  async execute(event: Stripe.Event): Promise<void> {
    if (event.type !== "checkout.session.completed") return;

    const session = event.data.object;
    const userId = session?.metadata?.userId;
    const planId = session?.metadata?.planId;

    if (!userId || !planId) {
      throw new ForbiddenException("Stripe session metadata missing");
    }

    const alreadyExists = await this._paymentRepository.existsBySessionId(
      session.id,
    );
    if (alreadyExists) return;

    const subscription = await this._subscriptionRepository.findById(planId);
    if (!subscription) {
      throw new NOtFoundException(SubscriptionError.SUBSCRIPTION_NOT_FOUND);
    }

    if (session.amount_total == null) {
      throw new ForbiddenException("Stripe session amount is missing");
    }

    const payment: SuperAdminPaymentEntity = {
      gymId: userId,
      packageId: planId,
      stripeSessionId: session.id,
      amount: session.amount_total / 100,
      currency: session.currency as string,
      paymentMethod: PaymentMethod.ONLINE,
      status: PaymentStatus.PAID,
      createdAt: new Date(),
    };

    const updatedGymData = mapSubscriptionToGymAdminUpdate(
      planId,
      subscription.duration,
    );

    await this._gymAdminRepository.update(
      { ...updatedGymData, status: Status.ACTIVE, limits: subscription.limits },
      userId,
    );

    await this._paymentRepository.create(payment);
  }
}
