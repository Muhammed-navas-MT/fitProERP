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
}
