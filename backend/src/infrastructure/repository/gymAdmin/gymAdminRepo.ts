import { IGymAdminRepository } from "../../../application/interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IGymAdminModel } from "../databaseConfigs/models/gymAdminModel";
import { Model } from "mongoose";
import { BaseRepository } from "../base/baseRepo";
import { GymAdminEntity } from "../../../domain/entities/gymAdmin/gymAdminEntity";
import { IListGymsRequestDTO } from "../../../application/dtos/superAdminDto/gymManagementDtos";
import { Status } from "../../../domain/enums/status";
import {
  GymAdminProfileResponseDTO,
} from "../../../application/dtos/gymAdminDto/gymAdminProfileDtos";
import { mapGymAdminToProfileResponse } from "../../../application/mappers/gymAdmin/profileMappers";

export class GymAdminRepository
  extends BaseRepository<IGymAdminModel>
  implements IGymAdminRepository
{
  constructor(model: Model<IGymAdminModel>) {
    super(model);
  }

  async findByEmail(email: string): Promise<GymAdminEntity | null> {
    const doc = await this._model.findOne({ email });
    if (!doc) return null;
    return doc;
  }

  async findBySubdomian(subdomain: string): Promise<GymAdminEntity | null> {
    const doc = await this._model.findOne({ subdomain });
    if (!doc) return null;
    return doc;
  }

  async listGyms(params: IListGymsRequestDTO): Promise<{
    gyms: (GymAdminEntity & { planName: string })[];
    total: number;
  }> {
    const skip = (params.page - 1) * params.limit;
    const filter = params.search
      ? { gymName: { $regex: params.search, $options: "i" } }
      : {};

    const gymsData = await this._model
      .find(filter)
      .populate("packageId", "planName")
      .skip(skip)
      .limit(params.limit)
      .sort({ createdAt: -1 });

    type GymWithSubscription = GymAdminEntity & {
      packageId?: {
        planName: string;
      };
    };
    const gyms = gymsData.map((gym) => {
      const g = gym.toObject() as GymWithSubscription;

      return {
        ...g,
        planName: g.packageId?.planName ?? "",
      };
    });

    const total = await this._model.countDocuments(filter);
    return { gyms, total };
  }

  async unBlockById(id: string): Promise<boolean> {
    const result = await this._model.updateOne(
      { _id: id },
      { $set: { status: Status.ACTIVE } }
    );
    return result.modifiedCount > 0;
  }

  async blockById(id: string): Promise<boolean> {
    const result = await this._model.updateOne(
      { _id: id },
      { $set: { status: Status.BLOCKED } }
    );
    return result.modifiedCount > 0;
  }

  async findGymAdminWithBranches( gymAdminId: string): Promise<GymAdminProfileResponseDTO | null> {
    const gymAdmin = await this._model
      .findOne({ _id: gymAdminId })
      .populate({
        path: "branches",
        select: "branchName",
      })
      .lean();

    if (!gymAdmin) return null;

    const branches: string[] = Array.isArray(gymAdmin.branches)
  ? gymAdmin.branches.map((branch: any) => branch?.branchName ?? "")
  : [];

    return mapGymAdminToProfileResponse(gymAdmin, branches);
  }
}
