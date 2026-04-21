import { BaseRepository } from "../base/baseRepo";
import { ITrainerModel } from "../databaseConfigs/models/trainerModel";
import { ITrainerRepository } from "../../../application/interfaces/repository/trainer.ts/tranerRepoInterface";
import { Model } from "mongoose";
import { TrainerEntity } from "../../../domain/entities/trainer/trainerEntity";
import { IListTrainerRequestDTO } from "../../../application/dtos/trainerDto/listAllTrainerDto";
import { Status } from "../../../domain/enums/status";
import { SalaryPaymentMethod } from "../../../domain/enums/salaryPaymentMethod";
import { StripeAccountStatus } from "../../../domain/enums/stripeAccountStatus";

export class TrainerRepository
  extends BaseRepository<ITrainerModel>
  implements ITrainerRepository
{
  constructor(model: Model<ITrainerModel>) {
    super(model);
  }

  async findByEmail(email: string): Promise<TrainerEntity | null> {
    return this._model.findOne({ email });
  }

  async countTrainersByGymId(gymId: string): Promise<number> {
    return this._model.countDocuments({ gymId });
  }

  async countByBranchId(branchId: string): Promise<number> {
    return this._model.countDocuments({
      branchId,
      status: Status.ACTIVE,
    });
  }

  async listAllTrainers(params: IListTrainerRequestDTO): Promise<{
    trainers: (TrainerEntity & { branchName: string })[];
    total: number;
  }> {
    const skip = (params.page - 1) * params.limit;
    const search = params.search?.trim();
    const gymId = params.gymId;

    const filter = search
      ? { gymId, name: { $regex: search, $options: "i" } }
      : { gymId };

    const trainersData = await this._model
      .find(filter)
      .populate("branchId", "branchName")
      .skip(skip)
      .limit(params.limit)
      .sort({ createdAt: -1 });

    type TrainerWithBranch = TrainerEntity & {
      branchId?: { branchName: string };
    };

    const trainers = trainersData.map((trainer) => {
      const t = trainer.toObject() as TrainerWithBranch;
      return {
        ...t,
        branchName: t.branchId?.branchName ?? "",
      };
    });

    const total = await this._model.countDocuments(filter);

    return { trainers, total };
  }

  async listAllActiveTrainers(gymId: string): Promise<TrainerEntity[]> {
    return this._model.find({
      gymId,
      status: Status.ACTIVE,
    });
  }

  async findActiveTrainersByBranchAndGym(
    branchId: string,
    gymId: string,
  ): Promise<TrainerEntity[]> {
    return this._model.find({
      branchId,
      gymId,
      status: Status.ACTIVE,
    });
  }

  async findActiveTrainersByBranch(branchId: string): Promise<TrainerEntity[]> {
    return this._model.find({
      branchId,
      status: Status.ACTIVE,
    });
  }

  async countActiveTrainersByBranch(branchId: string): Promise<number> {
    return this._model.countDocuments({
      branchId,
      status: Status.ACTIVE,
    });
  }

  async findActiveTrainersByBranchExcludingTrainer(
    branchId: string,
    trainerId: string,
  ): Promise<{ id: string }[]> {
    const trainers = await this._model.find(
      {
        branchId,
        status: Status.ACTIVE,
        _id: { $ne: trainerId },
      },
      { _id: 1 },
    );

    return trainers.map((t) => ({ id: t._id.toString() }));
  }
  async countByGymId(gymId: string): Promise<number> {
    return await this._model.countDocuments({ gymId });
  }

  async countActiveByGymId(gymId: string): Promise<number> {
    return await this._model.countDocuments({
      gymId,
      status: Status.ACTIVE,
    });
  }
  async findByEmailAndGymId(data: {
    email: string;
    gymId: string;
  }): Promise<TrainerEntity | null> {
    return await this._model
      .findOne({ email: data.email, gymId: data.gymId })
      .lean();
  }
  async findActiveTrainersByGymId(gymId: string): Promise<TrainerEntity[]> {
    const trainers = await this._model.find({ gymId }).lean<TrainerEntity[]>();
    return trainers;
  }

  async getSalaryConfigByTrainerId(
    trainerId: string,
  ): Promise<TrainerEntity | null> {
    return await this._model.findById(trainerId).lean<TrainerEntity | null>();
  }

  async updateSalaryConfig(
    trainerId: string,
    data: {
      paymentType?: SalaryPaymentMethod;
      isPayoutEnabled?: boolean;
      stripeConnectedAccountId?: string;
      stripeAccountStatus?: StripeAccountStatus;
      stripeOnboardingCompleted?: boolean;
      accountHolderName?: string;
      bankName?: string;
      bankLast4?: string;
      ifscCode?: string;
      upiId?: string;
    },
  ): Promise<TrainerEntity | null> {
    const updateData: Record<string, unknown> = {};

    if (data.paymentType !== undefined) {
      updateData["salaryConfig.paymentType"] = data.paymentType;
    }

    if (data.isPayoutEnabled !== undefined) {
      updateData["salaryConfig.isPayoutEnabled"] = data.isPayoutEnabled;
    }

    if (data.stripeConnectedAccountId !== undefined) {
      updateData["salaryConfig.stripeConnectedAccountId"] =
        data.stripeConnectedAccountId;
    }

    if (data.stripeAccountStatus !== undefined) {
      updateData["salaryConfig.stripeAccountStatus"] = data.stripeAccountStatus;
    }

    if (data.stripeOnboardingCompleted !== undefined) {
      updateData["salaryConfig.stripeOnboardingCompleted"] =
        data.stripeOnboardingCompleted;
    }

    if (data.accountHolderName !== undefined) {
      updateData["salaryConfig.accountHolderName"] = data.accountHolderName;
    }

    if (data.bankName !== undefined) {
      updateData["salaryConfig.bankName"] = data.bankName;
    }

    if (data.bankLast4 !== undefined) {
      updateData["salaryConfig.bankLast4"] = data.bankLast4;
    }

    if (data.ifscCode !== undefined) {
      updateData["salaryConfig.ifscCode"] = data.ifscCode;
    }

    if (data.upiId !== undefined) {
      updateData["salaryConfig.upiId"] = data.upiId;
    }

    return await this._model
      .findByIdAndUpdate(trainerId, { $set: updateData }, { new: true })
      .lean<TrainerEntity | null>();
  }
}
