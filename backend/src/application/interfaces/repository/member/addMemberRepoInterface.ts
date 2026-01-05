import { IBaseRepository } from "../base/baseRepo"
import { MemberEntity } from "../../../../domain/entities/member/memberEntity"
import { IListMemberInGymRequestDTO, IListMemberRequestDTO } from "../../../dtos/memberDto/listAllMembersDto"
import { IPopulatedMember } from "../../../../infrastructure/repository/databaseConfigs/types/populatedMemberType"

export interface IMemberRepository extends IBaseRepository<MemberEntity> {
    findByEmail(email:string):Promise<MemberEntity|null>
    listAllMembers(params:IListMemberRequestDTO,gymId:string):Promise<{members:IPopulatedMember[],total:number}>
    countMembersByGymId(gymId: string): Promise<number>;
    countByBranchId(gymId: string): Promise<number>;
    findByTrainerId(trainerId:string):Promise<MemberEntity[]>;
    findMembersByTrainer(trainerId: string): Promise<{ id: string }[]>;
    reassignMembers(assignments: { memberId: string; trainerId: string }[]): Promise<void>;
    listAllMembersByGymId(params:IListMemberInGymRequestDTO):Promise<{members:IPopulatedMember[],total:number}>
}