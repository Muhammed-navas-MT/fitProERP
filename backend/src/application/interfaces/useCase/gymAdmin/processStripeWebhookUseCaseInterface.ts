import Stripe from "stripe";

export interface IProcessStripeWebhookUseCase {
  execute(event: Stripe.Event): Promise<void>;
}