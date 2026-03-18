import Stripe from "stripe";

export interface IMemberProcessSessionStripeWebhookUseCase {
  execute(event: Stripe.Event): Promise<void>;
}
