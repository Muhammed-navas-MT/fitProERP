import { BaseRepository } from "../base/baseRepo";
import { IMemberRepository } from "../../../application/interfaces/repository/member/addMemberRepoInterface";
import { IMemberModel } from "../databaseConfigs/models/memberModel";
import { Model } from "mongoose";
import { MemberEntity } from "../../../domain/entities/member/memberEntity";

export class MemberRepository extends BaseRepository<IMemberModel> implements IMemberRepository {
    constructor(model:Model<IMemberModel>){
        super(model);
    }
   async findByEmail(email: string): Promise<MemberEntity | null> {
       try {
        const findMember = await this._model.findOne({email});
        if(!findMember)return null
        return findMember
       } catch (error) {
        throw error;
       }
   }
}