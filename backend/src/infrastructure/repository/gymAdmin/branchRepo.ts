import { FilterQuery, Model } from "mongoose";
import { IBranchRepository } from "../../../application/interfaces/repository/gymAdmin/branchRepoInterface";
import { BaseRepository } from "../base/baseRepo";
import { IBranchModel } from "../databaseConfigs/models/branchModel";
import {
  IFindByNameAndLocationDTO,
  IListBranchRequestDTO,
} from "../../../application/dtos/gymAdminDto/BranchDto";
import { IBranchEntity } from "../../../domain/entities/gymAdmin/branchEntity";
import { Status } from "../../../domain/enums/status";

export class BranchRepository
  extends BaseRepository<IBranchModel>
  implements IBranchRepository
{
  constructor(model: Model<IBranchModel>) {
    super(model);
  }

  async findByNameAndLocation(
    params: IFindByNameAndLocationDTO
  ): Promise<IBranchEntity | null> {
    const { gymId, branchName, city, pincode } = params;

    const branch = await this._model.findOne({
      gymId,
      branchName,
      "address.city": city,
      "address.pincode": pincode,
    });

    return branch ? (branch.toObject() as IBranchEntity) : null;
  }

  async listAllBranch(
    params: IListBranchRequestDTO
  ): Promise<{ branch: IBranchEntity[]; total: number }> {
    const { gymId, page = 1, limit = 5, search } = params;

    const query: FilterQuery<IBranchModel> = {
      gymId,
    };

    if (search) {
      query.$or = [
        { branchName: { $regex: search, $options: "i" } },
        { "address.street": { $regex: search, $options: "i" } },
        { "address.city": { $regex: search, $options: "i" } },
        { "address.state": { $regex: search, $options: "i" } },
        { "address.country": { $regex: search, $options: "i" } },
        { "address.pincode": { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [branches, total] = await Promise.all([
      this._model
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),

      this._model.countDocuments(query),
    ]);

    return {
      branch: branches as IBranchEntity[],
      total,
    };
  }
  async listAllActiveBranch(gymId: string): Promise<IBranchEntity[]> {
  try {
    const branches = await this._model
      .find({ gymId, status: Status.ACTIVE })
      .lean();

    return branches;
  } catch (error) {
    throw error;
  }
}

}
