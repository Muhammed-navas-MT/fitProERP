import { UpdateMemberDTO } from "../../../../dtos/auth/memberDto";

export interface IUpdateMemberUseCase {
    updateMember(memeber:UpdateMemberDTO,memberId:string):Promise<void>
}