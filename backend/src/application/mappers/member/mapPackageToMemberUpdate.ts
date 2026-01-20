import { PaymentStatus } from "../../../domain/enums/paymentStatus";

export const mapPackageToMemberUpdate = (
  planId: string,
  price: number,
  durationInDays: number
) => {
  const startDate = new Date();
  const endDate = new Date(startDate);

  endDate.setDate(endDate.getDate() + durationInDays);

  return {
    package: {
      planId,
      startDate,
      endDate,
      price,
      status: PaymentStatus.PAID,
    },
  };
};
