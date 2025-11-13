import { Durations } from "../../enums/duration";
export interface SubscriptionEntity  {
  _id?: string;
  planName: string;
  price: number;
  duration: Durations;
  features: string[];
  isActive:boolean;
  createdAt?: Date;
}
