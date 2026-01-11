import { PackageErrorMessage } from "../../../../presentation/shared/constants/messages/packageMessages";
import { AlreadyExistException } from "../../../constants/exceptions";
import { ICreatePackageRequestDTO } from "../../../dtos/gymAdminDto/packageDto"
import { IPackageRespository } from "../../../interfaces/repository/gymAdmin/packageRepoInterface"
import { ICreatePackageUseCase } from "../../../interfaces/useCase/gymAdmin/packageManagement/createPackageUseCaseInterface"

export class CreatePackageUseCase implements ICreatePackageUseCase {
  constructor(
    private _packageRepository: IPackageRespository
  ) {}

  async execute(data: ICreatePackageRequestDTO, gymId: string): Promise<void> {
      try {
        const findPackage = await this._packageRepository.findByNameAndBranch(data.name,data.branchId);
        if(findPackage){
            throw new AlreadyExistException(PackageErrorMessage.ALREADY_ACTIVE)
        };
        await this._packageRepository.create({...data,gymId:gymId,isActive:true})
      } catch (error) {
        throw error
      }
  }

}
