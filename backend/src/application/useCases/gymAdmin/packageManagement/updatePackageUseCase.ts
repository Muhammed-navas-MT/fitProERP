import { PackageErrorMessage } from "../../../../presentation/shared/constants/messages/packageMessages";
import { BadRequestException, NOtFoundException } from "../../../constants/exceptions";
import { IUpdatePackageRequestDTO } from "../../../dtos/gymAdminDto/packageDto";
import { IPackageRespository } from "../../../interfaces/repository/gymAdmin/packageRepoInterface";
import { IUpdatePakcageUseCase } from "../../../interfaces/useCase/gymAdmin/packageManagement/updatePackageUseCaseInterface";

export class UpdatePackageUseCase implements IUpdatePakcageUseCase {
  constructor(private _packageRepository: IPackageRespository) {}

  async execute(data: IUpdatePackageRequestDTO, packageId: string): Promise<void> {
    try {
      const existing = await this._packageRepository.findById(packageId);
      if (!existing) {
        throw new NOtFoundException(PackageErrorMessage.NOT_FOUND);
      }
      if (data.name && data.branchId) {
        const duplicate = await this._packageRepository.findByNameAndBranch(data.name, data.branchId);
        if (duplicate && duplicate._id.toString() !== packageId) {
          throw new BadRequestException(PackageErrorMessage.ALREADY_EXISTS);
        }
      }
      await this._packageRepository.update(data, packageId);
    } catch (error) {
      throw error;
    }
  }
}
