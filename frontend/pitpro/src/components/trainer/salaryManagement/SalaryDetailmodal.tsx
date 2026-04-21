import { useMemo } from "react";
import {
  Calendar,
  CheckCircle2,
  CreditCard,
  DollarSign,
  TrendingUp,
  Wallet,
  Receipt,
  Hash,
  Loader2,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useViewTrainerSalary } from "@/hook/trainer/salaryConfigHook";

interface SalaryDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  salaryId: string;
}

const formatCurrency = (amount?: number, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount ?? 0);

const formatDate = (date: string | null | undefined) => {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function TrainerSalaryDetailModal({
  open,
  onOpenChange,
  salaryId,
}: SalaryDetailModalProps) {
  const {
    data: salaryDetail,
    isLoading,
    isFetching,
    isError,
  } = useViewTrainerSalary(salaryId);

  const salary = salaryDetail?.data ?? null;
  const breakdown = salary?.salaryBreakdown;

  const earnings = useMemo(
    () => [
      { label: "Base Salary", value: breakdown?.baseSalary ?? 0 },
      {
        label: "Commission",
        value: breakdown?.commissionAmount ?? 0,
        badge: `${breakdown?.commissionRate ?? 0}%`,
      },
      { label: "Bonus", value: breakdown?.bonus ?? 0 },
    ],
    [breakdown],
  );

  const deductions = useMemo(
    () => [
      { label: "Leave Deduction", value: breakdown?.leaveDeduction ?? 0 },
      { label: "Other Deduction", value: breakdown?.otherDeduction ?? 0 },
      { label: "Manual Adjustment", value: breakdown?.manualAdjustment ?? 0 },
    ],
    [breakdown],
  );

  const isPendingState = isLoading || isFetching;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border border-[#1f1f1f] bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#1a1a1a] p-0 text-zinc-100 shadow-2xl sm:max-w-5xl">
        <DialogHeader className="sticky top-0 z-10 border-b border-[#1f1f1f] bg-[#0f0f0f]/95 px-6 py-4 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <DialogTitle className="text-left text-2xl font-semibold tracking-tight text-purple-400">
                Salary Detail
              </DialogTitle>
              {!isPendingState && salary?.salaryMonthLabel && (
                <p className="mt-1 text-sm text-gray-400">
                  {salary.salaryMonthLabel}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isPendingState && (
                <div className="inline-flex items-center gap-2 rounded-md border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1.5 text-sm text-gray-300">
                  <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                  Loading...
                </div>
              )}

              {!isPendingState && salary?.paymentStatus && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {salary.paymentStatus}
                </span>
              )}

              {!isPendingState && salary?.receiptUrl && (
                <a
                  href={salary.receiptUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-purple-700"
                >
                  Receipt
                </a>
              )}

              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="group flex h-10 w-10 items-center justify-center rounded-md border border-[#2a2a2a] bg-[#1a1a1a] transition-all hover:border-purple-500 hover:bg-purple-500/10"
              >
                <X className="h-4 w-4 text-gray-400 transition-colors group-hover:text-purple-400" />
              </button>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6">
          {isPendingState ? (
            <div className="flex min-h-[420px] items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-gray-400">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                <p className="text-sm">Loading salary details...</p>
              </div>
            </div>
          ) : isError ? (
            <div className="flex min-h-[420px] items-center justify-center">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-6 py-4 text-center">
                <p className="text-sm text-red-400">
                  Failed to load salary details.
                </p>
              </div>
            </div>
          ) : !salary ? (
            <div className="flex min-h-[420px] items-center justify-center">
              <div className="rounded-lg border border-[#2a2a2a] bg-[#1a1a1a]/50 px-6 py-4 text-center">
                <p className="text-sm text-gray-400">No salary detail found.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="group relative overflow-hidden rounded-xl border border-purple-500/20 bg-gradient-to-br from-[#1a1a1a] to-[#111111] p-6 shadow-[0_0_20px_rgba(168,85,247,0.08)] transition-all hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl transition-all duration-500 group-hover:bg-purple-500/20" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-400">
                    <Wallet className="h-3.5 w-3.5 text-purple-400" />
                    Net Salary
                  </div>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                      {formatCurrency(salary.netSalary, salary.currency)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {salary.currency}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">
                    Paid on {formatDate(salary.paidAt)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]/80 p-6 transition-colors hover:border-purple-500/30">
                  <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-purple-400">
                    <TrendingUp className="h-4 w-4" />
                    Salary Breakdown
                  </h2>

                  <div className="space-y-2">
                    {earnings.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between rounded-md px-3 py-2.5 transition-all hover:bg-[#222222]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-300">
                            {row.label}
                          </span>
                          {"badge" in row && row.badge && (
                            <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-medium text-purple-400">
                              {row.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium tabular-nums text-zinc-100">
                          {formatCurrency(row.value, salary.currency)}
                        </span>
                      </div>
                    ))}

                    <div className="my-3 border-t border-[#2a2a2a]" />

                    {deductions.map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center justify-between rounded-md px-3 py-2.5 transition-all hover:bg-[#222222]"
                      >
                        <span className="text-sm text-gray-400">
                          {row.label}
                        </span>
                        <span className="text-sm font-medium tabular-nums text-red-400">
                          −{formatCurrency(row.value, salary.currency)}
                        </span>
                      </div>
                    ))}

                    <div className="my-3 border-t border-[#2a2a2a]" />

                    <div className="flex items-center justify-between rounded-md px-3 py-2.5">
                      <span className="text-sm font-medium text-zinc-200">
                        Gross Salary
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-zinc-100">
                        {formatCurrency(salary.grossSalary, salary.currency)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-md px-3 py-2.5">
                      <span className="text-sm text-gray-500">
                        Total Deductions
                      </span>
                      <span className="text-sm font-medium tabular-nums text-gray-400">
                        {formatCurrency(salary.totalDeduction, salary.currency)}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between rounded-md bg-purple-500/10 px-3 py-3">
                      <span className="text-sm font-semibold text-purple-300">
                        Net Salary
                      </span>
                      <span className="text-base font-bold tabular-nums text-purple-300">
                        {formatCurrency(salary.netSalary, salary.currency)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg border border-[#2a2a2a] bg-[#111111] p-3 transition-all hover:border-purple-500/30">
                      <p className="text-[11px] uppercase tracking-wider text-gray-500">
                        Sessions
                      </p>
                      <p className="mt-1 text-xl font-semibold text-white">
                        {breakdown?.totalSessions ?? 0}
                      </p>
                    </div>

                    <div className="rounded-lg border border-[#2a2a2a] bg-[#111111] p-3 transition-all hover:border-purple-500/30">
                      <p className="text-[11px] uppercase tracking-wider text-gray-500">
                        Commission Rate
                      </p>
                      <p className="mt-1 text-xl font-semibold text-white">
                        {breakdown?.commissionRate ?? 0}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]/80 p-6 transition-colors hover:border-purple-500/30">
                  <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-purple-400">
                    <CreditCard className="h-4 w-4" />
                    Payment Information
                  </h2>

                  <dl className="grid grid-cols-1 gap-4">
                    <InfoRow
                      icon={Hash}
                      label="Payment Method"
                      value={salary.paymentMethod}
                    />
                    <InfoRow
                      icon={Calendar}
                      label="Salary Period"
                      value={salary.salaryMonthLabel}
                    />
                    <InfoRow
                      icon={Calendar}
                      label="Paid At"
                      value={formatDate(salary.paidAt)}
                    />
                    <InfoRow
                      icon={Calendar}
                      label="Created"
                      value={formatDate(salary.createdAt)}
                    />

                    {salary.stripeChargeAmount !== undefined && (
                      <InfoRow
                        icon={DollarSign}
                        label="Charged"
                        value={`${salary.stripeChargeAmount} ${salary.stripeChargeCurrency ?? ""}`}
                      />
                    )}

                    {salary.settledAmountInInr !== undefined && (
                      <InfoRow
                        icon={Receipt}
                        label="Settled (INR)"
                        value={formatCurrency(salary.settledAmountInInr, "INR")}
                      />
                    )}

                    {salary.exchangeRateUsed !== undefined && (
                      <InfoRow
                        icon={TrendingUp}
                        label="Exchange Rate"
                        value={`1 USD = ₹${salary.exchangeRateUsed}`}
                      />
                    )}
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="group flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-[#222222]">
      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#111111] transition-all group-hover:bg-purple-500/10">
        <Icon className="h-4 w-4 text-purple-400" />
      </div>
      <div className="min-w-0">
        <dt className="text-[11px] uppercase tracking-wider text-gray-500">
          {label}
        </dt>
        <dd className="mt-0.5 truncate text-sm font-medium text-zinc-200">
          {value}
        </dd>
      </div>
    </div>
  );
}
