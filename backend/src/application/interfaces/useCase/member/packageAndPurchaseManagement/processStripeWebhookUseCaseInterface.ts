import Stripe from "stripe";

export interface IMemberProcessStripeWebhookUseCase {
  execute(event: Stripe.Event): Promise<void>;
}