import { Durations } from "../../../domain/enums/duration";

export interface ISubscriptionRequestDTO {
  planName: string;
  price: number;
  duration: Durations;
  features: string[];
  limits: {
    maxMembers: number;
    maxTrainers: number;
    maxBranches: number;
  };
  isActive: boolean;
}

export interface ISubscriptionResponseDTO {
  id: string;
  planName: string;
  price: number;
  duration: Durations;
  features: string[];
  limits: {
    maxMembers: number,
    maxTrainers: number,
    maxBranches: number,
  },
  isActive: boolean;
}

export interface IListSubscriptionRequestDTO {
  search: string;
  page: number;
  limit: number;
}

export interface IListSubscriptionResponseDTO {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  search: string;
  data: Array<{
    id?: string;
    planName?: string;
    price?: number;
    duration?: Durations;
    features?: string[];
    limits?: {
      maxMembers?: number;
      maxTrainers?: number;
      maxBranches?: number;
    };
    isActive?: boolean;
  }>;
}
