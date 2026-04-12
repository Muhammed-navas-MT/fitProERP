import { FormEvent, useState } from "react";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  useCreateBillingSetupIntent,
  useSaveBillingPaymentMethod,
} from "@/hook/gymAdmin/salaryHook";

interface BillingCardFormProps {
  billingEmail: string;
  onSuccess?: () => void;
}

export default function BillingCardForm({
  billingEmail,
  onSuccess,
}: BillingCardFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync: createBillingSetupIntent } =
    useCreateBillingSetupIntent();

  const { mutateAsync: saveBillingPaymentMethod } =
    useSaveBillingPaymentMethod();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!billingEmail.trim()) {
      toast.error("Billing email is required");
      return;
    }

    if (!stripe || !elements) {
      toast.error("Stripe is not ready yet");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      toast.error("Card input not found");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await createBillingSetupIntent();
      const clientSecret = response?.data?.clientSecret;

      if (!clientSecret) {
        throw new Error("Client secret not received");
      }

      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: billingEmail,
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message || "Failed to confirm card");
      }

      if (!result.setupIntent) {
        throw new Error("Setup intent not returned");
      }

      const paymentMethodId = result.setupIntent.payment_method;

      if (!paymentMethodId || typeof paymentMethodId !== "string") {
        throw new Error("Payment method ID not found");
      }

      const saveResponse = await saveBillingPaymentMethod({
        paymentMethodId,
        billingEmail,
      });

      toast.success(
        saveResponse?.message || "Payment method added successfully",
      );

      onSuccess?.();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to add payment method";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: "16px",
                color: "#ffffff",
                "::placeholder": {
                  color: "#a1a1aa",
                },
              },
              invalid: {
                color: "#ef4444",
              },
            },
          }}
        />
      </div>

      <Button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Saving..." : "Save Card"}
      </Button>
    </form>
  );
}
