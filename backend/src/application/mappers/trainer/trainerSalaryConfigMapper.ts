import { TrainerEntity } from "../../../domain/entities/trainer/trainerEntity";
import { StripeAccountStatus } from "../../../domain/enums/stripeAccountStatus";
import { SalaryPaymentMethod } from "../../../domain/enums/salaryPaymentMethod";
import { TrainerSalaryConfigResponseDto } from "../../dtos/trainerDto/trainerSalaryConfigDto";

export class TrainerSalaryConfigMapper {
  static toResponseDto(trainer: TrainerEntity): TrainerSalaryConfigResponseDto {
    return {
      paymentType:
        trainer.salaryConfig?.paymentType ?? SalaryPaymentMethod.CASH,
      isPayoutEnabled: trainer.salaryConfig?.isPayoutEnabled ?? false,
      stripeConnectedAccountId: trainer.salaryConfig?.stripeConnectedAccountId,
      stripeAccountStatus:
        trainer.salaryConfig?.stripeAccountStatus ??
        StripeAccountStatus.NOT_CREATED,
      stripeOnboardingCompleted:
        trainer.salaryConfig?.stripeOnboardingCompleted ?? false,
      accountHolderName: trainer.salaryConfig?.accountHolderName,
      bankName: trainer.salaryConfig?.bankName,
      bankLast4: trainer.salaryConfig?.bankLast4,
      ifscCode: trainer.salaryConfig?.ifscCode,
      upiId: trainer.salaryConfig?.upiId,
    };
  }
}
