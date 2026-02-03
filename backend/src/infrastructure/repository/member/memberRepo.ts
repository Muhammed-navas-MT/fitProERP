import { BaseRepository } from "../base/baseRepo";
import { IMemberRepository } from "../../../application/interfaces/repository/member/addMemberRepoInterface";
import { IMemberModel } from "../databaseConfigs/models/memberModel";
import { Model, Types } from "mongoose";
import { MemberEntity } from "../../../domain/entities/member/memberEntity";
import { IListMemberInGymRequestDTO, IListMemberRequestDTO } from "../../../application/dtos/memberDto/listAllMembersDto";
import { IPopulatedBranch, IPopulatedMember } from "../databaseConfigs/types/populatedMemberType";
import { Status } from "../../../domain/enums/status";

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
): Promise<{ members: IPopulatedMember[]; total: number }> {
  const skip = (params.page - 1) * params.limit;
  const search = params.search?.trim();

  const filter = search
    ? { gymId, name: { $regex: search, $options: "i" } }
    : { gymId };

  const members = await this._model
    .find(filter)
    .populate<{ branchId: IPopulatedBranch }>({
      path: "branchId",
      select: "branchName",
    })
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 })
    .lean<IPopulatedMember[]>();

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

async listAllMembersByGymId(
  params: IListMemberInGymRequestDTO
): Promise<{ members: IPopulatedMember[]; total: number }> {
  const skip = (params.page - 1) * params.limit;
  const search = params.search?.trim();

  const filter = search
    ? { gymId: params.gymId, name: { $regex: search, $options: "i" } }
    : { gymId: params.gymId };

  const members = await this._model
    .find(filter)
    .populate<{
      branchId: {
        _id: Types.ObjectId;
        branchName: string;
      };
    }>({
      path: "branchId",
      select: "branchName",
    })
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 })
    .lean<IPopulatedMember[]>();

  const total = await this._model.countDocuments(filter);

  return { members, total };
}

async listAllMembersByBranchId(params: IListMemberRequestDTO, branchId: string,trainerId: string): Promise<{ members: IPopulatedMember[]; total: number; assignMemberCount: number; activeMembersCount: number; }> {
  const skip = (params.page - 1) * params.limit;
  const search = params.search?.trim();

  const filter = search
    ? { branchId, name: { $regex: search, $options: "i" } }
    : { branchId };

  const members = await this._model
    .find(filter)
    .populate<{ branchId: IPopulatedBranch }>({
      path: "branchId",
      select: "branchName",
    })
    .skip(skip)
    .limit(params.limit)
    .sort({ createdAt: -1 })
    .lean<IPopulatedMember[]>();

  const total = await this._model.countDocuments(filter);
  const activeMembersCount = await this._model.countDocuments({branchId,status:Status.ACTIVE,trainerId});
  const assignMemberCount = await this._model.countDocuments({trainerId,branchId});

  return { members, total,assignMemberCount,activeMembersCount };
}

}
