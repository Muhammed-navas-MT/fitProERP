import { PackageErrorMessage } from "../../../../presentation/shared/constants/messages/packageMessages"
import { NOtFoundException } from "../../../constants/exceptions"
import { IViewPackageResponseDTO } from "../../../dtos/gymAdminDto/packageDto"
import { IPackageRespository } from "../../../interfaces/repository/gymAdmin/packageRepoInterface"
import { IViewPackageUseCase } from "../../../interfaces/useCase/gymAdmin/packageManagement/viewPackageUseCaseInterface"
import { PackageMapper } from "../../../mappers/gymAdmin/packageMapper"

export class ViewPackageUseCase implements IViewPackageUseCase {
  constructor(
    private _packageRepository: IPackageRespository
  ) {}

  async execute(id: string): Promise<IViewPackageResponseDTO | null>{
    const pkg = await this._packageRepository.findById(id)
    if (!pkg) {
      throw new NOtFoundException(PackageErrorMessage.NOT_FOUND);
    };
    return PackageMapper.toViewPackageResponse(pkg);
  }
}