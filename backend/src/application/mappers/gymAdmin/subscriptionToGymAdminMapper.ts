import { Durations } from "../../../domain/enums/duration";
import { PaymentStatus } from "../../../domain/enums/paymentStatus";

export const mapSubscriptionToGymAdminUpdate = (
  packageId: string,
  duration: Durations
) => {
  const packageStart = new Date();
  let packageEnd = new Date(packageStart);

  switch (duration) {
    case Durations.ONE_MONTH:
      packageEnd.setMonth(packageEnd.getMonth() + 1);
      break;

    case Durations.TREE_MONTHS:
      packageEnd.setMonth(packageEnd.getMonth() + 3);
      break;

    case Durations.ONE_YEAR:
      packageEnd.setFullYear(packageEnd.getFullYear() + 1);
      break;
  }

  return {
    packageId,
    paymentStatus: PaymentStatus.PAID,
    packageStart,
    packageEnd,
  };
};
