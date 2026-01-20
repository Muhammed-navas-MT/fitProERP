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
  highlighted?: boolean;
  isActive?: boolean;
}

export function PricingCard({
  planName,
  price,
  duration,
  features,
  id,
  limits,
  highlighted = false,
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
    <div
      className={`group relative flex h-full flex-col rounded-2xl p-8 transition-all duration-300 ${
        highlighted
          ? "bg-gradient-to-b from-orange-900/30 via-neutral-900 to-black border border-orange-500/50 shadow-[0_0_40px_-10px_rgba(249,115,22,0.6)]"
          : "bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-neutral-800 hover:border-orange-500/40 hover:shadow-[0_0_30px_-12px_rgba(249,115,22,0.4)]"
      }`}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-extrabold tracking-tight text-white">{planName}</h3>
        <p className="mt-1 text-sm text-neutral-400">{duration}</p>
      </div>

      <div className="mb-8">
        <span className="text-5xl font-extrabold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
          ₹{price}
        </span>
      </div>

      <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900/70 p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-orange-400">
          Plan Limits
        </p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="rounded-lg bg-black/40 p-3">
            <Users className="mx-auto mb-1 h-5 w-5 text-orange-500" />
            <p className="text-sm font-bold text-white">{limits.maxMembers}</p>
            <p className="text-xs text-neutral-400">Members</p>
          </div>
          <div className="rounded-lg bg-black/40 p-3">
            <Dumbbell className="mx-auto mb-1 h-5 w-5 text-orange-500" />
            <p className="text-sm font-bold text-white">{limits.maxTrainers}</p>
            <p className="text-xs text-neutral-400">Trainers</p>
          </div>
          <div className="rounded-lg bg-black/40 p-3">
            <Building2 className="mx-auto mb-1 h-5 w-5 text-orange-500" />
            <p className="text-sm font-bold text-white">{limits.maxBranches}</p>
            <p className="text-xs text-neutral-400">Branches</p>
          </div>
        </div>
      </div>

      <ul className="mb-10 space-y-4 flex-1 overflow-y-auto max-h-52 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-black scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {features.map((feature, index) => (
          <li key={index} className="flex gap-3">
            <Check className="mt-0.5 h-5 w-5 text-orange-500" />
            <span className="text-sm text-neutral-300">{feature.replace("_", " ")}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={ handlePurchase}
        disabled={isPending}
        className={`mt-auto w-full rounded-xl py-3 text-sm font-semibold tracking-wide transition-all duration-300 ${
          highlighted
            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.7)]"
            : "bg-orange-600 text-neutral-200 hover:bg-orange-900 border border-neutral-700 hover:border-orange-700"
        }`}
      >
        {isActive ? "Already Active" : isPending ? "Processing..." : "Get Started"}
      </button>
    </div>
  );
}
