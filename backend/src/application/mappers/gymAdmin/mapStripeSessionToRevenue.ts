import Stripe from "stripe";
import { IGymAdminRevenueEntity } from "../../../domain/entities/gymAdmin/revenueEntity";
import { RevenueSourceType } from "../../../domain/enums/gymRevenueSourceType";
import { PaymentMethod } from "../../../domain/enums/paymentMethod";
import { PaymentStatus } from "../../../domain/enums/paymentStatus";

interface MapStripeSessionToRevenueParams {
  session: Stripe.Checkout.Session;
  gymId: string;
  branchId: string;
  userId: string;
  planId: string;
}

export const mapStripeSessionToRevenue = ({
  session,
  gymId,
  branchId,
  userId,
  planId,
}: MapStripeSessionToRevenueParams): IGymAdminRevenueEntity => {
  if (!session.amount_total) {
    throw new Error("Stripe session amount is missing");
  }

  return {
    gymId,
    branchId,
    userId,
    sourceType: RevenueSourceType.PLAN,
    sourceId: planId,
    source: "Membership Plan",
    stripeSessionId: session.id,
    paymentIntentId: session.payment_intent as string,
    amount: session.amount_total / 100,
    currency: session.currency ?? "inr",
    paymentMethod: PaymentMethod.ONLINE,
    status: PaymentStatus.PAID,
    createdAt: new Date(),
  };
};
