import { ISignupRequsetDTO } from "../../../dtos/auth/gymAdminSignupDto";

export interface ISingupUseCase{
    signUp(data:ISignupRequsetDTO):Promise<void>;
}