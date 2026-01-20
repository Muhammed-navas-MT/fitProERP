import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { stripe } from "../../../infrastructure/services/stripeClient";
import { ResponseHelper } from "../../shared/utils/responseHelper";
import { HTTP_STATUS_CODE } from "../../shared/constants/statusCode/statusCode";
import { IStripeWebhookRouterUseCase } from "../../../application/interfaces/useCase/shared/stripeWebhookRouterUseCaseInterface";

export class StripeWebhookController {
  constructor(
    private _stripeWebhookRouteUseCase: IStripeWebhookRouterUseCase,
  ) {}

  public handle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      return next(err);
    }

    try {
      await this._stripeWebhookRouteUseCase.execute(event);
      return ResponseHelper.success(
        HTTP_STATUS_CODE.OK,
        res,
        "Webhook received successfully",
        { received: true }
      );
    } catch (err) {
      return next(err);
    }
  };
}
