import { IBaseRepository } from "../base/baseRepo"
import { MemberEntity } from "../../../../domain/entities/member/memberEntity"

export interface IMemberRepository extends IBaseRepository<MemberEntity> {
    findByEmail(email:string):Promise<MemberEntity|null>
    listAllMembers(params:IListMemberRequestDTO,gymId:string):Promise<{members:MemberEntity[],total:number}>
    countMembersByGymId(gymId: string): Promise<number>;
    countByBranchId(branchId: string): Promise<number>;
}