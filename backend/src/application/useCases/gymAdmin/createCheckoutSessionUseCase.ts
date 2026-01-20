import { stripe } from "../../../infrastructure/services/stripeClient";
import { GymAdminAuthError } from "../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { SubscriptionError } from "../../../presentation/shared/constants/errorMessage/subscriptionError";
import { ForbiddenException, NOtFoundException } from "../../constants/exceptions";
import { CreateCheckoutSessionRequestDto } from "../../dtos/gymAdminDto/purchaseSubscriptionDto";
import { IGymAdminRepository } from "../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ISubscripctionRespoditery } from "../../interfaces/repository/superAdmin/subscriptionRepoInterface";
import { ICreateCheckoutSessionUseCase } from "../../interfaces/useCase/gymAdmin/createCheckoutSessionUseCaseInterface";

export class CreateCheckoutSessionUseCase implements ICreateCheckoutSessionUseCase {
    constructor(
        private _subscriptionRespository:ISubscripctionRespoditery,
        private _gymAdminRepository:IGymAdminRepository
    ){}
  async execute(data: CreateCheckoutSessionRequestDto): Promise<string> {
    const subscription = await this._subscriptionRespository.findById(data.planId);
    if(!subscription){
        throw new NOtFoundException(SubscriptionError.SUBSCRIPTION_NOT_FOUND);
    };
    if(!subscription.isActive){
        throw new ForbiddenException(SubscriptionError.SUBSCRIPTION_INACTIVE)
    }
    const gymAdmin = await this._gymAdminRepository.findById(data.userId);

    if(!gymAdmin){
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
    }

    const successUrl = `${process.env.CLIENT_PROTOCOL}://${gymAdmin.subdomain}.${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT}/gym-admin/success`;
    const cancelUrl = `${process.env.CLIENT_PROTOCOL}://${gymAdmin.subdomain}.${process.env.CLIENT_DOMAIN}:${process.env.CLIENT_PORT}/gym-admin/cancel`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: subscription.planName },
            unit_amount: subscription.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: { planId: data.planId, userId: data.userId,role:gymAdmin.role },
      success_url: successUrl,
      cancel_url:cancelUrl,
    });

    return session.url!;
  }
}
