import { IAddMemberDTO } from "../../../dtos/auth/memberDto";

export interface IAddMemberUseCase{
    signUp(data:IAddMemberDTO):Promise<void>;
}