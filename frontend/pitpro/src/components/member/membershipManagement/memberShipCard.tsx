import { useCheckoutPackage } from "@/hook/member/checkoutHook";
import { Check, Dumbbell, Zap, Crown } from "lucide-react";
import { toast } from "sonner";
import { EmptyPlansState } from "./emptyPackageState";

export interface IListActivePackagesDTO {
  id: string;
  name: string;
  durationInDays: number;
  price: number;
  features: string[];
  isDailySession: boolean;
  isActive: boolean;
}

interface MembershipPageProps {
  packages: IListActivePackagesDTO[];
}

export function MembershipCard({ packages }: MembershipPageProps) {
  const { mutate, isPending } = useCheckoutPackage();

  const activePackage = packages.find((pkg) => pkg.isActive);
  const otherPackages = packages.filter((pkg) => !pkg.isActive);

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

  const formatDuration = (days: number) => {
    if (days >= 365) return `${Math.floor(days / 365)} Year`;
    if (days >= 30) return `${Math.floor(days / 30)} Month`;
    return `${days} Days`;
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Active Plan */}
        {activePackage && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4 text-orange-600">
              <Crown size={20} />
              <span className="text-sm font-semibold uppercase tracking-wider">
                Your Current Plan
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-orange-500 bg-[#0a0a0a]">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-orange-500/20 text-orange-500">
                        Active
                      </span>

                      {activePackage.isDailySession && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 bg-green-500/20 text-green-500">
                          <Zap size={12} />
                          Daily Session
                        </span>
                      )}
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-2">
                      {activePackage.name}
                    </h2>

                    <p className="text-gray-400 text-sm">
                      {formatDuration(activePackage.durationInDays)} plan
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activePackage.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-orange-500/20">
                            <Check size={12} className="text-orange-500" />
                          </div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <button
                      disabled
                      className="px-6 py-3 rounded-xl border border-gray-800 text-orange-500 font-semibold opacity-60 cursor-not-allowed"
                    >
                      Current Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Available Plans Header */}
        <div className="flex items-center gap-2 mb-6">
          <Dumbbell size={18} className="text-orange-600" />
          <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
            Available Plans
          </span>
        </div>

        {/* Available Plans */}
        {otherPackages.length === 0 ? (
          <EmptyPlansState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-xl border border-gray-800 bg-[#0a0a0a] transition-all duration-300"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {pkg.name}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {pkg.isDailySession ? "Daily Session" : "Normal"}
                      </p>
                    </div>

                    {pkg.isDailySession && (
                      <span className="px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1 bg-green-500/15 text-green-500">
                        <Zap size={10} /> Daily
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 flex-1 mb-6">
                    {pkg.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex gap-2 text-sm text-gray-400"
                      >
                        <Check size={16} className="text-orange-500 mt-0.5" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePurchase(pkg.id)}
                    disabled={isPending}
                    className="w-full py-3 rounded-xl border border-gray-800 text-orange-500 font-semibold transition-all hover:bg-orange-600 hover:text-white disabled:opacity-50"
                  >
                    {isPending ? "Processing..." : "Select Plan"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MembershipCard;
