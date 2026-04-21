import { StripeAccountStatus } from "../../../../domain/enums/stripeAccountStatus";
import { TrainerError } from "../../../../presentation/shared/constants/errorMessage/trainerMessage";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import {
  RefreshTrainerStripeStatusDto,
  TrainerSalaryConfigResponseDto,
} from "../../../dtos/trainerDto/trainerSalaryConfigDto";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IStripeService } from "../../../interfaces/service/stripeServiceInterface";
import { IRefreshTrainerStripeStatusUseCase } from "../../../interfaces/useCase/trainer/salaryManagement/refreshTrainerStripeStatusUseCaseInterface";
import { TrainerSalaryConfigMapper } from "../../../mappers/trainer/trainerSalaryConfigMapper";

export class RefreshTrainerStripeStatusUseCase implements IRefreshTrainerStripeStatusUseCase {
  constructor(
    private _trainerRepository: ITrainerRepository,
    private _stripeService: IStripeService,
  ) {}

  async execute(
    data: RefreshTrainerStripeStatusDto,
  ): Promise<TrainerSalaryConfigResponseDto> {
    const trainer = await this._trainerRepository.findById(data.trainerId);

    if (!trainer) {
      throw new NOtFoundException(TrainerError.TRAINER_NOT_FOUND);
    }

    const connectedAccountId = trainer.salaryConfig?.stripeConnectedAccountId;

    if (!connectedAccountId) {
      throw new BadRequestException("Stripe connected account not found");
    }

    const account =
      await this._stripeService.retrieveConnectedAccount(connectedAccountId);

    const payoutsEnabled = account.payoutsEnabled;
    const chargesEnabled = account.chargesEnabled;
    const requirementsPending = account.requirementsCurrentlyDueCount > 0;

    let stripeAccountStatus = StripeAccountStatus.PENDING;

    if (payoutsEnabled && chargesEnabled && !requirementsPending) {
      stripeAccountStatus = StripeAccountStatus.ACTIVE;
    } else if (requirementsPending) {
      stripeAccountStatus = StripeAccountStatus.RESTRICTED;
    }

    const updatedTrainer = await this._trainerRepository.updateSalaryConfig(
      data.trainerId,
      {
        stripeAccountStatus,
        stripeOnboardingCompleted: !requirementsPending,
        isPayoutEnabled: payoutsEnabled && !requirementsPending,
        bankName: account.bankName,
        bankLast4: account.bankLast4,
      },
    );

    if (!updatedTrainer) {
      throw new BadRequestException("Failed to refresh Stripe status");
    }

    return TrainerSalaryConfigMapper.toResponseDto(updatedTrainer);
  }
}
