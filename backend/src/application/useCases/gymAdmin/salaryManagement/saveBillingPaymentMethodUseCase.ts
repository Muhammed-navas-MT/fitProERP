import { PaymentMethodType } from "../../../../domain/enums/stripePaymentMethodType";
import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import {
  SavePaymentMethodDto,
  SavePaymentMethodResponseDto,
} from "../../../dtos/trainerDto/salaryDtos";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IStripeService } from "../../../interfaces/service/stripeServiceInterface";
import { ISaveBillingPaymentMethodUseCase } from "../../../interfaces/useCase/gymAdmin/salaryManagement/saveBillingPaymentMethodUseCaseInterface";

export class SaveBillingPaymentMethodUseCase implements ISaveBillingPaymentMethodUseCase {
  constructor(
    private _gymAdminRepository: IGymAdminRepository,
    private _stripeService: IStripeService,
  ) {}
  async execute(
    data: SavePaymentMethodDto,
  ): Promise<SavePaymentMethodResponseDto> {
    const gym = await this._gymAdminRepository.findById(data.gymId);

    if (!gym) {
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
    }

    const customerId = gym.billingConfig?.stripeCustomerId;

    if (!customerId) {
      throw new BadRequestException("Stripe customer not found");
    }

    await this._stripeService.attachPaymentMethodToCustomer({
      customerId,
      paymentMethodId: data.paymentMethodId,
    });

    const paymentMethod = await this._stripeService.retrievePaymentMethod(
      data.paymentMethodId,
    );

    const updatedGym = await this._gymAdminRepository.updateBillingConfig(
      data.gymId,
      {
        defaultPaymentMethodId: data.paymentMethodId,
        paymentMethodType: paymentMethod.paymentMethodType as PaymentMethodType,
        paymentMethodBrand: paymentMethod.paymentMethodBrand,
        paymentMethodLast4: paymentMethod.paymentMethodLast4,
        isDefaultPaymentMethodAdded: true,
      },
    );

    if (!updatedGym) {
      throw new Error("Failed to update billing config");
    }

    return {
      billingEmail: updatedGym.billingConfig?.billingEmail,
      paymentMethodType: updatedGym.billingConfig
        ?.paymentMethodType as PaymentMethodType,
      paymentMethodBrand: updatedGym.billingConfig?.paymentMethodBrand,
      paymentMethodLast4: updatedGym.billingConfig?.paymentMethodLast4,
      isDefaultPaymentMethodAdded:
        updatedGym.billingConfig?.isDefaultPaymentMethodAdded ?? false,
    };
  }
}
