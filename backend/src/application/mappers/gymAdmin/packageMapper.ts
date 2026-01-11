import { PackageEntity } from "../../../domain/entities/gymAdmin/packageEntity";
import {
  IListPackageRequestDTO,
  IListPackageResponseDTO,
  IViewPackageResponseDTO,
} from "../../dtos/gymAdminDto/packageDto";

export class PackageMapper {
  static toListPackageResponse(
    packages: PackageEntity[],
    total: number,
    params: IListPackageRequestDTO
  ): IListPackageResponseDTO {
    return {
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit),
      search: params.search,
      data:
        packages?.map((pkg) => ({
          id: pkg.id ?? "",
          gymId: pkg.gymId,
          branchId: pkg.branchId,
          name: pkg.name,
          price: pkg.price,
          durationInDays: pkg.durationInDays,
          features: pkg.features,
          isDailySession: pkg.isDailySession,
          isActive: pkg.isActive,
        })) ?? [],
    };
  }

  static toViewPackageResponse(
    packages: PackageEntity
  ): IViewPackageResponseDTO {
    return {
      branchId: packages.branchId,
      durationInDays: packages.durationInDays,
      features: packages.features,
      gymId: packages.gymId,
      id: packages.id?.toString() || "",
      isActive: packages.isActive,
      isDailySession: packages.isDailySession,
      name: packages.name,
      price: packages.price,
    };
  }
}
