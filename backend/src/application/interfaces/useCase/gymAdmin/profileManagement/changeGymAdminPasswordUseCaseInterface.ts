import { IChangePasswordRequestDTO } from "../../../../dtos/gymAdminDto/gymAdminProfileDtos";

export interface IChangeGymAdminPasswordUseCase {
    execute(data:IChangePasswordRequestDTO):Promise<void>
}