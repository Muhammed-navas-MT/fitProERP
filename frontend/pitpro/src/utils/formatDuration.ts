import { Durations } from "@/types/durationType";

export const formatDuration = (duration?: Durations): string => {
  if (!duration) return "";

  switch (duration) {
    case Durations.ONE_MONTH:
      return "Monthly";
    case Durations.TREE_MONTHS:
      return "Quarterly";
    case Durations.ONE_YEAR:
      return "Yearly";
    default:
      return "";
  }
};
