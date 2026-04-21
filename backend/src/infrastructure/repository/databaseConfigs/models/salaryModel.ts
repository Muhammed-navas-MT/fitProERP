import { Document, model } from "mongoose";
import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { SalaryPaymentMethod } from "../../../../domain/enums/salaryPaymentMethod";
import { trainerSalarySchema } from "../schemas/salarySchema";

export interface ITrainerSalaryModel extends Document {
  _id: string;
  gymId: string;
  branchId?: string;
  trainerId: string;

  salaryMonth: number;
  salaryYear: number;
  salaryMonthLabel: string;

  salaryBreakdown: {
    baseSalary: number;
    totalSessions?: number;
    commissionRate?: number;
    commissionAmount?: number;
    bonus?: number;
    leaveDeduction?: number;
    otherDeduction?: number;
    manualAdjustment?: number;
  };

  grossSalary: number;
  totalDeduction: number;
  netSalary: number;

  paymentMethod: SalaryPaymentMethod;
  paymentStatus: PaymentStatus;
  currency: "INR";

  dueDate?: Date;
  paidAt?: Date;

  stripeCustomerId?: string;
  stripePaymentMethodId?: string;
  stripePaymentIntentId?: string;
  stripeTransferId?: string;
  stripePayoutId?: string;
  stripeConnectedAccountId?: string;

  receiptUrl?: string;

  stripeChargeCurrency?: "USD";
  stripeChargeAmount?: number;
  exchangeRateUsed?: number;
  settledAmountInInr?: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const trainerSalaryModel = model<ITrainerSalaryModel>(
  "TrainerSalary",
  trainerSalarySchema,
);
