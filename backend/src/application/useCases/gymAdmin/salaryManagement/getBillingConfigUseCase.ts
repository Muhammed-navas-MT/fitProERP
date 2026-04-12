import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { NOtFoundException } from "../../../constants/exceptions";
import {
  BillingConfigResponseDto,
  GetBillingConfigDto,
} from "../../../dtos/trainerDto/salaryDtos";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IGetBillingConfigUseCase } from "../../../interfaces/useCase/gymAdmin/salaryManagement/getBillingConfigUseCaseInterface";

export class GetBillingConfigUseCase implements IGetBillingConfigUseCase {
  constructor(private _gymAdminRepository: IGymAdminRepository) {}

  async execute(data: GetBillingConfigDto): Promise<BillingConfigResponseDto> {
    const gymAdmin = await this._gymAdminRepository.findById(data.gymId);

    if (!gymAdmin) {
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
    }

    return {
      billingEmail: gymAdmin.billingConfig?.billingEmail,
      paymentMethodType: gymAdmin.billingConfig?.paymentMethodType,
      paymentMethodBrand: gymAdmin.billingConfig?.paymentMethodBrand,
      paymentMethodLast4: gymAdmin.billingConfig?.paymentMethodLast4,
      isDefaultPaymentMethodAdded:
        gymAdmin.billingConfig?.isDefaultPaymentMethodAdded ?? false,
    };
  }
}
