import Stripe from "stripe";
import { ForbiddenException } from "../../constants/exceptions";
import { IProcessStripeWebhookUseCase } from "../../interfaces/useCase/gymAdmin/processStripeWebhookUseCaseInterface";
import { IMemberProcessStripeWebhookUseCase } from "../../interfaces/useCase/member/packageAndPurchaseManagement/processStripeWebhookUseCaseInterface";
import { IStripeWebhookRouterUseCase } from "../../interfaces/useCase/shared/stripeWebhookRouterUseCaseInterface";
import { Roles } from "../../../domain/enums/roles";
import { IMemberProcessSessionStripeWebhookUseCase } from "../../interfaces/useCase/member/slotAndBookingManagement/memberProcessSessionStripeWebhookUseCaseInterface";
import { StripeError } from "../../../presentation/shared/constants/messages/stripeMessages";
import { IProcessTrainerSalaryStripeWebhookUseCase } from "../../interfaces/useCase/gymAdmin/salaryManagement/processTrainerSalaryStripeWebhookUseCaseInterface";

export class StripeWebhookRouterUseCase implements IStripeWebhookRouterUseCase {
  constructor(
    private _gymAdminWebhookUC: IProcessStripeWebhookUseCase,
    private _memberWebhookUC: IMemberProcessStripeWebhookUseCase,
    private _memberSessionWebhookUC: IMemberProcessSessionStripeWebhookUseCase,
    private _trainerSalaryWebhookUC: IProcessTrainerSalaryStripeWebhookUseCase,
  ) {}

  async execute(event: Stripe.Event): Promise<void> {
    if (
      event.type === "payment_intent.succeeded" ||
      event.type === "payment_intent.payment_failed"
    ) {
      await this._trainerSalaryWebhookUC.execute(event);
      return;
    }

    if (event.type !== "checkout.session.completed") return;

    const session = event.data.object as Stripe.Checkout.Session;
    const role = session.metadata?.role;
    const type = session.metadata?.type;

    if (!role) {
      throw new ForbiddenException(StripeError.METADATA_MISSING);
    }

    if (role === Roles.GYMADMIN) {
      await this._gymAdminWebhookUC.execute(event);
      return;
    }

    if (role === Roles.MEMBER && type === "session_booking") {
      await this._memberSessionWebhookUC.execute(event);
      return;
    }

    if (role === Roles.MEMBER) {
      await this._memberWebhookUC.execute(event);
      return;
    }
  }
}
