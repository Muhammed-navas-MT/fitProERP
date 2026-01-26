import { Check, Users, Dumbbell, Building2 } from "lucide-react";

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

export function CurrentPlanCard({
  planName,
  price,
  duration,
  features,
  limits,
  isCurrentPlan,
}: PricingCardProps) {
  if (!isCurrentPlan) return null;

  return (
    <div className="rounded-2xl border border-orange-500/40 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {planName}
          </h3>
          <p className="text-sm text-neutral-400">{duration}</p>
        </div>

        <span className="w-fit rounded-md border border-orange-600 px-3 py-1 text-xs font-semibold text-orange-500">
          Current Plan
        </span>
      </div>

      {/* Price */}
      <p className="mb-8 text-4xl sm:text-5xl font-extrabold text-orange-500">
        ₹{price}
      </p>

      {/* Limits */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Limit icon={<Users />} label="Members" value={limits.maxMembers} />
        <Limit icon={<Dumbbell />} label="Trainers" value={limits.maxTrainers} />
        <Limit icon={<Building2 />} label="Branches" value={limits.maxBranches} />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-2">
            <Check className="h-4 w-4 text-orange-500 mt-1" />
            <span className="text-sm text-neutral-300">
              {feature.replace("_", " ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Limit({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg bg-black/40 p-4 text-center">
      <div className="mx-auto mb-1 text-orange-500">{icon}</div>
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="text-xs text-neutral-400">{label}</p>
    </div>
  );
}
