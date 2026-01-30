import { IReApplyDTO } from "../../../dtos/auth/gymAdminSignupDto";

export interface IReApplyUseCase{
    execute(data:IReApplyDTO):Promise<void>;
}