import Stripe from "stripe";
import { RevenueSourceType } from "../../../domain/enums/gymRevenueSourceType";
import { PaymentMethod } from "../../../domain/enums/paymentMethod";
import { PaymentStatus } from "../../../domain/enums/paymentStatus";
import { IGymAdminRevenueEntity } from "../../../domain/entities/gymAdmin/revenueEntity";

export class BookingMapper {
  static toEntityFromSession(params: {
    gymId: string;
    branchId: string;
    userId: string;
    createdSessionId: string;
    stripeSession: Stripe.Checkout.Session;
    amount: number;
  }): IGymAdminRevenueEntity {
    const { gymId, branchId, userId, createdSessionId, stripeSession, amount } =
      params;

    return {
      gymId,
      branchId,
      userId,
      sourceType: RevenueSourceType.BOOK,
      sourceId: createdSessionId,
      source: "Personal Training Session Booking",
      stripeSessionId: stripeSession.id,
      paymentIntentId: stripeSession.payment_intent as string,
      amount,
      currency: stripeSession.currency ?? "inr",
      paymentMethod: PaymentMethod.ONLINE,
      status: PaymentStatus.PAID,
    };
  }
}
