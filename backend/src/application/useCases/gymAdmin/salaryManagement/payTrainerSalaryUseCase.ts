import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { SalaryPaymentMethod } from "../../../../domain/enums/salaryPaymentMethod";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import {
  PayTrainerSalaryDto,
  PayTrainerSalaryResponseDto,
} from "../../../dtos/trainerDto/salaryDtos";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { ITrainerSalaryRepository } from "../../../interfaces/repository/trainer.ts/trainerSalaryRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IStripeService } from "../../../interfaces/service/stripeServiceInterface";
import { IPayTrainerSalaryUseCase } from "../../../interfaces/useCase/gymAdmin/salaryManagement/payTrainerSalaryUseCaseInterface";
import {
  convertInrToUsd,
  convertUsdToInr,
} from "../../../../presentation/shared/utils/currency";
import { Roles } from "../../../../domain/enums/roles";
import { IExchangeRateService } from "../../../interfaces/service/exchangeRateService";

export class PayTrainerSalaryUseCase implements IPayTrainerSalaryUseCase {
  constructor(
    private _trainerSalaryRepository: ITrainerSalaryRepository,
    private _gymAdminRepository: IGymAdminRepository,
    private _trainerRepository: ITrainerRepository,
    private _stripeService: IStripeService,
    private _exchangeRateService: IExchangeRateService,
  ) {}

  async execute(
    data: PayTrainerSalaryDto,
  ): Promise<PayTrainerSalaryResponseDto> {
    const salary = await this._trainerSalaryRepository.findById(data.salaryId);

    if (!salary || !salary._id) {
      throw new NOtFoundException("Salary record not found");
    }

    if (salary.paymentStatus === PaymentStatus.PAID) {
      throw new BadRequestException("Salary already paid");
    }

    if (salary.paymentStatus === PaymentStatus.PROCESSING) {
      throw new BadRequestException("Salary payment is already processing");
    }

    if (salary.paymentMethod !== SalaryPaymentMethod.STRIPE) {
      throw new BadRequestException(
        "This salary record is not configured for Stripe payment",
      );
    }

    const gymAdmin = await this._gymAdminRepository.findById(data.gymId);
    if (!gymAdmin) {
      throw new NOtFoundException("Gym admin not found");
    }

    const trainer = await this._trainerRepository.findById(salary.trainerId);
    if (!trainer) {
      throw new NOtFoundException("Trainer not found");
    }

    if (!gymAdmin.billingConfig?.stripeCustomerId) {
      throw new BadRequestException(
        "Gym admin Stripe customer is not configured",
      );
    }

    if (!gymAdmin.billingConfig?.defaultPaymentMethodId) {
      throw new BadRequestException(
        "Gym admin default payment method is not configured",
      );
    }

    if (!trainer.salaryConfig?.isPayoutEnabled) {
      throw new BadRequestException("Trainer payout is not enabled");
    }

    if (!trainer.salaryConfig?.stripeConnectedAccountId) {
      throw new BadRequestException(
        "Trainer Stripe connected account is not configured",
      );
    }

    const exchangeRate = await this._exchangeRateService.getRate("USD", "INR");
    console.log(exchangeRate, "usd");

    const usdAmount = convertInrToUsd(salary.netSalary, exchangeRate);
    const settledAmountInInr = convertUsdToInr(usdAmount, exchangeRate);

    try {
      const paymentIntent = await this._stripeService.createSalaryPaymentIntent(
        {
          customerId: gymAdmin.billingConfig.stripeCustomerId,
          paymentMethodId: gymAdmin.billingConfig.defaultPaymentMethodId,
          amount: usdAmount,
          currency: "usd",
          metadata: {
            type: "trainer_salary",
            role: Roles.GYMADMIN,
            gymId: salary.gymId.toString(),
            trainerId: salary.trainerId.toString(),
            salaryId: salary._id.toString(),
            salaryMonth: String(salary.salaryMonth),
            salaryYear: String(salary.salaryYear),
            connectedAccountId: trainer.salaryConfig.stripeConnectedAccountId,

            originalCurrency: "INR",
            originalAmountInInr: String(salary.netSalary),
            chargeCurrency: "USD",
            chargeAmountInUsd: String(usdAmount),
            exchangeRateUsed: String(exchangeRate),
          },
        },
      );

      await this._trainerSalaryRepository.update(
        {
          stripeCustomerId: gymAdmin.billingConfig.stripeCustomerId,
          stripePaymentMethodId: gymAdmin.billingConfig.defaultPaymentMethodId,
          stripePaymentIntentId: paymentIntent.paymentIntentId,
          paymentStatus: PaymentStatus.PROCESSING,
          receiptUrl: paymentIntent.receiptUrl,
          stripeChargeCurrency: "USD",
          stripeChargeAmount: usdAmount,
          exchangeRateUsed: exchangeRate,
          settledAmountInInr,
          updatedAt: new Date(),
        },
        salary._id.toString(),
      );

      return {
        salaryId: salary._id.toString(),
        paymentIntentId: paymentIntent.paymentIntentId,
        clientSecret: paymentIntent.clientSecret ?? null,
        paymentStatus: PaymentStatus.PROCESSING,
        message:
          "Salary charge initiated successfully. Final settlement will complete after Stripe webhook confirmation.",
      };
    } catch (error) {
      await this._trainerSalaryRepository.update(
        {
          paymentStatus: PaymentStatus.FAILED,
          updatedAt: new Date(),
        },
        salary._id.toString(),
      );

      throw error;
    }
  }
}
