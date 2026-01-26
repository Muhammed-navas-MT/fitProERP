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
}: PricingCardProps) {
  const { mutate, isPending } = usePurchaseSubscriptionViaStripe();

  const handlePurchase = () => {
    mutate(id, {
      onSuccess: (res) => {
        const checkoutUrl = res?.data?.data;
        if (!checkoutUrl) return toast.error("Checkout URL missing");
        window.location.href = checkoutUrl;
      },
      onError: () => toast.error("Unable to start payment"),
    });
  };

  return (
    <div className="flex flex-col rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-6 hover:border-orange-500/40 transition">
      <h3 className="text-xl font-bold text-white">{planName}</h3>
      <p className="text-sm text-neutral-400">{duration}</p>

      <p className="my-6 text-4xl font-extrabold text-orange-500">
        ₹{price}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6 text-center text-sm">
        <Stat icon={<Users />} value={limits.maxMembers} />
        <Stat icon={<Dumbbell />} value={limits.maxTrainers} />
        <Stat icon={<Building2 />} value={limits.maxBranches} />
      </div>

      <ul className="flex-1 space-y-3 mb-6">
        {features.map((f, i) => (
          <li key={i} className="flex gap-2 text-sm text-neutral-300">
            <Check className="h-4 w-4 text-orange-500" />
            {f.replace("_", " ")}
          </li>
        ))}
      </ul>

      <button
        onClick={handlePurchase}
        disabled={isPending}
        className="rounded-xl bg-orange-700 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {isPending ? "Processing..." : "Upgrade"}
      </button>
    </div>
  );
}

function Stat({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: number;
}) {
  return (
    <div>
      <div className="mx-auto mb-1 text-orange-500">{icon}</div>
      <p className="font-bold text-white">{value}</p>
    </div>
  );
}
