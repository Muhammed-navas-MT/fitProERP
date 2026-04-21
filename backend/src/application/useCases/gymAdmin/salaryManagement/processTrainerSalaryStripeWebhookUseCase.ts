import Stripe from "stripe";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import {
  BadRequestException,
  NOtFoundException,
} from "../../../constants/exceptions";
import { ITrainerSalaryRepository } from "../../../interfaces/repository/trainer.ts/trainerSalaryRepoInterface";
import { ITrainerRepository } from "../../../interfaces/repository/trainer.ts/tranerRepoInterface";
import { IStripeService } from "../../../interfaces/service/stripeServiceInterface";
import { IProcessTrainerSalaryStripeWebhookUseCase } from "../../../interfaces/useCase/gymAdmin/salaryManagement/processTrainerSalaryStripeWebhookUseCaseInterface";
import { INotificationService } from "../../../interfaces/service/notificationServiceInterface";
import { IGymAdminExpenseRepository } from "../../../interfaces/repository/gymAdmin/expenseRepoInterface";
import { ExpenseType } from "../../../../domain/enums/expenseType";
import { ExpencseCreateModel } from "../../../../domain/enums/expenseCreateModel";
import { PaymentMethod } from "../../../../domain/enums/paymentMethod";
import { Roles } from "../../../../domain/enums/roles";
import { NotificationType } from "../../../../domain/enums/notificationTypes";

export class ProcessTrainerSalaryStripeWebhookUseCase implements IProcessTrainerSalaryStripeWebhookUseCase {
  constructor(
    private _trainerSalaryRepository: ITrainerSalaryRepository,
    private _trainerRepository: ITrainerRepository,
    private _stripeService: IStripeService,
    private _notificationService: INotificationService,
    private _expenseRepository: IGymAdminExpenseRepository,
  ) {}

  async execute(event: Stripe.Event): Promise<void> {
    try {
      if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const metadata = paymentIntent.metadata || {};

        if (metadata.type !== "trainer_salary") return;

        const salaryId = metadata.salaryId;
        if (!salaryId) {
          throw new BadRequestException("salaryId metadata is missing");
        }

        const salary = await this._trainerSalaryRepository.findById(salaryId);

        if (!salary || !salary._id) {
          throw new NOtFoundException("Salary record not found for webhook");
        }

        if (
          salary.paymentStatus === PaymentStatus.PAID &&
          salary.stripeTransferId
        ) {
          return;
        }

        const trainer = await this._trainerRepository.findById(
          salary.trainerId,
        );

        if (!trainer) {
          throw new NOtFoundException("Trainer not found");
        }

        if (!trainer.salaryConfig?.stripeConnectedAccountId) {
          throw new BadRequestException(
            "Trainer Stripe connected account is not configured",
          );
        }

        const stripeChargeAmount =
          salary.stripeChargeAmount && salary.stripeChargeAmount > 0
            ? salary.stripeChargeAmount
            : Number(metadata.chargeAmountInUsd);

        if (!stripeChargeAmount || stripeChargeAmount <= 0) {
          throw new BadRequestException(
            "Stripe charge amount in USD is missing in both salary record and metadata",
          );
        }

        const exchangeRateUsed =
          salary.exchangeRateUsed && salary.exchangeRateUsed > 0
            ? salary.exchangeRateUsed
            : Number(metadata.exchangeRateUsed);

        const transfer =
          await this._stripeService.createTransferToConnectedAccount({
            amount: stripeChargeAmount,
            currency: "usd",
            destinationAccountId: trainer.salaryConfig.stripeConnectedAccountId,
            transferGroup: `salary_${salary._id.toString()}`,
            sourceTransaction:
              typeof paymentIntent.latest_charge === "string"
                ? paymentIntent.latest_charge
                : undefined,
            metadata: {
              type: "trainer_salary_transfer",
              salaryId: salary._id.toString(),
              trainerId: salary.trainerId.toString(),
              paymentIntentId: paymentIntent.id,
              originalCurrency: "INR",
              originalAmountInInr: String(salary.netSalary),
              transferCurrency: "USD",
              transferAmountInUsd: String(stripeChargeAmount),
              exchangeRateUsed: String(exchangeRateUsed || ""),
            },
          });

        await this._trainerSalaryRepository.update(
          {
            paymentStatus: PaymentStatus.PAID,
            stripePaymentIntentId: paymentIntent.id,
            stripeTransferId: transfer.transferId,
            stripeConnectedAccountId:
              trainer.salaryConfig.stripeConnectedAccountId,
            stripeChargeAmount: stripeChargeAmount,
            stripeChargeCurrency: "USD",
            exchangeRateUsed: exchangeRateUsed || salary.exchangeRateUsed,
            paidAt: new Date(),
            updatedAt: new Date(),
          },
          salary._id.toString(),
        );

        await this._expenseRepository.create({
          gymId: trainer.gymId.toString(),
          branchId: trainer.branchId?.toString() || "",
          expenseType: ExpenseType.TRAINER_SALARY,
          description: `Trainer salary paid for ${trainer.name}`,
          createdBy: trainer.gymId.toString(),
          createdByModel: ExpencseCreateModel.GYMADMIN,
          amount: salary.netSalary,
          status: PaymentStatus.PAID,
          paymentDate: new Date(),
          paymentMethod: PaymentMethod.ONLINE,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await this._notificationService.notifyMany([
          {
            receiverId: salary.trainerId.toString(),
            receiverRole: Roles.TRAINER,
            title: "Salary Credited",
            message: `Your salary payment has been processed successfully for month ${salary.salaryMonth}/${salary.salaryYear}.`,
            type: NotificationType.PAYMENT_SUCCESS,
            actionLink: "/trainer/salary",
            relatedId: salary._id.toString(),
            relatedModel: "TrainerSalary",
          },
          {
            receiverId: trainer.gymId.toString(),
            receiverRole: Roles.GYMADMIN,
            title: "Trainer Salary Paid",
            message: `Salary payment for ${trainer.name} has been completed successfully.`,
            type: NotificationType.PAYMENT_SUCCESS,
            actionLink: "/gym-admin/salary-management",
            relatedId: salary._id.toString(),
            relatedModel: "TrainerSalary",
          },
        ]);

        return;
      }

      if (event.type === "payment_intent.payment_failed") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const metadata = paymentIntent.metadata || {};

        if (metadata.type !== "trainer_salary") return;

        const salaryId = metadata.salaryId;
        if (!salaryId) return;

        await this._trainerSalaryRepository.update(
          {
            paymentStatus: PaymentStatus.FAILED,
            updatedAt: new Date(),
          },
          salaryId,
        );
      }
    } catch (error) {
      console.error("TRAINER SALARY WEBHOOK ERROR =>", error);
      throw error;
    }
  }
}
