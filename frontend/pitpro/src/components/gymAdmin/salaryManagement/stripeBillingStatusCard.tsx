import { CreditCard, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddBillingConfigCardProps {
  onAddBillingConfig: () => void;
}

export default function AddBillingConfigCard({
  onAddBillingConfig,
}: AddBillingConfigCardProps) {
  return (
    <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4 lg:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
            <CreditCard className="h-5 w-5 text-yellow-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Add Billing Config First
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              Before generating or paying trainer salaries, please add your
              billing configuration. Since you are using Stripe, add billing
              address and default payment method first.
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
              <MapPin className="h-4 w-4" />
              Billing config is required for salary flow.
            </div>
          </div>
        </div>

        <Button
          onClick={onAddBillingConfig}
          className="bg-yellow-500 text-black hover:bg-yellow-400"
        >
          Add Billing Config
        </Button>
      </div>
    </div>
  );
}