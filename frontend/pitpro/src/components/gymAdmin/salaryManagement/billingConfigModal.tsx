import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CreditCard, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { stripePromise } from "@/lib/stripe";
import BillingCardForm from "@/components/gymAdmin/salaryManagement/billingCardForm";

interface BillingConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  billingEmail?: string;
  isDefaultPaymentMethodAdded?: boolean;
  paymentMethodBrand?: string;
  paymentMethodLast4?: string;

  isSaving?: boolean;

  onSaveBillingEmail: (email: string) => Promise<void>;
}

export default function BillingConfigModal({
  open,
  onOpenChange,
  billingEmail = "",
  isDefaultPaymentMethodAdded = false,
  paymentMethodBrand,
  paymentMethodLast4,
  isSaving = false,
  onSaveBillingEmail,
}: BillingConfigModalProps) {
  const [email, setEmail] = useState(billingEmail);
  const [savedEmail, setSavedEmail] = useState(billingEmail);

  useEffect(() => {
    setEmail(billingEmail);
    setSavedEmail(billingEmail);
  }, [billingEmail, open]);

  const handleSaveEmail = async () => {
    if (!email.trim()) {
      toast.error("Billing email is required");
      return;
    }

    try {
      await onSaveBillingEmail(email.trim());
      setSavedEmail(email.trim());
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } })
          .response?.data?.message === "string"
          ? (error as { response?: { data?: { message?: string } } }).response!
              .data!.message!
          : error instanceof Error
            ? error.message
            : "Failed to save billing email";

      toast.error(message);
    }
  };

  const canShowCardForm = !!savedEmail.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-zinc-800 bg-[#0a0a0a] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Billing Configuration</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Save billing email first, then add your Stripe payment method.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="rounded-lg border border-zinc-800 bg-black/40 p-4">
            <div className="mb-4 flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-400" />
              <h3 className="text-base font-semibold text-white">
                Billing Email
              </h3>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter billing email"
                className="border-zinc-800 bg-zinc-950 text-white"
              />

              <Button
                onClick={handleSaveEmail}
                disabled={isSaving}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-black/40 p-4">
            <div className="mb-4 flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-yellow-400" />
              <h3 className="text-base font-semibold text-white">
                Stripe Payment Method
              </h3>
            </div>

            {isDefaultPaymentMethodAdded ? (
              <div className="flex items-center justify-between gap-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3">
                <div>
                  <p className="font-medium text-white">
                    {paymentMethodBrand?.toUpperCase() || "CARD"} ••••{" "}
                    {paymentMethodLast4 || "----"}
                  </p>
                  <p className="text-sm text-zinc-400">
                    Default payment method added
                  </p>
                </div>

                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Added
                </div>
              </div>
            ) : canShowCardForm ? (
              <Elements stripe={stripePromise}>
                <BillingCardForm
                  billingEmail={savedEmail}
                  onSuccess={() => {
                    onOpenChange(false);
                  }}
                />
              </Elements>
            ) : (
              <p className="text-sm text-zinc-400">
                Save billing email first to add a payment method.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}