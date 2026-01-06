import { Durations } from "../../enums/duration";
export interface SubscriptionEntity  {
  _id?: string;
  planName: string;
  price: number;
  duration: Durations;
  features: string[];
  limits: {
    maxMembers: number,
    maxTrainers: number,
    maxBranches: number,
  },
  isActive:boolean;
  createdAt?: Date;
}
