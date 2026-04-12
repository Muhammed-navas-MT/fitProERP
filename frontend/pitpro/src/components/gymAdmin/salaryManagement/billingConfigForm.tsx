import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, MapPin, Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BillingAddress {
  fullName: string;
  billingEmail: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface BillingConfigFormProps {
  initialData?: Partial<BillingAddress>;
  isBillingAddressAdded?: boolean;
  isDefaultPaymentMethodAdded?: boolean;
  isSaving?: boolean;
  isAddingPaymentMethod?: boolean;
  onSaveBillingAddress: (data: BillingAddress) => Promise<void> | void;
  onAddPaymentMethod: () => Promise<void> | void;
}

export default function BillingConfigForm({
  initialData,
  isBillingAddressAdded = false,
  isDefaultPaymentMethodAdded = false,
  isSaving = false,
  isAddingPaymentMethod = false,
  onSaveBillingAddress,
  onAddPaymentMethod,
}: BillingConfigFormProps) {
  const [formData, setFormData] = useState<BillingAddress>({
    fullName: initialData?.fullName ?? "",
    billingEmail: initialData?.billingEmail ?? "",
    phone: initialData?.phone ?? "",
    line1: initialData?.line1 ?? "",
    line2: initialData?.line2 ?? "",
    city: initialData?.city ?? "",
    state: initialData?.state ?? "",
    postalCode: initialData?.postalCode ?? "",
    country: initialData?.country ?? "India",
  });

  const handleChange = (field: keyof BillingAddress, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (!formData.billingEmail.trim()) {
      toast.error("Billing email is required");
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }

    if (!formData.line1.trim()) {
      toast.error("Address line 1 is required");
      return false;
    }

    if (!formData.city.trim()) {
      toast.error("City is required");
      return false;
    }

    if (!formData.state.trim()) {
      toast.error("State is required");
      return false;
    }

    if (!formData.postalCode.trim()) {
      toast.error("Postal code is required");
      return false;
    }

    if (!formData.country.trim()) {
      toast.error("Country is required");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await onSaveBillingAddress(formData);
      toast.success("Billing address saved successfully");
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
            : "Failed to save billing address";

      toast.error(message);
    }
  };

  const handleAddPaymentMethod = async () => {
    if (!isBillingAddressAdded) {
      toast.error("Please save billing address first");
      return;
    }

    try {
      await onAddPaymentMethod();
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
            : "Failed to add payment method";

      toast.error(message);
    }
  };
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-zinc-800 bg-black/40 p-4 lg:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10">
            <MapPin className="h-5 w-5 text-blue-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Billing Address
            </h2>
            <p className="text-sm text-zinc-400">
              Save billing details before adding Stripe payment method
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Full Name
            </label>
            <Input
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter full name"
              className="border-zinc-800 bg-zinc-950 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Billing Email
            </label>
            <Input
              type="email"
              value={formData.billingEmail}
              onChange={(e) => handleChange("billingEmail", e.target.value)}
              placeholder="Enter billing email"
              className="border-zinc-800 bg-zinc-950 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter phone number"
              className="border-zinc-800 bg-zinc-950 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">Country</label>
            <Input
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              placeholder="Enter country"
              className="border-zinc-800 bg-zinc-950 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-zinc-400">
              Address Line 1
            </label>
            <Input
              value={formData.line1}
              onChange={(e) => handleChange("line1", e.target.value)}
              placeholder="Enter address line 1"
              className="border-zinc-800 bg-zinc-950 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-zinc-400">
              Address Line 2
            </label>
            <Input
              value={formData.line2}
              onChange={(e) => handleChange("line2", e.target.value)}
              placeholder="Enter address line 2 (optional)"
              className="border-zinc-800 bg-zinc-950 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">City</label>
            <Input
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Enter city"
              className="border-zinc-800 bg-zinc-950 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">State</label>
            <Input
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="Enter state"
              className="border-zinc-800 bg-zinc-950 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Postal Code
            </label>
            <Input
              value={formData.postalCode}
              onChange={(e) => handleChange("postalCode", e.target.value)}
              placeholder="Enter postal code"
              className="border-zinc-800 bg-zinc-950 text-white"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isBillingAddressAdded
              ? "Update Billing Address"
              : "Save Billing Address"}
          </Button>

          {isBillingAddressAdded && (
            <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Billing address added
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-black/40 p-4 lg:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
            <CreditCard className="h-5 w-5 text-yellow-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Stripe Payment Method
            </h2>
            <p className="text-sm text-zinc-400">
              Add your default Stripe payment method after billing address
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={handleAddPaymentMethod}
            disabled={!isBillingAddressAdded || isAddingPaymentMethod}
            className="bg-yellow-500 text-black hover:bg-yellow-400 disabled:opacity-50"
          >
            {isAddingPaymentMethod && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isDefaultPaymentMethodAdded
              ? "Update Payment Method"
              : "Add Payment Method"}
          </Button>

          {!isBillingAddressAdded && (
            <p className="text-sm text-zinc-500">
              Save billing address first to continue.
            </p>
          )}

          {isDefaultPaymentMethodAdded && (
            <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Default payment method added
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
