import { Durations } from "../../../domain/enums/duration";

export type IListActiveSubscriptionResponseDTO = Array<{
  id?: string;
  planName?: string;
  price?: number;
  duration?: Durations;
  features?: string[];
  limits?: {
    maxMembers?: number,
    maxTrainers?: number,
    maxBranches?: number,
  },
  isActive?: boolean;
}>;
