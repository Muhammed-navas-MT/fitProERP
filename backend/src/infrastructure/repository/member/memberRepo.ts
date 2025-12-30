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
   };

   async listAllMembers(params: IListMemberRequestDTO, gymId: string): Promise<{ members: MemberEntity[]; total: number; }> {
        const skip = (params.page-1)* params.limit;
        const search = params.search?.trim();
        const filter = search ? {gymId,name:{$regex:search,$options:"i"}}:{gymId};
        const members = await this._model.find(filter)
        .skip(skip)
        .limit(params.limit)
        .sort({createdAt:-1});
        const total = await this._model.countDocuments(filter);
        return {members,total};
   };

   async countMembersByGymId(gymId: string): Promise<number> {
        return await this._model.countDocuments({gymId})
    };
    
    async countByBranchId(branchId: string): Promise<number> {
    return this._model.countDocuments({
      branchId,
      isActive: true,
    });
  }
}