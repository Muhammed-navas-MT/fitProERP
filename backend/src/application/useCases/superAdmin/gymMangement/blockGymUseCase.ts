import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { UpdateFailedException } from "../../../constants/exceptions";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IBlockGymUseCase } from "../../../interfaces/useCase/superAdmin/gymMangement/blockGymUseCaseInterface";

export class blockGymUseCase implements IBlockGymUseCase{
    constructor(private _gymAdminRepository:IGymAdminRepository){}
    async blockGym(id: string): Promise<void> {
        const result = await this._gymAdminRepository.blockById(id);
            if (!result) {
              throw new UpdateFailedException(
                GymAdminAuthError.UPDATE_STATUS_FAILD
              );
            }
    }
}