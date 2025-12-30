import { BranchStatus } from "../../../domain/enums/branchStatus";

export interface IListBranchRequestDTO {
  gymId: string;
  page?: number;
  limit?: number;
  search?: string;
  status?: BranchStatus;
};

export interface IListBranchResponseDTO {
  branches: {
    id: string;
    branchName: string;
    address: string;
    phone: string;
    membersCount: number;
    staffCount: number;
    status:string;
  }[];
  total: number;
}

export interface ISingleBranchResponseDTO {
  id: string;
  branchName: string;
  phone:string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  openTime: string;
  closeTime: string;
  status: BranchStatus;
  createdAt: Date;
  updatedAt?: Date;
};

export interface IFindByNameAndLocationDTO {
  gymId:string,
  branchName:string,
  city:string,
  pincode:string
}

