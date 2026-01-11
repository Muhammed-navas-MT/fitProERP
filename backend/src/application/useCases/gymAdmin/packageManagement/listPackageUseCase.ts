import { IListPackageRequestDTO, IListPackageResponseDTO} from "../../../dtos/gymAdminDto/packageDto"
import { IPackageRespository } from "../../../interfaces/repository/gymAdmin/packageRepoInterface"
import { IListPackageUseCase } from "../../../interfaces/useCase/gymAdmin/packageManagement/listPackageUseCaseInterface"
import { PackageMapper } from "../../../mappers/gymAdmin/packageMapper"

export class ListPackageUseCase implements IListPackageUseCase {
  constructor(
    private readonly _packageRepository: IPackageRespository
  ) {}

  async execute( params: IListPackageRequestDTO, gymId: string ): Promise<IListPackageResponseDTO | null> {

    const { packages, total } = await this._packageRepository.listAllPackage(params, gymId)
    return PackageMapper.toListPackageResponse(packages,total,params)
  }
}
