import { IBaseRepository } from "../base/baseRepo"
import { MemberEntity } from "../../../../domain/entities/member/memberEntity"
import { IListMemberRequestDTO } from "../../../dtos/memberDto/listAllMembersDto"

export interface IMemberRepository extends IBaseRepository<MemberEntity> {
    findByEmail(email:string):Promise<MemberEntity|null>
    listAllMembers(params:IListMemberRequestDTO,gymId:string):Promise<{members:MemberEntity[],total:number}>
}