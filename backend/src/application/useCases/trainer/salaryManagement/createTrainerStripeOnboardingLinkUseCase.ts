import { SalaryPaymentMethod } from "../../../../domain/enums/salaryPaymentMethod";
import { StripeAccountStatus } from "../../../../domain/enums/stripeAccountStatus";
import { stripe } from "../../../../infrastructure/services/stripeClient";
import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import {
  CreateTrainerOnboardingLinkDto,
  CreateTrainerOnboardingLinkResponseDto,
} from "../../../dtos/trainerDto/trainerSalaryConfigDto";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IStripeService } from "../../../interfaces/service/stripeServiceInterface";
import { ICreateTrainerStripeOnboardingLinkUseCase } from "../../../interfaces/useCase/trainer/salaryManagement/createTrainerStripeOnboardingLinkUseCaseInterface";

export class CreateTrainerStripeOnboardingLinkUseCase implements ICreateTrainerStripeOnboardingLinkUseCase {
  constructor(
    private _trainerRepository: ITrainerRepository,
    private _stripeService: IStripeService,
  ) {}

  async execute(
    data: CreateTrainerOnboardingLinkDto,
  ): Promise<CreateTrainerOnboardingLinkResponseDto> {
    const trainer = await this._trainerRepository.findById(data.trainerId);

    if (!trainer) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }

    if (!trainer.salaryConfig) {
      throw new BadRequestException(
        "Salary config not found. Please save salary settings first",
      );
    }

    const account = await stripe.accounts.retrieve();
    console.log(account.country);

    if (
      trainer.salaryConfig.paymentType !== SalaryPaymentMethod.BANK_TRANSFER
    ) {
      throw new BadRequestException(
        "Stripe onboarding is only available for bank transfer payout type",
      );
    }

    let connectedAccountId = trainer.salaryConfig.stripeConnectedAccountId;

    if (!connectedAccountId) {
      const account = await this._stripeService.createConnectedAccount({
        email: trainer.email,
        name: trainer.name,
      });

      connectedAccountId = account.accountId;

      const updatedTrainer = await this._trainerRepository.updateSalaryConfig(
        data.trainerId,
        {
          stripeConnectedAccountId: connectedAccountId,
          stripeAccountStatus: StripeAccountStatus.PENDING,
          stripeOnboardingCompleted: false,
          isPayoutEnabled: false,
        },
      );

      if (!updatedTrainer) {
        throw new BadRequestException(
          "Failed to save Stripe connected account details",
        );
      }
    }

    const onboardingLink =
      await this._stripeService.createConnectedAccountOnboardingLink({
        accountId: connectedAccountId,
        refreshUrl: data.refreshUrl,
        returnUrl: data.returnUrl,
      });

    return {
      accountId: connectedAccountId,
      url: onboardingLink.url,
    };
  }
}
