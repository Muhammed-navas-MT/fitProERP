import { Crown } from "lucide-react";

export function NoOtherPlans() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-orange-500/30 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black p-12 text-center">
      <Crown className="h-12 w-12 text-orange-500 mb-4" />

      <h3 className="text-xl font-bold text-white">
        You’re on the Best Plan 🎉
      </h3>

      <p className="mt-2 max-w-md text-sm text-neutral-400">
        You already have access to all premium features.  
        There are no higher plans available at the moment.
      </p>
    </div>
  );
}
