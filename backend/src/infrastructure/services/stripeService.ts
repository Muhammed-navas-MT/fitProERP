import Stripe from "stripe";
import { IStripeService } from "../../application/interfaces/service/stripeServiceInterface";
import { stripe } from "./stripeClient";

export class StripeService implements IStripeService {
  constructor(private _stripe: Stripe) {}

  async createRefund(data: {
    paymentIntentId: string;
    amount?: number;
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
  async createOrGetCustomer(data: {
    email: string;
    name: string;
  }): Promise<{ customerId: string }> {
    const customers = await this._stripe.customers.list({
      email: data.email,
      limit: 1,
    });

    if (customers.data.length > 0) {
      return { customerId: customers.data[0].id };
    }

    const customer = await this._stripe.customers.create({
      email: data.email,
      name: data.name,
    });

    return { customerId: customer.id };
  }

  async attachPaymentMethodToCustomer(data: {
    customerId: string;
    paymentMethodId: string;
  }): Promise<{
    paymentMethodId: string;
    paymentMethodType?: string;
    paymentMethodBrand?: string;
    paymentMethodLast4?: string;
  }> {
    const paymentMethod = await this._stripe.paymentMethods.attach(
      data.paymentMethodId,
      {
        customer: data.customerId,
      },
    );

    await this._stripe.customers.update(data.customerId, {
      invoice_settings: {
        default_payment_method: data.paymentMethodId,
      },
    });

    return {
      paymentMethodId: paymentMethod.id,
      paymentMethodType: paymentMethod.type,
      paymentMethodBrand:
        paymentMethod.type === "card" ? paymentMethod.card?.brand : undefined,
      paymentMethodLast4:
        paymentMethod.type === "card" ? paymentMethod.card?.last4 : undefined,
    };
  }

  async createConnectedAccount(data: {
    email: string;
    name: string;
  }): Promise<{ accountId: string }> {
    try {
      const account = await this._stripe.accounts.create({
        type: "express",
        email: data.email,
        country: "US",
        capabilities: {
          transfers: { requested: true },
        },
      });

      return { accountId: account.id };
    } catch (error) {
      console.error("Stripe createConnectedAccount error:", error);
      throw error;
    }
  }

  async createConnectedAccountOnboardingLink(data: {
    accountId: string;
    refreshUrl: string;
    returnUrl: string;
  }): Promise<{ url: string }> {
    const accountLink = await this._stripe.accountLinks.create({
      account: data.accountId,
      refresh_url: data.refreshUrl,
      return_url: data.returnUrl,
      type: "account_onboarding",
    });

    return { url: accountLink.url };
  }

  async createSalaryPaymentIntent(data: {
    customerId: string;
    paymentMethodId: string;
    amount: number;
    currency: string;
    metadata: Record<string, string>;
  }): Promise<{
    paymentIntentId: string;
    status: string;
    clientSecret?: string | null;
    receiptUrl?: string;
  }> {
    const paymentIntent = await this._stripe.paymentIntents.create({
      amount: Math.round(data.amount * 100),
      currency: data.currency,
      customer: data.customerId,
      payment_method: data.paymentMethodId,
      confirm: true,
      off_session: true,
      metadata: data.metadata,
    });

    let receiptUrl: string | undefined;

    if (typeof paymentIntent.latest_charge === "string") {
      const charge = await this._stripe.charges.retrieve(
        paymentIntent.latest_charge,
      );
      receiptUrl = charge.receipt_url ?? undefined;
    }

    return {
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      clientSecret: paymentIntent.client_secret ?? null,
      receiptUrl,
    };
  }

  async createTransferToConnectedAccount(data: {
    amount: number;
    currency: string;
    destinationAccountId: string;
    metadata: Record<string, string>;
    transferGroup?: string;
    sourceTransaction?: string;
  }): Promise<{ transferId: string }> {
    const transfer = await this._stripe.transfers.create({
      amount: Math.round(data.amount * 100),
      currency: data.currency,
      destination: data.destinationAccountId,
      metadata: data.metadata,
      transfer_group: data.transferGroup,
      ...(data.sourceTransaction
        ? { source_transaction: data.sourceTransaction }
        : {}),
    });

    return {
      transferId: transfer.id,
    };
  }

  async createPayoutForConnectedAccount(data: {
    connectedAccountId: string;
    amount: number;
    currency: string;
    metadata: Record<string, string>;
  }): Promise<{ payoutId: string; status: string }> {
    const payout = await this._stripe.payouts.create(
      {
        amount: Math.round(data.amount * 100),
        currency: data.currency,
        metadata: data.metadata,
      },
      {
        stripeAccount: data.connectedAccountId,
      },
    );

    return {
      payoutId: payout.id,
      status: payout.status,
    };
  }
  async createSetupIntent(data: {
    customerId: string;
    paymentMethodTypes?: string[];
  }): Promise<{
    setupIntentId: string;
    clientSecret: string;
    status: string;
  }> {
    const setupIntent = await this._stripe.setupIntents.create({
      customer: data.customerId,
      payment_method_types: data.paymentMethodTypes ?? ["card"],
      usage: "off_session",
    });

    return {
      setupIntentId: setupIntent.id,
      clientSecret: setupIntent.client_secret!,
      status: setupIntent.status,
    };
  }
  async retrievePaymentMethod(paymentMethodId: string): Promise<{
    paymentMethodId: string;
    paymentMethodType?: string;
    paymentMethodBrand?: string;
    paymentMethodLast4?: string;
  }> {
    try {
      const paymentMethod =
        await this._stripe.paymentMethods.retrieve(paymentMethodId);

      if (typeof paymentMethod === "string") {
        throw new Error("Invalid payment method response");
      }

      const type = paymentMethod.type;

      let brand: string | undefined;
      let last4: string | undefined;

      if (type === "card" && paymentMethod.card) {
        brand =
          paymentMethod.card.display_brand ||
          paymentMethod.card.brand ||
          "card";
        last4 = paymentMethod.card.last4;
      }

      return {
        paymentMethodId: paymentMethod.id,
        paymentMethodType: type,
        paymentMethodBrand: brand,
        paymentMethodLast4: last4,
      };
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to retrieve payment method";

      throw new Error(`Stripe retrievePaymentMethod error: ${message}`);
    }
  }
  async retrieveConnectedAccount(accountId: string): Promise<{
    accountId: string;
    payoutsEnabled: boolean;
    chargesEnabled: boolean;
    requirementsCurrentlyDueCount: number;
    bankName?: string;
    bankLast4?: string;
  }> {
    const account = await this._stripe.accounts.retrieve(accountId);

    if (typeof account === "string") {
      throw new Error("Invalid connected account response");
    }

    let bankName: string | undefined;
    let bankLast4: string | undefined;

    const externalAccounts = account.external_accounts?.data ?? [];
    const bankAccount = externalAccounts.find(
      (item) => item.object === "bank_account",
    );

    if (bankAccount && "bank_name" in bankAccount) {
      bankName = bankAccount.bank_name ?? undefined;
      bankLast4 = bankAccount.last4 ?? undefined;
    }

    return {
      accountId: account.id,
      payoutsEnabled: account.payouts_enabled ?? false,
      chargesEnabled: account.charges_enabled ?? false,
      requirementsCurrentlyDueCount:
        account.requirements?.currently_due?.length ?? 0,
      bankName,
      bankLast4,
    };
  }
}
