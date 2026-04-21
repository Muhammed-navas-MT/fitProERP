import { TrainerSalaryEntity } from "../../../../domain/entities/trainer/salaryPaymentEntity";
import { IPopulatedSalary } from "../../../../infrastructure/repository/databaseConfigs/types/populatedSalaryType";
import { PopulatedtrainerSalary } from "../../../../infrastructure/repository/databaseConfigs/types/populatedTrainerSalary";
import { ListTrainerSalaryRequestDto } from "../../../dtos/trainerDto/salaryDtos";
import { IBaseRepository } from "../base/baseRepo";

export interface ITrainerSalaryRepository extends IBaseRepository<TrainerSalaryEntity> {
  createMany(data: TrainerSalaryEntity[]): Promise<void>;
  findByTrainerAndMonth(
    trainerId: string,
    salaryMonth: number,
    salaryYear: number,
  ): Promise<TrainerSalaryEntity | null>;
  findAllByTrainerId(
    trainerId: string,
    page: number,
    limit: number,
  ): Promise<{
    data: PopulatedtrainerSalary[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  findByTrainerIdAndMonthYear(
    trainerId: string,
    salaryMonth: number,
    salaryYear: number,
  ): Promise<TrainerSalaryEntity | null>;
  findAllSalariesByGymId(
    params: ListTrainerSalaryRequestDto,
  ): Promise<{ salaries: PopulatedtrainerSalary[]; total: number }>;
  isSalaryGeneratedByGymAndMonthYear(
    gymId: string,
    salaryMonth: number,
    salaryYear: number,
  ): Promise<boolean>;
  findByStripePaymentIntentId(
    paymentIntentId: string,
  ): Promise<TrainerSalaryEntity | null>;
  findDetailById(salaryId: string): Promise<IPopulatedSalary | null>;
}
