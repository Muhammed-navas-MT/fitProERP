import Stripe from "stripe";
import { ForbiddenException } from "../../constants/exceptions";
import { IProcessStripeWebhookUseCase } from "../../interfaces/useCase/gymAdmin/processStripeWebhookUseCaseInterface";
import { IMemberProcessStripeWebhookUseCase } from "../../interfaces/useCase/member/packageAndPurchaseManagement/processStripeWebhookUseCaseInterface";
import { IStripeWebhookRouterUseCase } from "../../interfaces/useCase/shared/stripeWebhookRouterUseCaseInterface";
import { Roles } from "../../../domain/enums/roles";

export class StripeWebhookRouterUseCase
  implements IStripeWebhookRouterUseCase {

  constructor(
    private _gymAdminWebhookUC: IProcessStripeWebhookUseCase,
    private _memberWebhookUC: IMemberProcessStripeWebhookUseCase,
  ) {}

  async execute(event: Stripe.Event): Promise<void> {
    console.log("aldksfjlakdjsfaskjdfakjdsf")
    console.log(event.type,"in webhook envet type")
    if (event.type !== "checkout.session.completed") return;
    console.log("aldkfjksadjf")

    const session = event.data.object as Stripe.Checkout.Session;
    const role = session.metadata?.role;
    console.log(role,"asdlkfasdjkfklsjdf")

    if (!role) {
      throw new ForbiddenException("Stripe metadata role missing");
    }

    if (role === Roles.GYMADMIN) {
      await this._gymAdminWebhookUC.execute(event);
      return;
    }

    if (role === Roles.MEMBER) {
      await this._memberWebhookUC.execute(event);
      return;
    }
  }
}
