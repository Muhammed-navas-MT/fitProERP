export interface IStripeService {
  createRefund(data: { paymentIntentId: string; amount?: number }): Promise<{
    id: string;
    amount: number;
    status: string | null;
  }>;

  createCheckoutSession(data: {
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
  }): Promise<{ url: string }>;

  createOrGetCustomer(data: { email: string; name: string }): Promise<{
    customerId: string;
  }>;

  attachPaymentMethodToCustomer(data: {
    customerId: string;
    paymentMethodId: string;
  }): Promise<{
    paymentMethodId: string;
    paymentMethodType?: string;
    paymentMethodBrand?: string;
    paymentMethodLast4?: string;
  }>;

  createConnectedAccount(data: { email: string; name: string }): Promise<{
    accountId: string;
  }>;

  createConnectedAccountOnboardingLink(accountId: string): Promise<{
    url: string;
  }>;

  createSalaryPaymentIntent(data: {
    customerId: string;
    paymentMethodId: string;
    amount: number;
    currency: string;
    metadata: Record<string, string>;
  }): Promise<{
    paymentIntentId: string;
    status: string;
    receiptUrl?: string;
  }>;

  createTransferToConnectedAccount(data: {
    amount: number;
    currency: string;
    destinationAccountId: string;
    metadata: Record<string, string>;
  }): Promise<{
    transferId: string;
  }>;

  createPayoutForConnectedAccount(data: {
    connectedAccountId: string;
    amount: number;
    currency: string;
    metadata: Record<string, string>;
  }): Promise<{
    payoutId: string;
    status: string;
  }>;

  createSetupIntent(data: {
    customerId: string;
    paymentMethodTypes?: string[];
  }): Promise<{
    setupIntentId: string;
    clientSecret: string;
    status: string;
  }>;
  retrievePaymentMethod(paymentMethodId: string): Promise<{
    paymentMethodId: string;
    paymentMethodType?: string;
    paymentMethodBrand?: string;
    paymentMethodLast4?: string;
  }>;
}
