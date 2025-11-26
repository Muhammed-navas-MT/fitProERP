import { IBaseRepository } from "../base/baseRepo"
import { MemberEntity } from "../../../../domain/entities/member/memberEntity"

export interface IMemberRepository extends IBaseRepository<MemberEntity> {
    findByEmail(email:string):Promise<MemberEntity|null>
}