import { useListActiveSubscription } from "@/hook/gymAdmin/listActiveSubscriptionHook";
import { Durations } from "@/types/durationType";
import { PricingCard } from "../pricingCard";
import { CurrentPlanCard } from "./CurrentPlanCard";
import { NoOtherPlans } from "./noOtherPlans";
import { SubscriptionPageSkeleton } from "./subscriptionPageSkeleton";

interface DataType {
  id: string;
  planName: string;
  price: number;
  duration: Durations;
  features: string[];
  limits: {
    maxBranches: number;
    maxMembers: number;
    maxTrainers: number;
  };
  isActive: boolean;
  isCurrentPlan: boolean;
}

export function SubscriptionSection() {
  const { data, isLoading, isError } = useListActiveSubscription();
  const plans: DataType[] = data?.data || [];

  const currentPlan = plans.find((p) => p.isCurrentPlan);
  const otherPlans = plans.filter((p) => !p.isCurrentPlan);

  if (isLoading) return <SubscriptionPageSkeleton />;


  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-red-500">Failed to load plans</p>
      </div>
    );
  }

  return (
    <section className="space-y-14">
      {currentPlan && (
        <CurrentPlanCard
          id={currentPlan.id}
          planName={currentPlan.planName}
          price={currentPlan.price}
          duration={currentPlan.duration}
          limits={currentPlan.limits}
          features={currentPlan.features}
          isCurrentPlan
          isActive
        />
      )}

      {otherPlans.length > 0 ? (
  <div className="flex justify-center">
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-w-7xl w-full">
      {otherPlans.map((plan) => (
        <PricingCard
          key={plan.id}
          id={plan.id}
          planName={plan.planName}
          price={plan.price}
          duration={plan.duration}
          limits={plan.limits}
          features={plan.features}
          isCurrentPlan={false}
        />
      ))}
    </div>
  </div>
) : (
  <NoOtherPlans />
)}

    </section>
  );
}
