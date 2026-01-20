import Stripe from "stripe";

export interface IStripeWebhookRouterUseCase {
  execute(event: Stripe.Event): Promise<void>;
}
