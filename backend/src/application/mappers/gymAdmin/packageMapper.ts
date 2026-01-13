import { PackageEntity } from "../../../domain/entities/gymAdmin/packageEntity";
import { IPackageWithBranch } from "../../../infrastructure/repository/databaseConfigs/types/packagePersistenceTypes";
import {
  IListPackageRequestDTO,
  IListPackageResponseDTO,
  IViewPackageResponseDTO,
} from "../../dtos/gymAdminDto/packageDto";

export class PackageMapper {
  static toListPackageResponse(
    packages: IPackageWithBranch[],
    total: number,
    params: IListPackageRequestDTO
  ): IListPackageResponseDTO {

    return {
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit),
      search: params.search,
      data: packages.map((pkg) => ({
        id: pkg._id?.toString() ?? "",
        gymId: pkg.gymId,
        branchId: pkg.branchId?._id?.toString() ?? "",
        branchName: pkg.branchId?.branchName ?? "",
        name: pkg.name,
        price: pkg.price,
        durationInDays: pkg.durationInDays,
        features: pkg.features,
        isDailySession: pkg.isDailySession,
        isActive: pkg.isActive,
      })),
    }
  }

  static toViewPackageResponse(
    pkg: IPackageWithBranch
  ): IViewPackageResponseDTO {
    return {
      id: pkg._id,
      gymId: pkg.gymId,
      branchId: pkg.branchId?._id?.toString() ?? "",
      branchName: pkg.branchId?.branchName ?? "",
      name: pkg.name,
      price: pkg.price,
      durationInDays: pkg.durationInDays,
      features: pkg.features,
      isDailySession: pkg.isDailySession,
      isActive: pkg.isActive,
    }
  }
}
