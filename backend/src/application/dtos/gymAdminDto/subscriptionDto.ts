import { Durations } from "../../../domain/enums/duration";

export type IListActiveSubscriptionResponseDTO = Array<{
  id?: string;
  planName?: string;
  price?: number;
  duration?: Durations;
  features?: string[];
  isActive?: boolean;
}>;
