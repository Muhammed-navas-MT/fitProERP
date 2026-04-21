import { IPopulatedSalary } from "../../../infrastructure/repository/databaseConfigs/types/populatedSalaryType";
import { PopulatedtrainerSalary } from "../../../infrastructure/repository/databaseConfigs/types/populatedTrainerSalary";
import {
  FindDetailSalaryResponseDto,
  TrainerSalaryResponseDto,
} from "../../dtos/trainerDto/salaryDtos";
import {
  ListSalaryResponseDto,
  viewDetailSalaryResponseDto,
} from "../../dtos/trainerDto/trainerSalaryConfigDto";

export class TrainerSalaryMapper {
  static toResponseDto(data: PopulatedtrainerSalary): TrainerSalaryResponseDto {
    return {
      id: data._id?.toString() as string,
      trainerName: data.trainerId.name,
      trainerId: data.trainerId._id,
      currency: data.currency,
      salaryMonth: data.salaryMonth,
      salaryYear: data.salaryYear,
      salaryMonthLabel: data.salaryMonthLabel,
      grossSalary: data.grossSalary,
      totalDeduction: data.totalDeduction,
      netSalary: data.netSalary,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentStatus,
      paidAt: data.paidAt,
      dueDate: data.dueDate,
      createdAt: data.createdAt,
    };
  }
  static toSalaryResponseDto(
    data: PopulatedtrainerSalary,
  ): ListSalaryResponseDto {
    return {
      id: data._id?.toString() as string,
      currency: data.currency,
      salaryMonth: data.salaryMonth,
      salaryYear: data.salaryYear,
      salaryMonthLabel: data.salaryMonthLabel,
      grossSalary: data.grossSalary,
      totalDeduction: data.totalDeduction,
      netSalary: data.netSalary,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentStatus,
      paidAt: data.paidAt,
      dueDate: data.dueDate,
      createdAt: data.createdAt,
    };
  }
  static toSalaryDetailResponse(
    data: IPopulatedSalary,
  ): FindDetailSalaryResponseDto {
    return {
      id: data._id?.toString() as string,
      branch: {
        branchName: data.branchId.branchName,
        address: [
          data.branchId.address.street,
          data.branchId.address.city,
          data.branchId.address.state,
          data.branchId.address.country,
          data.branchId.address.pincode,
        ]
          .filter(Boolean)
          .join(", "),
      },

      trainer: {
        name: data.trainerId.name,
        email: data.trainerId.email,
      },

      salaryMonth: data.salaryMonth,
      salaryYear: data.salaryYear,
      salaryMonthLabel: data.salaryMonthLabel,

      salaryBreakdown: {
        baseSalary: data.salaryBreakdown.baseSalary || 0,
        totalSessions: data.salaryBreakdown.totalSessions || 0,
        commissionRate: data.salaryBreakdown.commissionRate || 0,
        commissionAmount: data.salaryBreakdown.commissionAmount || 0,
        bonus: data.salaryBreakdown.bonus || 0,
        leaveDeduction: data.salaryBreakdown.leaveDeduction || 0,
        otherDeduction: data.salaryBreakdown.otherDeduction || 0,
        manualAdjustment: data.salaryBreakdown.manualAdjustment || 0,
      },

      grossSalary: data.grossSalary,
      totalDeduction: data.totalDeduction,
      netSalary: data.netSalary,

      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentStatus,
      currency: data.currency,

      paidAt: data.paidAt ?? null,
      dueDate: data.dueDate ?? null,

      receiptUrl: data.receiptUrl ?? null,

      exchangeRateUsed: data.exchangeRateUsed,
      settledAmountInInr: data.settledAmountInInr,
      stripeChargeAmount: data.stripeChargeAmount,
      stripeChargeCurrency: data.stripeChargeCurrency,

      createdAt: data.createdAt,
    };
  }

  static toTrainerSalaryDetailResponse(
    data: IPopulatedSalary,
  ): viewDetailSalaryResponseDto {
    return {
      id: data._id?.toString() as string,

      salaryMonth: data.salaryMonth,
      salaryYear: data.salaryYear,
      salaryMonthLabel: data.salaryMonthLabel,

      salaryBreakdown: {
        baseSalary: data.salaryBreakdown.baseSalary || 0,
        totalSessions: data.salaryBreakdown.totalSessions || 0,
        commissionRate: data.salaryBreakdown.commissionRate || 0,
        commissionAmount: data.salaryBreakdown.commissionAmount || 0,
        bonus: data.salaryBreakdown.bonus || 0,
        leaveDeduction: data.salaryBreakdown.leaveDeduction || 0,
        otherDeduction: data.salaryBreakdown.otherDeduction || 0,
        manualAdjustment: data.salaryBreakdown.manualAdjustment || 0,
      },

      grossSalary: data.grossSalary,
      totalDeduction: data.totalDeduction,
      netSalary: data.netSalary,

      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentStatus,
      currency: data.currency,

      paidAt: data.paidAt ?? null,
      dueDate: data.dueDate ?? null,

      receiptUrl: data.receiptUrl ?? null,

      exchangeRateUsed: data.exchangeRateUsed,
      settledAmountInInr: data.settledAmountInInr,
      stripeChargeAmount: data.stripeChargeAmount,
      stripeChargeCurrency: data.stripeChargeCurrency,

      createdAt: data.createdAt,
    };
  }
}
