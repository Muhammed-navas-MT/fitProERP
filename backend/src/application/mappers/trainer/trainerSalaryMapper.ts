import { PopulatedtrainerSalary } from "../../../infrastructure/repository/databaseConfigs/types/populatedTrainerSalary";
import { TrainerSalaryResponseDto } from "../../dtos/trainerDto/salaryDtos";

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
}
