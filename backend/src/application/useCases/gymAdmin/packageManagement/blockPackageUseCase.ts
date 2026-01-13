import { PackageErrorMessage } from "../../../../presentation/shared/constants/messages/packageMessages";
import { BadRequestException, NOtFoundException } from "../../../constants/exceptions";
import { IPackageRespository } from "../../../interfaces/repository/gymAdmin/packageRepoInterface";
import { IBlockPackageUseCase } from "../../../interfaces/useCase/gymAdmin/packageManagement/blockPackageUseCaseInterface";

export class BlockPackageUseCase implements IBlockPackageUseCase {
  constructor(private _packageRepository: IPackageRespository) {}

  async execute(id: string): Promise<void> {
    try {
      const pkg = await this._packageRepository.findById(id);
      if (!pkg) {
        throw new NOtFoundException(PackageErrorMessage.NOT_FOUND);
      }
      if (!pkg.isActive) {
        throw new BadRequestException(PackageErrorMessage.ALREADY_BLOCKED);
      }
      await this._packageRepository.update({ isActive: false }, id);
    } catch (error) {
      throw error
    }
  }
}
