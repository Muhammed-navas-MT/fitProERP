import { Durations } from "@/types/durationType";

export const formatDuration = (duration?: Durations): string => {
  if (!duration) return "";

  switch (duration) {
    case Durations.ONE_MONTH:
      return "/monthly";
    case Durations.TREE_MONTHS:
      return "/quarterly";
    case Durations.ONE_YEAR:
      return "/yearly";
    default:
      return "";
  }
};
