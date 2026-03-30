import Stripe from "stripe";
import { IStripeService } from "../../application/interfaces/service/stripeServiceInterface";
import { stripe } from "./stripeClient";

export class StripeService implements IStripeService {
  constructor(private _stripe: Stripe) {}

  async createRefund(data: {
    paymentIntentId: string;
    amount: number;
  }): Promise<{
    id: string;
    amount: number;
    status: string | null;
  }> {
    const refund = await this._stripe.refunds.create({
      payment_intent: data.paymentIntentId,
      ...(data.amount ? { amount: data.amount } : {}),
    });

    return {
      id: refund.id,
      amount: refund.amount,
      status: refund.status,
    };
  }
  async createCheckoutSession(data: {
    amount: number;
    sessionDate: string;
    userId: string;
    trainerId: string;
    slotId: string;
    startTime: string;
    endTime: string;
    branchId: string;
    gymId: string;
    role: string;
    successUrl: string;
    cancelUrl: string;
  }): Promise<{ url: string }> {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Personal Training Session",
              description: `Session Date: ${data.sessionDate}`,
            },
            unit_amount: Math.round(data.amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "session_booking",
        userId: data.userId,
        trainerId: data.trainerId,
        slotId: data.slotId,
        sessionDate: data.sessionDate,
        startTime: data.startTime,
        endTime: data.endTime,
        amount: String(data.amount),
        branchId: data.branchId,
        gymId: data.gymId,
        role: data.role,
      },
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
    });

    return {
      url: session.url!,
    };
  }
}
