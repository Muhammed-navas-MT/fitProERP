import { PricingCard } from "@/components/gymAdmin/pricingCard";
import { useListActiveSubscription } from "@/hook/gymAdmin/listActiveSubscriptionHook";
import { Durations } from "@/types/durationType";


interface DataType {
  id: string;
  planName: string;
  price: number;
  duration: Durations;
  features: string[];
  limits:{
    maxBranches:number,
    maxMembers:number,
    maxTrainers:number
  }
  isActive: boolean;
}

export function PricingSection() {
  const { data, isLoading, isError } = useListActiveSubscription();
  const plans = data?.data || [];
  const planCount = plans.length;

  const getGridClass = () => {
    if (planCount === 1) return "md:grid-cols-1 max-w-md mx-auto";
    if (planCount === 2) return "md:grid-cols-2 max-w-4xl mx-auto";
    if (planCount === 3) return "md:grid-cols-2 lg:grid-cols-3";
    if (planCount === 4) return "md:grid-cols-2 lg:grid-cols-4";
    return "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-neutral-50 md:text-3xl lg:text-4xl">
            Choose Your Perfect
          </h1>
          <h2 className="mb-3 text-2xl font-bold md:text-3xl lg:text-4xl text-orange-500">
            Gym Management Plan
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-neutral-400 md:text-base">
            Scale your fitness business with flexible pricing plans
          </p>
        </div>
        <br />
        <p className="text-neutral-400">Loading plans...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-neutral-950">
        <p className="text-red-500">Failed to load plans</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col justify-center px-4 md:px-6 lg:px-8 bg-neutral-950 py-8 md:py-12">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-neutral-50 md:text-3xl lg:text-4xl">
            Choose Your Perfect
          </h1>
          <h2 className="mb-3 text-2xl font-bold md:text-3xl lg:text-4xl text-orange-500">
            Gym Management Plan
          </h2>
          <p className="mx-auto max-w-3xl text-sm text-neutral-400 md:text-base">
            Scale your fitness business with flexible pricing plans
          </p>
        </div>

        {planCount === 0 ? (
          <div className="mt-10 text-center">
            <p className="text-neutral-400 text-sm md:text-base">
              No active subscription plans available right now.
            </p>
            <p className="mt-1 text-neutral-500 text-xs md:text-sm">
              Please contact support or check back later.
            </p>
          </div>
        ) : (
          <div className={`grid gap-4 lg:gap-6 ${getGridClass()}`}>
            {plans.map((plan: DataType) => (
              <PricingCard
                key={plan.id}
                id={plan.id}
                planName={plan.planName}
                price={plan.price}
                duration={plan.duration}
                limits={plan.limits}
                features={plan.features}
              />
            ))}
          </div>
        )}

        {planCount > 6 && (
          <div className="mt-4 text-center">
            <p className="text-xs text-neutral-400 md:text-sm">
              Showing all {planCount} available plans
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
