import { GymAdminAuthError } from "../../../../presentation/shared/constants/errorMessage/gymAdminAuthError";
import { UpdateFailedException } from "../../../constants/exceptions";
import { IGymAdminRepository } from "../../../interfaces/repository/gymAdmin/gymAdminRepoInterface";
import { IUnBlockGymUseCase } from "../../../interfaces/useCase/superAdmin/gymMangement/unBlockGymUseCaseInterface";

export class UnBlockGymUseCase implements IUnBlockGymUseCase{
    constructor(private _gymAdminRepository:IGymAdminRepository){}
    async unBlockGym(id: string): Promise<void> {
        const result = await this._gymAdminRepository.unBlockById(id);
        if(!result){
            throw new UpdateFailedException(GymAdminAuthError.UPDATE_STATUS_FAILD);
        }
    }
}