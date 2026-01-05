import { MemberDTO } from "../../../../dtos/memberDto/listAllMembersDto";

export interface IFindMemberUseCase {
    findMember(memberId:string):Promise<MemberDTO>
}