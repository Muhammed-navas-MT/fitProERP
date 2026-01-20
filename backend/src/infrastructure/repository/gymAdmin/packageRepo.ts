import { BaseRepository } from "../base/baseRepo";
import { FilterQuery, Model } from "mongoose";
import { IPackageRespository } from "../../../application/interfaces/repository/gymAdmin/packageRepoInterface";
import { PackageEntity } from "../../../domain/entities/gymAdmin/packageEntity";
import { IPackageModel } from "../databaseConfigs/models/packageModel";
import { IListPackageRequestDTO } from "../../../application/dtos/gymAdminDto/packageDto";
import {
  IBranchPopulated,
  IPackageWithBranch,
} from "../databaseConfigs/types/packagePersistenceTypes";

export class PackageRepository
  extends BaseRepository<IPackageModel>
  implements IPackageRespository
{
  constructor(model: Model<IPackageModel>) {
    super(model);
  }

  async findByNameAndBranch(
    name: string,
    branchId?: string,
  ): Promise<IPackageWithBranch | null> {
    const query: FilterQuery<IPackageModel> = {
      name: { $regex: new RegExp(`^${name}$`, "i") },
    };

    if (branchId) {
      query.branchId = branchId;
    }

    const doc = await this._model
      .findOne(query)
      .populate<{ branchId: IBranchPopulated }>({
        path: "branchId",
        select: "branchName",
      })
      .lean<IPackageWithBranch>();

    return doc ?? null;
  }

  async listAllPackage(
    params: IListPackageRequestDTO,
    gymId: string,
  ): Promise<{ packages: IPackageWithBranch[]; total: number }> {
    const { page, limit, search, branchId } = params;

    const query: FilterQuery<IPackageModel> = { gymId };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (branchId?.trim()) {
      query.branchId = branchId;
    }

    const skip = (page - 1) * limit;

    const [packages, total] = await Promise.all([
      this._model
        .find(query)
        .populate<{ branchId: IBranchPopulated }>({
          path: "branchId",
          select: "branchName",
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean<IPackageWithBranch[]>(),
      this._model.countDocuments(query),
    ]);

    return { packages, total };
  }

  async listAllActivePackage(): Promise<PackageEntity[] | null> {
    const docs = await this._model.find({
      isActive: true,
    });
    if (!docs) return null;
    return docs;
  }

  async findByIdAndBranch(
    id: string,
    branchId?: string,
  ): Promise<IPackageWithBranch | null> {
    const query: FilterQuery<IPackageModel> = {
      _id: id,
    };

    if (branchId) {
      query.branchId = branchId;
    }

    const doc = await this._model
      .findOne(query)
      .populate<{ branchId: IBranchPopulated }>({
        path: "branchId",
        select: "branchName",
      })
      .lean<IPackageWithBranch>();

    return doc ?? null;
  }
  async findActivePackageByBranchIdAndGymId(
    branchId: string,
    gymId: string,
  ): Promise<PackageEntity[]> {
    const packages = await this._model
      .find({
        branchId: branchId,
        gymId: gymId,
        isActive: true,
      })
      .sort({ createdAt: -1 });

    return packages;
  }
}
