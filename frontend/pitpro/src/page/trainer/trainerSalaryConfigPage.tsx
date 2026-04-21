import { useEffect, useMemo, useState } from "react";
import {
  CreditCard,
  Landmark,
  IndianRupee,
  RefreshCcw,
  Save,
  ShieldCheck,
  Wallet,
  CheckCircle2,
  AlertTriangle,
  Clock3,
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { Sidebar } from "@/components/trainer/trainerSidebar";
import { Header } from "@/components/trainer/trainerHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { rootstate } from "@/store/store";
import { SalaryPaymentMethod } from "@/types/trainer/salarypaymentMethod";
import {
  useCreateTrainerStripeOnboardingLink,
  useGetTrainerSalaryConfig,
  useRefreshTrainerStripeStatus,
  useUpdateTrainerSalaryConfig,
} from "@/hook/trainer/salaryConfigHook";

type StripeAccountStatus = "NOT_CREATED" | "PENDING" | "RESTRICTED" | "ACTIVE";

interface SalaryHistoryItem {
  id: string;
  monthLabel: string;
  grossSalary: number;
  deduction: number;
  netSalary: number;
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  paymentDate?: string;
  paymentMethod: SalaryPaymentMethod;
}

const dummySalaryHistory: SalaryHistoryItem[] = [
  {
    id: "1",
    monthLabel: "January 2026",
    grossSalary: 32000,
    deduction: 2000,
    netSalary: 30000,
    paymentStatus: "PAID",
    paymentDate: "2026-02-02",
    paymentMethod: SalaryPaymentMethod.BANK_TRANSFER,
  },
  {
    id: "2",
    monthLabel: "February 2026",
    grossSalary: 34000,
    deduction: 1500,
    netSalary: 32500,
    paymentStatus: "PAID",
    paymentDate: "2026-03-03",
    paymentMethod: SalaryPaymentMethod.BANK_TRANSFER,
  },
  {
    id: "3",
    monthLabel: "March 2026",
    grossSalary: 35000,
    deduction: 1000,
    netSalary: 34000,
    paymentStatus: "PENDING",
    paymentMethod: SalaryPaymentMethod.BANK_TRANSFER,
  },
];

export default function TrainerSalaryConfigPage() {
  const name = useSelector((state: rootstate) => state.authData.name);

  const avatarText = name
    ?.split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const { data, isLoading } = useGetTrainerSalaryConfig();
  const { mutateAsync: updateSalaryConfig, isPending: isSaving } =
    useUpdateTrainerSalaryConfig();
  const {
    mutateAsync: createStripeOnboardingLink,
    isPending: isCreatingOnboardingLink,
  } = useCreateTrainerStripeOnboardingLink();
  const { mutateAsync: refreshStripeStatus, isPending: isRefreshingStatus } =
    useRefreshTrainerStripeStatus();

  const salaryConfig = data?.data ?? data;

  const [paymentType] = useState<SalaryPaymentMethod>(
    SalaryPaymentMethod.BANK_TRANSFER,
  );
  const [accountHolderName, setAccountHolderName] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  useEffect(() => {
    if (!salaryConfig) return;

    setAccountHolderName(salaryConfig.accountHolderName ?? "");
    setIfscCode(salaryConfig.ifscCode ?? "");
  }, [salaryConfig]);

  const stripeAccountStatus: StripeAccountStatus =
    salaryConfig?.stripeAccountStatus ?? "NOT_CREATED";

  const isPayoutEnabled = salaryConfig?.isPayoutEnabled ?? false;
  const stripeOnboardingCompleted =
    salaryConfig?.stripeOnboardingCompleted ?? false;
  const hasConnectedAccount = !!salaryConfig?.stripeConnectedAccountId;

  const statusBadge = useMemo(() => {
    switch (stripeAccountStatus) {
      case "ACTIVE":
        return {
          text: "Stripe Active",
          className:
            "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          icon: <CheckCircle2 className="h-4 w-4" />,
        };
      case "RESTRICTED":
        return {
          text: "Restricted",
          className: "bg-red-500/10 text-red-400 border-red-500/20",
          icon: <AlertTriangle className="h-4 w-4" />,
        };
      case "PENDING":
        return {
          text: "Pending",
          className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
          icon: <Clock3 className="h-4 w-4" />,
        };
      default:
        return {
          text: "Not Connected",
          className: "bg-zinc-500/10 text-zinc-300 border-zinc-500/20",
          icon: <Wallet className="h-4 w-4" />,
        };
    }
  }, [stripeAccountStatus]);

  const handleSaveConfig = async () => {
    try {
      if (!accountHolderName.trim()) {
        toast.error("Account holder name is required");
        return;
      }

      if (!ifscCode.trim()) {
        toast.error("IFSC code is required");
        return;
      }

      const response = await updateSalaryConfig({
        paymentType: SalaryPaymentMethod.BANK_TRANSFER,
        accountHolderName: accountHolderName.trim(),
        ifscCode: ifscCode.trim().toUpperCase(),
      });

      toast.success(
        response?.data?.message || "Salary config updated successfully",
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update salary config";
      toast.error(message);
    }
  };

  const handleConnectStripe = async () => {
    try {
      const origin = window.location.origin;

      const response = await createStripeOnboardingLink({
        refreshUrl: `${origin}/trainer/salary?refresh=true`,
        returnUrl: `${origin}/trainer/salary?return=true`,
      });

      const url = response?.data?.url ?? response?.url;

      if (!url) {
        throw new Error("Stripe onboarding URL not received");
      }

      window.location.href = url;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create onboarding link";
      toast.error(message);
    }
  };

  const handleRefreshStatus = async () => {
    try {
      const response = await refreshStripeStatus();
      toast.success(
        response?.data?.message ||
          "Stripe account status refreshed successfully",
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to refresh Stripe status";
      toast.error(message);
    }
  };

  const renderPaymentStatus = (status: SalaryHistoryItem["paymentStatus"]) => {
    const baseClass =
      "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium";

    if (status === "PAID") {
      return (
        <span
          className={`${baseClass} border-emerald-500/20 bg-emerald-500/10 text-emerald-400`}
        >
          PAID
        </span>
      );
    }

    if (status === "FAILED") {
      return (
        <span
          className={`${baseClass} border-red-500/20 bg-red-500/10 text-red-400`}
        >
          FAILED
        </span>
      );
    }

    return (
      <span
        className={`${baseClass} border-yellow-500/20 bg-yellow-500/10 text-yellow-400`}
      >
        PENDING
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Sidebar />

      <div className="lg:pl-[220px]">
        <Header
          title="Salary Settings"
          subtitle="Manage payout settings and salary history"
          avatar={avatarText}
        />

        <main className="p-4 pb-20 lg:p-6 lg:pb-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="space-y-6 xl:col-span-2">
              <div className="rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-500/10">
                    <CreditCard className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Payout Configuration
                    </h2>
                    <p className="text-sm text-gray-400">
                      Bank transfer is the only supported salary payout method
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="rounded-xl border border-purple-500 bg-purple-500/10 p-4">
                    <Landmark className="mb-3 h-5 w-5 text-purple-400" />
                    <p className="font-medium text-white">Bank Transfer</p>
                    <p className="mt-1 text-xs text-gray-400">
                      Stripe connected payout
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        Account Holder Name
                      </label>
                      <Input
                        value={accountHolderName}
                        onChange={(e) => setAccountHolderName(e.target.value)}
                        placeholder="Enter account holder name"
                        className="border-[#2a2a2a] bg-[#111111] text-white"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-300">
                        IFSC Code
                      </label>
                      <Input
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value)}
                        placeholder="Enter IFSC code"
                        className="border-[#2a2a2a] bg-[#111111] text-white uppercase"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="font-medium text-yellow-300">
                          Stripe onboarding required
                        </p>
                        <p className="mt-1 text-sm text-yellow-200/80">
                          Save your bank details first, then complete Stripe
                          onboarding to enable payouts.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    onClick={handleSaveConfig}
                    disabled={isSaving || isLoading}
                    className="bg-purple-600 text-white hover:bg-purple-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isSaving ? "Saving..." : "Save Config"}
                  </Button>

                  <Button
                    onClick={handleConnectStripe}
                    disabled={
                      isCreatingOnboardingLink ||
                      !accountHolderName.trim() ||
                      !ifscCode.trim()
                    }
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    {hasConnectedAccount
                      ? isCreatingOnboardingLink
                        ? "Opening..."
                        : "Resume Stripe Onboarding"
                      : isCreatingOnboardingLink
                        ? "Creating..."
                        : "Connect Stripe"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleRefreshStatus}
                    disabled={!hasConnectedAccount || isRefreshingStatus}
                    className="border-[#2a2a2a] bg-transparent text-white hover:bg-[#222222]"
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    {isRefreshingStatus ? "Refreshing..." : "Refresh Status"}
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10">
                    <IndianRupee className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Salary History
                    </h2>
                    <p className="text-sm text-gray-400">
                      Dummy data for now. You can connect API later.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-[#2a2a2a] text-left text-gray-400">
                        <th className="px-3 py-3">Month</th>
                        <th className="px-3 py-3 text-right">Gross</th>
                        <th className="px-3 py-3 text-right">Deduction</th>
                        <th className="px-3 py-3 text-right">Net Salary</th>
                        <th className="px-3 py-3">Method</th>
                        <th className="px-3 py-3">Status</th>
                        <th className="px-3 py-3">Paid Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dummySalaryHistory.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-[#222222] hover:bg-[#141414]"
                        >
                          <td className="px-3 py-4 text-white">
                            {item.monthLabel}
                          </td>
                          <td className="px-3 py-4 text-right text-gray-300">
                            ₹{item.grossSalary.toLocaleString("en-IN")}
                          </td>
                          <td className="px-3 py-4 text-right text-red-400">
                            -₹{item.deduction.toLocaleString("en-IN")}
                          </td>
                          <td className="px-3 py-4 text-right font-semibold text-emerald-400">
                            ₹{item.netSalary.toLocaleString("en-IN")}
                          </td>
                          <td className="px-3 py-4 text-gray-300">
                            {item.paymentMethod
                              .toLowerCase()
                              .replace(/_/g, " ")}
                          </td>
                          <td className="px-3 py-4">
                            {renderPaymentStatus(item.paymentStatus)}
                          </td>
                          <td className="px-3 py-4 text-gray-400">
                            {item.paymentDate ?? "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Current Status
                </h3>

                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium ${statusBadge.className}`}
                >
                  {statusBadge.icon}
                  {statusBadge.text}
                </div>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">Payout Method</span>
                    <span className="font-medium text-white">
                      {paymentType.toLowerCase().replace(/_/g, " ")}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">Payout Enabled</span>
                    <span
                      className={
                        isPayoutEnabled ? "text-emerald-400" : "text-yellow-400"
                      }
                    >
                      {isPayoutEnabled ? "Enabled" : "Not Enabled"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">Onboarding</span>
                    <span
                      className={
                        stripeOnboardingCompleted
                          ? "text-emerald-400"
                          : "text-yellow-400"
                      }
                    >
                      {stripeOnboardingCompleted ? "Completed" : "Pending"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">Connected Account</span>
                    <span className="max-w-[150px] truncate text-white">
                      {salaryConfig?.stripeConnectedAccountId ?? "Not created"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">Bank Name</span>
                    <span className="text-white">
                      {salaryConfig?.bankName ?? "—"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">Bank Last 4</span>
                    <span className="text-white">
                      {salaryConfig?.bankLast4 ?? "—"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] p-6">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Helpful Notes
                </h3>

                <ul className="space-y-3 text-sm text-gray-400">
                  <li>
                    • Save your payout config before starting Stripe onboarding.
                  </li>
                  <li>
                    • Only bank transfer is supported for trainer salary
                    payouts.
                  </li>
                  <li>
                    • Stripe onboarding must be completed to enable automatic
                    payouts.
                  </li>
                  <li>• Salary history below is dummy data for now.</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
