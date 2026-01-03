import { BaseRepository } from "../base/baseRepo";
import { IMemberRepository } from "../../../application/interfaces/repository/member/addMemberRepoInterface";
import { IMemberModel } from "../databaseConfigs/models/memberModel";
import { Model } from "mongoose";
import { MemberEntity } from "../../../domain/entities/member/memberEntity";
import { IListMemberRequestDTO } from "../../../application/dtos/memberDto/listAllMembersDto";

export class MemberRepository
  extends BaseRepository<IMemberModel>
  implements IMemberRepository
{
  constructor(model: Model<IMemberModel>) {
    super(model);
  }

  async findByEmail(email: string): Promise<MemberEntity | null> {
    return this._model.findOne({ email }).lean();
  }

  async listAllMembers(
    params: IListMemberRequestDTO,
    gymId: string
  ): Promise<{ members: MemberEntity[]; total: number }> {
    const skip = (params.page - 1) * params.limit;
    const search = params.search?.trim();

    const filter = search
      ? { gymId, name: { $regex: search, $options: "i" } }
      : { gymId };

    const members = await this._model
      .find(filter)
      .skip(skip)
      .limit(params.limit)
      .sort({ createdAt: -1 })
      .lean();

    const total = await this._model.countDocuments(filter);

    return { members, total };
  }

  async countMembersByGymId(gymId: string): Promise<number> {
    return this._model.countDocuments({ gymId });
  }

  async countByBranchId(branchId: string): Promise<number> {
    return this._model.countDocuments({
      branchId,
      isActive: true,
    });
  }

  async findByTrainerId(trainerId: string): Promise<MemberEntity[]> {
    return this._model.find({ trainerId }).lean();
  }

  async findMembersByTrainer(trainerId: string): Promise<{ id: string }[]> {
    return this._model
      .find({ trainerId })
      .select("_id")
      .lean()
      .then((docs) => docs.map((d: any) => ({ id: d._id.toString() })));
  }

  async reassignMembers(
    assignments: { memberId: string; trainerId: string }[]
  ): Promise<void> {
    const bulkOps = assignments.map((a) => ({
      updateOne: {
        filter: { _id: a.memberId },
        update: { $set: { trainerId: a.trainerId } },
      },
    }));

    if (bulkOps.length > 0) {
      await this._model.bulkWrite(bulkOps);
    }
  }
}
