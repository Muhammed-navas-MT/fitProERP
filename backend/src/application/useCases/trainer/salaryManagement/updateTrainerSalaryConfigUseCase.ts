import { SalaryPaymentMethod } from "../../../../domain/enums/salaryPaymentMethod";
import { StripeAccountStatus } from "../../../../domain/enums/stripeAccountStatus";
import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import {
  TrainerSalaryConfigResponseDto,
  UpdateTrainerSalaryConfigDto,
} from "../../../dtos/trainerDto/trainerSalaryConfigDto";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IUpdateTrainerSalaryConfigUseCase } from "../../../interfaces/useCase/trainer/salaryManagement/updateTrainerSalaryConfigUseCaseInterface";
import { TrainerSalaryConfigMapper } from "../../../mappers/trainer/trainerSalaryConfigMapper";

export class UpdateTrainerSalaryConfigUseCase implements IUpdateTrainerSalaryConfigUseCase {
  constructor(private _trainerRepository: ITrainerRepository) {}

  async execute(
    data: UpdateTrainerSalaryConfigDto,
  ): Promise<TrainerSalaryConfigResponseDto> {
    const trainer = await this._trainerRepository.findById(data.trainerId);

    if (!trainer) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }

    if (
      data.paymentType === SalaryPaymentMethod.BANK_TRANSFER &&
      !data.accountHolderName?.trim()
    ) {
      throw new BadRequestException(
        "Account holder name is required for bank transfer",
      );
    }

    if (
      data.paymentType === SalaryPaymentMethod.BANK_TRANSFER &&
      !data.ifscCode?.trim()
    ) {
      throw new BadRequestException("IFSC code is required for bank transfer");
    }

    if (data.paymentType === SalaryPaymentMethod.UPI && !data.upiId?.trim()) {
      throw new BadRequestException("UPI ID is required");
    }

    const isBankTransfer =
      data.paymentType === SalaryPaymentMethod.BANK_TRANSFER;
    const isUpi = data.paymentType === SalaryPaymentMethod.UPI;
    const isCash = data.paymentType === SalaryPaymentMethod.CASH;

    const updatedTrainer = await this._trainerRepository.updateSalaryConfig(
      data.trainerId,
      {
        paymentType: data.paymentType,

        accountHolderName: isBankTransfer ? data.accountHolderName?.trim() : "",

        ifscCode: isBankTransfer ? data.ifscCode?.trim().toUpperCase() : "",

        upiId: isUpi ? data.upiId?.trim() : "",

        isPayoutEnabled: isCash || isUpi,

        stripeAccountStatus: isBankTransfer
          ? (trainer.salaryConfig?.stripeAccountStatus ??
            StripeAccountStatus.NOT_CREATED)
          : StripeAccountStatus.NOT_CREATED,

        stripeOnboardingCompleted: isBankTransfer
          ? (trainer.salaryConfig?.stripeOnboardingCompleted ?? false)
          : false,

        stripeConnectedAccountId: isBankTransfer
          ? trainer.salaryConfig?.stripeConnectedAccountId
          : "",

        bankName: isBankTransfer ? trainer.salaryConfig?.bankName : "",

        bankLast4: isBankTransfer ? trainer.salaryConfig?.bankLast4 : "",
      },
    );

    if (!updatedTrainer) {
      throw new BadRequestException("Failed to update salary config");
    }

    return TrainerSalaryConfigMapper.toResponseDto(updatedTrainer);
  }
}
