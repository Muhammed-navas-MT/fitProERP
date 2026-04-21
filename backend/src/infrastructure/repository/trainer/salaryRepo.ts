import { Model } from "mongoose";
import { TrainerSalaryEntity } from "../../../domain/entities/trainer/salaryPaymentEntity";
import { BaseRepository } from "../base/baseRepo";
import { ITrainerSalaryModel } from "../databaseConfigs/models/salaryModel";
import { ITrainerSalaryRepository } from "../../../application/interfaces/repository/trainer.ts/trainerSalaryRepoInterface";
import { PopulatedtrainerSalary } from "../databaseConfigs/types/populatedTrainerSalary";
import { ListTrainerSalaryRequestDto } from "../../../application/dtos/trainerDto/salaryDtos";
import {
  IPopulatedSalary,
  IPopulatedSalaryBranch,
  IPopulatedSalaryTrainer,
} from "../databaseConfigs/types/populatedSalaryType";

export class TrainerSalaryRepository
  extends BaseRepository<ITrainerSalaryModel>
  implements ITrainerSalaryRepository
{
  constructor(model: Model<ITrainerSalaryModel>) {
    super(model);
  }

  async findByTrainerAndMonth(
    trainerId: string,
    salaryMonth: number,
    salaryYear: number,
  ): Promise<TrainerSalaryEntity | null> {
    return await this._model
      .findOne({
        trainerId,
        salaryMonth,
        salaryYear,
      })
      .lean<TrainerSalaryEntity | null>();
  }

  async findAllByTrainerId(
    trainerId: string,
    page: number,
    limit: number,
  ): Promise<{
    data: PopulatedtrainerSalary[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this._model
        .find({ trainerId })
        .populate({
          path: "trainerId",
          select: "_id name",
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean<PopulatedtrainerSalary[]>(),
      this._model.countDocuments({ trainerId }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByTrainerIdAndMonthYear(
    trainerId: string,
    salaryMonth: number,
    salaryYear: number,
  ): Promise<TrainerSalaryEntity | null> {
    return await this._model
      .findOne({
        trainerId,
        salaryMonth,
        salaryYear,
      })
      .lean<TrainerSalaryEntity | null>();
  }

  async createMany(data: TrainerSalaryEntity[]): Promise<void> {
    if (!data.length) return;
    await this._model.insertMany(data);
  }
  async findAllSalariesByGymId(
    params: ListTrainerSalaryRequestDto,
  ): Promise<{ salaries: PopulatedtrainerSalary[]; total: number }> {
    const { gymId, page, limit, paymentStatus } = params;

    const skip = (page - 1) * limit;

    const query: Record<string, unknown> = { gymId };

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    const [salaries, total] = await Promise.all([
      this._model
        .find(query)
        .populate({
          path: "trainerId",
          select: "_id name",
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean<PopulatedtrainerSalary[]>(),
      this._model.countDocuments(query),
    ]);

    return {
      salaries,
      total,
    };
  }
  async isSalaryGeneratedByGymAndMonthYear(
    gymId: string,
    salaryMonth: number,
    salaryYear: number,
  ): Promise<boolean> {
    const count = await this._model.countDocuments({
      gymId,
      salaryMonth,
      salaryYear,
    });

    return count > 0;
  }
  async findByStripePaymentIntentId(
    paymentIntentId: string,
  ): Promise<TrainerSalaryEntity | null> {
    const salary = await this._model
      .findOne({ stripePaymentIntentId: paymentIntentId })
      .lean();

    return salary;
  }

  async findDetailById(salaryId: string): Promise<IPopulatedSalary | null> {
    const salary = await this._model
      .findOne({ _id: salaryId })
      .populate<IPopulatedSalaryTrainer>("trainerId", "name email")
      .populate<IPopulatedSalaryBranch>("branchId", "branchName address")
      .lean<IPopulatedSalary>();
    return salary;
  }
}
