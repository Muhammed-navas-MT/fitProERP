import { Durations } from "../../../domain/enums/duration";
import { Status } from "../../../domain/enums/status";

export interface IGymListItemDTO {
  id: string;
  gymName: string;
  ownerName:string;
  email:string;
  phone:string;
  plan:string;
  branchesCount: number;
  trainersCount: number;
  status: Status;
  createdAt: Date;
}

export interface IListGymsResponseDTO {
  gyms: IGymListItemDTO[];
  totalGyms: number;
  currentPage: number;
  totalPages: number;
}

export interface IListGymsRequestDTO {
  search: string;
  page: number;
  limit: number;
}

export interface IGymAdminDetailDTO {
  id: string
  name: string
  status:string
  businessLicense: string
  insuranceCertificate: string
  totalMembers: number
  totalBranches: number
  totalTrainers: number
  owner: OwnerDTO
  subscription: SubscriptionDTO|null
}

export interface OwnerDTO {
  name: string
  email: string
  phone: string
}

export interface SubscriptionDTO {
  currentPlan: string
  price: number
  memberSince: string
  limits:{
    maxBranches:number
    maxMembers:number;
    maxTrainers:number
  }
  duration:Durations
}


