import { PricingCard } from "../landing/PricingCard";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useListSubscription } from "@/hook/gymAdmin/listSubscriptionHook";

interface PricingPlan {
  id: string;
  planName: string;
  price: number;
  duration: string;
  features: string[];
}

export function PricingCards() {
  const { data, isLoading, isError, error } = useListSubscription();
  const plans: PricingPlan[] = Array.isArray(data?.data) ? data.data : [];

  if (isLoading) {
    return (
      <div className="py-16 text-center text-xl font-semibold">
        Loading subscription plans...
      </div>
    );
  }

  // Error state
  if (isError) {
    const err = error as AxiosError<{ message: string }>;
    toast.error(err.response?.data?.message || "Failed to load subscriptions");

    return (
      <div className="py-16 text-center text-red-600 font-semibold">
        Failed to load plans
      </div>
    );
  }

  // Empty state
  if (plans.length === 0) {
    return (
      <div className="py-16 text-center text-gray-600 font-semibold">
        No subscription plans found
      </div>
    );
  }

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              planName={plan.planName}
              price={plan.price}
              duration={plan.duration}
              features={plan.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
