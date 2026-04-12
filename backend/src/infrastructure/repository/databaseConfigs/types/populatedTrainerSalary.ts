import { PaymentStatus } from "../../../../domain/enums/paymentStatus";
import { SalaryPaymentMethod } from "../../../../domain/enums/salaryPaymentMethod";

export interface PopulatedtrainerSalary {
  _id?: string;
  gymId: string;
  branchId?: string;
  trainerId: {
    _id: string;
    name: string;
  };

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

  createdAt?: Date;
  updatedAt?: Date;
}
