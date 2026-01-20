import { NoPackages } from "@/components/member/packagemanagement/noPackages";
import { PackagesSkeletonGrid } from "@/components/member/packagemanagement/packageSkeletonGrid";
import { useCheckoutPackage } from "@/hook/member/checkoutHook";
import { useListActivepackage } from "@/hook/member/packageHook";
import { CheckCircle, Clock, IndianRupee, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Package {
  id: string;
  name: string;
  durationInDays: number;
  price: number;
  features: string[];
  isDailySession: boolean;
}

export default function MemberPackages() {
  const { data, isLoading, isError } = useListActivepackage();
  const plans: Package[] = data?.data || [];

  const { mutate, isPending } = useCheckoutPackage();

  const handlePurchase = (packageId: string) => {
    mutate(packageId, {
      onSuccess: (res) => {
        const checkoutUrl = res?.data?.url;

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

  if (isLoading) {
  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-10">
      <PackagesSkeletonGrid />
    </main>
  );
}

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load packages
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Membership Packages
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-400">
          Choose the plan that fits your fitness goals
        </p>
      </div>

       {plans.length === 0 ? (
        <NoPackages />
      ) : (
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((pkg) => (
          <div
            key={pkg.id}
            className="flex flex-col rounded-2xl border border-neutral-800
            bg-gradient-to-b from-neutral-900 via-neutral-950 to-black
            p-6 hover:border-orange-500/40 transition"
          >
            <div className="mb-4">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium
                ${
                  pkg.isDailySession
                    ? "bg-orange-500/10 text-orange-500"
                    : "bg-blue-500/10 text-blue-400"
                }`}
              >
                <Calendar size={14} />
                {pkg.isDailySession
                  ? "Daily Session Package"
                  : "Normal Package"}
              </span>
            </div>

            <div className="mb-5">
              <h2 className="text-xl font-semibold">{pkg.name}</h2>
              <div className="mt-2 flex items-center gap-2 text-sm text-neutral-400">
                <Clock size={16} />
                <span>{pkg.durationInDays} Days</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-1">
                <IndianRupee size={20} className="text-orange-500" />
                <span className="text-4xl font-bold text-orange-500">
                  {pkg.price}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                One-time payment
              </p>
            </div>

            <ul className="space-y-3 flex-1">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <CheckCircle
                    size={18}
                    className="text-orange-500 mt-0.5"
                  />
                  <span className="text-neutral-300 capitalize">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <button
                disabled={isPending}
                onClick={() => handlePurchase(pkg.id)}
                className="w-full rounded-xl py-3 text-sm font-semibold
                bg-orange-600 hover:bg-orange-700 transition
                disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? "Redirecting..." : "Buy Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
       )}
    </main>
  );
}
