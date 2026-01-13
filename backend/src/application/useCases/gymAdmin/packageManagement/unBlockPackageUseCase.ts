import { PackageErrorMessage } from "../../../../presentation/shared/constants/messages/packageMessages";
import { NOtFoundException } from "../../../constants/exceptions";
import { IPackageRespository } from "../../../interfaces/repository/gymAdmin/packageRepoInterface";
import { IUnBlockPackageUseCase } from "../../../interfaces/useCase/gymAdmin/packageManagement/unBlockPackageUseCaseInterface";

export class UnBlockPackageUseCase implements IUnBlockPackageUseCase {
  constructor(private _packageRepository: IPackageRespository) {}

  async execute(id: string): Promise<void> {
    try {
      const pkg = await this._packageRepository.findById(id);
      if (!pkg) {
        throw new NOtFoundException(PackageErrorMessage.NOT_FOUND);
      }
      if (pkg.isActive) {
        throw new Error("Package is already active");
      }
      await this._packageRepository.update({ isActive: true }, id);
    } catch (error) {
      throw error
    }
  }
}
