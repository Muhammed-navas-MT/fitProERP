import { Check, Users, Dumbbell, Building2 } from "lucide-react";
import { toast } from "sonner";
import { usePurchaseSubscriptionViaStripe } from "@/hook/gymAdmin/paymentHook";

interface PricingCardProps {
  planName: string;
  price: number;
  duration: string;
  features: string[];
  id: string;
  limits: {
    maxMembers: number;
    maxTrainers: number;
    maxBranches: number;
  };
  isCurrentPlan: boolean;
  isActive?: boolean;
}

export function PricingCard({
  planName,
  price,
  duration,
  features,
  id,
  limits,
  isCurrentPlan,
  isActive = false,
}: PricingCardProps) {
  const { mutate, isPending } = usePurchaseSubscriptionViaStripe();

  const handlePurchase = () => {
    mutate(id, {
      onSuccess: (res) => {
        const checkoutUrl = res?.data?.data;
        if (!checkoutUrl) {
          toast.error("Checkout URL missing");
          return;
        }
        window.location.href = checkoutUrl;
      },
      onError: (error) => {
        toast.error(error?.message || "Unable to start payment");
      },
    });
  };

  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-6 transition-all hover:border-orange-500/40">
      
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">{planName}</h3>
          <p className="text-sm text-neutral-400">{duration}</p>
        </div>

        {isCurrentPlan && (
          <span className="rounded-md border border-orange-600 px-3 py-1 text-xs font-semibold text-orange-500">
            Current
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className="text-5xl font-extrabold text-orange-500">
          ₹{price}
        </span>
      </div>

      {/* Plan Limits */}
      <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-orange-400">
          Plan Limits
        </p>

        <div className="grid grid-cols-3 gap-3">
          {/* Members */}
          <div className="flex flex-col items-center rounded-lg bg-black/40 p-3 text-center">
            <Users className="mb-1 h-5 w-5 text-orange-500" />
            <p className="text-sm font-bold text-white">
              {limits.maxMembers}
            </p>
            <p className="text-xs text-neutral-400 whitespace-nowrap">
              Members
            </p>
          </div>

          {/* Trainers */}
          <div className="flex flex-col items-center rounded-lg bg-black/40 p-3 text-center">
            <Dumbbell className="mb-1 h-5 w-5 text-orange-500" />
            <p className="text-sm font-bold text-white">
              {limits.maxTrainers}
            </p>
            <p className="text-xs text-neutral-400 whitespace-nowrap">
              Trainers
            </p>
          </div>

          {/* Branches */}
          <div className="flex flex-col items-center rounded-lg bg-black/40 p-3 text-center">
            <Building2 className="mb-1 h-5 w-5 text-orange-500" />
            <p className="text-sm font-bold text-white">
              {limits.maxBranches}
            </p>
            <p className="text-xs text-neutral-400 whitespace-nowrap">
              Branches
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <ul className="mb-8 flex-1 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 text-orange-500" />
            <span className="text-sm text-neutral-300">
              {feature.replace(/_/g, " ")}
            </span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button
        onClick={handlePurchase}
        disabled={isPending || isActive}
        className="mt-auto w-full rounded-xl bg-orange-600 py-3 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isActive ? "Already Active" : isPending ? "Processing..." : "Get Started"}
      </button>
    </div>
  );
}
