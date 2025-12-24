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

