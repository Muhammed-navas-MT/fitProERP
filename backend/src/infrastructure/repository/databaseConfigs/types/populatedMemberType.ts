import { Types } from "mongoose";
import { Status } from "../../../../domain/enums/status";

export interface IPopulatedBranch {
  _id: Types.ObjectId;
  branchName: string;
}

export interface IPopulatedMember {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  profileImg?: string;
  avatar?: string;
  status: Status;
  branchId?: IPopulatedBranch | null;
  createdAt: Date;
}
