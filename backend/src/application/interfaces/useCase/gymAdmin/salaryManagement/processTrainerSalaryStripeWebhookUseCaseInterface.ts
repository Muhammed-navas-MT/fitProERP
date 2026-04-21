import Stripe from "stripe";

export interface IProcessTrainerSalaryStripeWebhookUseCase {
  execute(event: Stripe.Event): Promise<void>;
}
