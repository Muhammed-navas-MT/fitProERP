import { IAddMemberDTO } from "../../../../dtos/auth/memberDto";

export interface ICreateMemberUseCase{
    createMember(data:IAddMemberDTO):Promise<void>;
}