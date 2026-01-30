import { IAddMemberDTO } from "../../../../dtos/auth/memberDto";
import { Member } from "../../../../dtos/memberDto/listAllMembersDto";

export interface ICreateMemberUseCase{
    createMember(data:IAddMemberDTO):Promise<Member>;
}