import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import {
  InvalidDataException,
  NOtFoundException,
} from "../../../constants/exceptions";
import {
  CreateSetupIntentDto,
  CreateSetupIntentResponseDto,
} from "../../../dtos/trainerDto/salaryDtos";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IStripeService } from "../../../interfaces/service/stripeServiceInterface";
import { ICreateBillingSetupIntentUseCase } from "../../../interfaces/useCase/gymAdmin/salaryManagement/createBillingSetupIntentUseCaseInterface";

export class CreateBillingSetupIntentUseCase implements ICreateBillingSetupIntentUseCase {
  constructor(
    private _gymAdminRepository: IGymAdminRepository,
    private _stripeBillingService: IStripeService,
  ) {}

  async execute(
    data: CreateSetupIntentDto,
  ): Promise<CreateSetupIntentResponseDto> {
    const gymAdmin = await this._gymAdminRepository.findById(data.gymId);

    if (!gymAdmin) {
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
    }

    const billingEmail = gymAdmin.billingConfig?.billingEmail?.trim();

    if (!billingEmail) {
      throw new InvalidDataException("Please save billing email first");
    }

    let stripeCustomerId = gymAdmin.billingConfig?.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await this._stripeBillingService.createOrGetCustomer({
        email: billingEmail,
        name: gymAdmin.ownerName,
      });

      stripeCustomerId = customer.customerId;

      await this._gymAdminRepository.updateBillingConfig(data.gymId, {
        stripeCustomerId,
        billingEmail,
      });
    }

    const setupIntent = await this._stripeBillingService.createSetupIntent({
      customerId: stripeCustomerId,
      paymentMethodTypes: ["card"],
    });

    return {
      clientSecret: setupIntent.clientSecret,
    };
  }
}
