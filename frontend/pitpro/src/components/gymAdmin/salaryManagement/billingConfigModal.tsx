import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  CreditCard,
  Mail,
  Loader2,
  CheckCircle2,
  Pencil,
  AlertTriangle,
} from "lucide-react";
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

type BillingModalMode = "manage" | "email" | "card";

interface BillingConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: BillingModalMode;

  billingEmail?: string;
  isDefaultPaymentMethodAdded?: boolean;
  paymentMethodBrand?: string;
  paymentMethodLast4?: string;
  paymentMethodType?: string;

  isSaving?: boolean;

  onSaveBillingEmail: (email: string) => Promise<void>;
}

export default function BillingConfigModal({
  open,
  onOpenChange,
  mode = "manage",
  billingEmail = "",
  isDefaultPaymentMethodAdded = false,
  paymentMethodBrand,
  paymentMethodLast4,
  paymentMethodType,
  isSaving = false,
  onSaveBillingEmail,
}: BillingConfigModalProps) {
  const [email, setEmail] = useState(billingEmail);
  const [savedEmail, setSavedEmail] = useState(billingEmail);
  const [isReplacingCard, setIsReplacingCard] = useState(false);

  useEffect(() => {
    setEmail(billingEmail);
    setSavedEmail(billingEmail);
    setIsReplacingCard(mode === "card");
  }, [billingEmail, open, mode]);

  const handleSaveEmail = async () => {
    if (!email.trim()) {
      toast.error("Billing email is required");
      return;
    }

    try {
      await onSaveBillingEmail(email.trim());
      setSavedEmail(email.trim());

      if (mode === "email") {
        onOpenChange(false);
      }
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

  const formatCardBrand = (brand?: string) => {
    if (!brand) return "Card";
    return brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
  };

  const formatPaymentMethodType = (type?: string) => {
    if (!type) return "Card";
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  const showEmailSection = mode === "manage" || mode === "email";
  const showCardSection = mode === "manage" || mode === "card";

  const canShowCardForm = !!savedEmail.trim();

  const showExistingCardOnly =
    showCardSection &&
    isDefaultPaymentMethodAdded &&
    !isReplacingCard &&
    mode !== "card";

  const showCardForm =
    showCardSection &&
    canShowCardForm &&
    (!isDefaultPaymentMethodAdded || isReplacingCard || mode === "card");

  const description = useMemo(() => {
    if (mode === "email") {
      return "Update your billing email.";
    }

    if (mode === "card") {
      return isDefaultPaymentMethodAdded
        ? "Replace your existing Stripe payment method with a new card."
        : "Add your Stripe payment method.";
    }

    return isDefaultPaymentMethodAdded
      ? "Update your billing email or replace your Stripe payment method."
      : "Save billing email first, then add your Stripe payment method.";
  }, [mode, isDefaultPaymentMethodAdded]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-zinc-800 bg-[#0a0a0a] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white">
            Billing Configuration
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {showEmailSection && (
            <div className="rounded-lg border border-zinc-800 bg-black/40 p-4">
              <div className="mb-4 flex items-center gap-3">
                <Mail className="h-5 w-5 text-orange-400" />
                <h3 className="text-base font-semibold text-white">
                  Billing Email
                </h3>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter billing email"
                  className="border-zinc-800 bg-zinc-950 text-white focus-visible:ring-orange-500"
                />

                <Button
                  onClick={handleSaveEmail}
                  disabled={isSaving}
                  className="bg-orange-600 text-white hover:bg-orange-700"
                >
                  {isSaving && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Save
                </Button>
              </div>
            </div>
          )}

          {showCardSection && (
            <div className="rounded-lg border border-zinc-800 bg-black/40 p-4">
              <div className="mb-4 flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-orange-400" />
                <h3 className="text-base font-semibold text-white">
                  Stripe Payment Method
                </h3>
              </div>

              {!canShowCardForm ? (
                <div className="flex items-start gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-yellow-400" />
                  <p className="text-sm text-yellow-200">
                    Save billing email first to add or replace a payment method.
                  </p>
                </div>
              ) : showExistingCardOnly ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3">
                    <div>
                      <p className="font-medium text-white">
                        {formatCardBrand(paymentMethodBrand)} ••••{" "}
                        {paymentMethodLast4 || "----"}
                      </p>
                      <p className="text-sm text-zinc-400">
                        Default {formatPaymentMethodType(paymentMethodType)}{" "}
                        payment method added
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      Added
                    </div>
                  </div>

                  <Button
                    onClick={() => setIsReplacingCard(true)}
                    className="w-full bg-orange-600 text-white hover:bg-orange-700"
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Update Card Details
                  </Button>
                </div>
              ) : showCardForm ? (
                <div className="space-y-3">
                  {isDefaultPaymentMethodAdded && (
                    <div className="rounded-lg border border-orange-500/20 bg-orange-500/10 p-3">
                      <p className="text-sm text-orange-200">
                        You already have a default payment method. Adding a new
                        card will replace the current one.
                      </p>
                    </div>
                  )}

                  <Elements stripe={stripePromise}>
                    <BillingCardForm
                      billingEmail={savedEmail}
                      onSuccess={() => {
                        toast.success(
                          isDefaultPaymentMethodAdded
                            ? "Card details updated successfully"
                            : "Payment method added successfully",
                        );
                        setIsReplacingCard(false);
                        onOpenChange(false);
                      }}
                    />
                  </Elements>

                  {isDefaultPaymentMethodAdded && mode !== "card" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsReplacingCard(false)}
                      className="w-full border-zinc-700 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              ) : (
                <p className="text-sm text-zinc-400">
                  Save billing email first to add a payment method.
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
