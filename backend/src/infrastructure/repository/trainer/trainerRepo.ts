import { BaseRepository } from "../base/baseRepo";
import { ITrainerModel } from "../databaseConfigs/models/trainerModel";
import { ITrainerRepository } from "../../../application/interfaces/repository/trainer.ts/tranerRepoInterface";
import { Model } from "mongoose";
import { TrainerEntity } from "../../../domain/entities/trainer/trainerEntity";
import { IListTrainerRequestDTO } from "../../../application/dtos/trainerDto/listAllTrainerDto";
import { Status } from "../../../domain/enums/status";

export class TrainerRepository
  extends BaseRepository<ITrainerModel>
  implements ITrainerRepository
{
  constructor(model: Model<ITrainerModel>) {
    super(model);
  }

  /* ================= BASIC ================= */

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

  /* ================= LIST ================= */

  async listAllTrainers(
    params: IListTrainerRequestDTO
  ): Promise<{
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
    gymId: string
  ): Promise<TrainerEntity[]> {
    return this._model.find({
      branchId,
      gymId,
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
    trainerId: string
  ): Promise<{ id: string }[]> {
    const trainers = await this._model.find(
      {
        branchId,
        status: Status.ACTIVE,
        _id: { $ne: trainerId },
      },
      { _id: 1 }
    );

    return trainers.map((t) => ({ id: t._id.toString() }));
  }
}
