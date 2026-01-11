import { BaseRepository } from "../base/baseRepo";
import { FilterQuery, Model } from "mongoose";
import { IPackageRespository } from "../../../application/interfaces/repository/gymAdmin/packageRepoInterface";
import { PackageEntity } from "../../../domain/entities/gymAdmin/packageEntity";
import { IPackageModel } from "../databaseConfigs/models/packageModel";
import { IListPackageRequestDTO } from "../../../application/dtos/gymAdminDto/packageDto";

export class PackageRepository
  extends BaseRepository<IPackageModel>
  implements IPackageRespository
{
  constructor(model: Model<IPackageModel>) {
    super(model);
  }

  async findByNameAndBranch(name: string,branchId: string): Promise<PackageEntity | null> {
    const query: FilterQuery<IPackageModel> = {
      name: { $regex: new RegExp(`^${name}$`, "i") },
    }
    if (branchId) {
      query.branchId = branchId
    }

    const doc = await this._model.findOne(query)
    if(!doc) return null;
    return doc
  }

  async listAllPackage(
    params: IListPackageRequestDTO,
    gymId: string
  ): Promise<{ packages: PackageEntity[]; total: number }> {
    const { page, limit, search, branchId } = params

    const query: FilterQuery<IPackageModel> = {
      gymId,
    }
    if (search) {
      query.name = { $regex: search, $options: "i" }
    }
    if (branchId && branchId.trim() !== "") {
      query.branchId = branchId
    }
    const skip = (page - 1) * limit

    const [packages, total] = await Promise.all([
      this._model.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      this._model.countDocuments(query),
    ])

    return {packages,total};
  }

  async listAllActivePackage(): Promise<PackageEntity[] | null> {
    const docs = await this._model.find({
      isActive: true,
    })
    if(!docs)return null
    return docs
  } 
}
