import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { SalaryPaymentMethod } from "../../../../domain/enums/salaryPaymentMethod";
import { PayTrainerSalaryDto } from "../../../dtos/trainerDto/salaryDtos";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ITrainerSalaryRepository } from "../../../interfaces/repository/trainer.ts/trainerSalaryRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IStripeService } from "../../../interfaces/service/stripeServiceInterface";
import { IPayTrainerSalaryUseCase } from "../../../interfaces/useCase/gymAdmin/salaryManagement/payTrainerSalaryUseCaseInterface";

export class PayTrainerSalaryUseCase implements IPayTrainerSalaryUseCase {
  constructor(
    private _trainerSalaryRepository: ITrainerSalaryRepository,
    private _gymAdminRepository: IGymAdminRepository,
    private _trainerRepository: ITrainerRepository,
    private _stripeService: IStripeService,
  ) {}

  async execute(data: PayTrainerSalaryDto): Promise<void> {
    const salary = await this._trainerSalaryRepository.findById(data.salaryId);
    if (!salary) {
      throw new Error("Salary record not found");
    }

    if (salary.paymentStatus === PaymentStatus.PAID) {
      throw new Error("Salary already paid");
    }

    const gymAdmin = await this._gymAdminRepository.findById(data.gymId);
    if (!gymAdmin) {
      throw new Error("Gym admin not found");
    }

    const trainer = await this._trainerRepository.findById(salary.trainerId);
    if (!trainer) {
      throw new Error("Trainer not found");
    }

    if (salary.paymentMethod !== SalaryPaymentMethod.STRIPE) {
      throw new Error(
        "This salary record is not configured for Stripe payment",
      );
    }

    if (!gymAdmin.billingConfig?.stripeCustomerId) {
      throw new Error("Gym admin Stripe customer is not configured");
    }

    if (!gymAdmin.billingConfig?.defaultPaymentMethodId) {
      throw new Error("Gym admin default payment method is not configured");
    }

    if (!trainer.salaryConfig?.isPayoutEnabled) {
      throw new Error("Trainer payout is not enabled");
    }

    if (!trainer.salaryConfig?.stripeConnectedAccountId) {
      throw new Error("Trainer Stripe connected account is not configured");
    }

    try {
      const paymentIntent = await this._stripeService.createSalaryPaymentIntent(
        {
          customerId: gymAdmin.billingConfig.stripeCustomerId,
          paymentMethodId: gymAdmin.billingConfig.defaultPaymentMethodId,
          amount: salary.netSalary,
          currency: salary.currency.toLowerCase(),
          metadata: {
            type: "trainer_salary",
            gymId: salary.gymId,
            trainerId: salary.trainerId,
            salaryId: salary._id!,
            salaryMonth: String(salary.salaryMonth),
            salaryYear: String(salary.salaryYear),
          },
        },
      );

      const transfer =
        await this._stripeService.createTransferToConnectedAccount({
          amount: salary.netSalary,
          currency: salary.currency.toLowerCase(),
          destinationAccountId: trainer.salaryConfig.stripeConnectedAccountId,
          metadata: {
            type: "trainer_salary_transfer",
            salaryId: salary._id!,
            trainerId: salary.trainerId,
          },
        });

      const payout = await this._stripeService.createPayoutForConnectedAccount({
        connectedAccountId: trainer.salaryConfig.stripeConnectedAccountId,
        amount: salary.netSalary,
        currency: salary.currency.toLowerCase(),
        metadata: {
          type: "trainer_salary_payout",
          salaryId: salary._id!,
          trainerId: salary.trainerId,
        },
      });

      const updatedSalary = await this._trainerSalaryRepository.update(
        {
          paymentStatus: PaymentStatus.PAID,
          stripeCustomerId: gymAdmin.billingConfig.stripeCustomerId,
          stripePaymentMethodId: gymAdmin.billingConfig.defaultPaymentMethodId,
          stripePaymentIntentId: paymentIntent.paymentIntentId,
          stripeTransferId: transfer.transferId,
          stripePayoutId: payout.payoutId,
          stripeConnectedAccountId:
            trainer.salaryConfig.stripeConnectedAccountId,
          receiptUrl: paymentIntent.receiptUrl,
          paidAt: new Date(),
          updatedAt: new Date(),
        },
        salary._id!,
      );

      if (!updatedSalary) {
        throw new Error("Failed to update salary after payment");
      }
    } catch (error) {
      await this._trainerSalaryRepository.update(
        {
          paymentStatus: PaymentStatus.FAILED,
          updatedAt: new Date(),
        },
        salary._id!,
      );

      throw error;
    }
  }
}
