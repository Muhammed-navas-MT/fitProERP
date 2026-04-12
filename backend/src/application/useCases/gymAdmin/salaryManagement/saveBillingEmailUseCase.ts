import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import {
  InvalidDataException,
  NOtFoundException,
} from "../../../constants/exceptions";
import {
  SaveBillingEmailDto,
  SaveBillingEmailResponseDto,
} from "../../../dtos/trainerDto/salaryDtos";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ISaveBillingEmailUseCase } from "../../../interfaces/useCase/gymAdmin/salaryManagement/saveBillingEmailUseCaseInterface";

export class SaveBillingEmailUseCase implements ISaveBillingEmailUseCase {
  constructor(private _gymAdminRepository: IGymAdminRepository) {}

  async execute(
    data: SaveBillingEmailDto,
  ): Promise<SaveBillingEmailResponseDto> {
    const { gymId, billingEmail } = data;

    if (!billingEmail.trim()) {
      throw new InvalidDataException("Billing email is required");
    }

    const gymAdmin = await this._gymAdminRepository.findById(gymId);

    if (!gymAdmin) {
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
    }

    const updated = await this._gymAdminRepository.updateBillingEmail(
      gymId,
      billingEmail,
    );

    if (!updated) {
      throw new NOtFoundException(GymAdminAuthError.GYM_NOT_FOUND);
    }

    return {
      billingEmail: updated.billingConfig?.billingEmail || "",
      isDefaultPaymentMethodAdded:
        updated.billingConfig?.isDefaultPaymentMethodAdded ?? false,
    };
  }
}
