import { useState } from "react";
import { toast } from "sonner";
import {
  DollarSign,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  AlertTriangle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Sidebar } from "@/components/gymAdmin/sidebar";
import { TopBar } from "@/components/gymAdmin/topbar";
import { Button } from "@/components/ui/button";
import {
  useGenerateSalary,
  useGetBillingConfig,
  useListSalary,
  useSaveBillingEmail,
} from "@/hook/gymAdmin/salaryHook";
import GymAdminTablePageSkeleton from "@/components/gymAdmin/tablePageSkeleton";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import AddBillingConfigCard from "@/components/gymAdmin/salaryManagement/addBillingConfigCard";
import BillingConfigModal from "@/components/gymAdmin/salaryManagement/billingConfigModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

type SalaryPaymentMethod = "CASH" | "BANK_TRANSFER" | "UPI" | "CHEQUE";
type PaymentStatus = "PENDING" | "PAID" | "FAILED";

interface TrainerSalaryResponseDto {
  id: string;
  trainerId: string;
  trainerName: string;
  salaryMonth: number;
  salaryYear: number;
  salaryMonthLabel: string;
  grossSalary: number;
  totalDeduction: number;
  netSalary: number;
  paymentMethod: SalaryPaymentMethod;
  paymentStatus: PaymentStatus;
  currency: "INR";
  paidAt?: Date;
  dueDate?: Date;
  createdAt?: Date;
}

export default function SalaryManagement() {
  const [page, setPage] = useState(1);
  const [selectedSalary, setSelectedSalary] =
    useState<TrainerSalaryResponseDto | null>(null);
  const [isPayDialogOpen, setIsPayDialogOpen] = useState(false);
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);

  const limit = 10;
  const navigate = useNavigate();

  const params = { page, limit };

  const {
    data: salaryData,
    isLoading: isSalaryLoading,
    isError: isSalaryError,
  } = useListSalary(params);

  const { data: billingConfigData, isLoading: isBillingConfigLoading } =
    useGetBillingConfig();

  const { mutate: generateSalary, isPending: isGenerating } =
    useGenerateSalary(params);

  const { mutateAsync: saveBillingEmail, isPending: isSavingEmail } =
    useSaveBillingEmail();

  const salaries: TrainerSalaryResponseDto[] = salaryData?.data?.salaries ?? [];
  const totalPages = salaryData?.data?.totalPages ?? 1;
  const isGenerated = salaryData?.data?.isGenerated ?? false;

  const billingConfig = billingConfigData?.data;

  const billingEmail = billingConfig?.billingEmail ?? "";
  const paymentMethodBrand = billingConfig?.paymentMethodBrand ?? "";
  const paymentMethodLast4 = billingConfig?.paymentMethodLast4 ?? "";
  const isDefaultPaymentMethodAdded =
    billingConfig?.isDefaultPaymentMethodAdded ?? false;

  const isBillingConfigAdded = !!billingEmail && !!isDefaultPaymentMethodAdded;

  const handleOpenBillingModal = () => {
    setIsBillingModalOpen(true);
  };

  const handleSaveBillingEmail = async (email: string) => {
    try {
      const response = await saveBillingEmail(email);
      toast.success(response?.message || "Billing email saved successfully");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save billing email";
      toast.error(message);
      throw error;
    }
  };

  const handleGenerate = () => {
    generateSalary(undefined, {
      onSuccess: (res) => {
        toast.success(
          res?.message ?? "Monthly salaries generated successfully",
        );
      },
      onError: (err) => {
        const message =
          err instanceof Error ? err.message : "Failed to generate salaries";
        toast.error(message);
      },
    });
  };

  const handlePay = (salary: TrainerSalaryResponseDto) => {
    if (!isBillingConfigAdded) {
      toast.error("Please add billing config before paying salary");
      setIsBillingModalOpen(true);
      return;
    }

    toast.info(
      `Pay action for ${salary.trainerName} - ₹${salary.netSalary.toLocaleString(
        "en-IN",
      )}`,
    );
  };

  const handleView = (salary: TrainerSalaryResponseDto) => {
    navigate(`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/salary/${salary.id}`);
  };

  const handleEdit = (salary: TrainerSalaryResponseDto) => {
    navigate(`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/salary/edit/${salary.id}`);
  };

  const confirmPay = () => {
    if (!selectedSalary) return;

    handlePay(selectedSalary);
    setIsPayDialogOpen(false);
    setSelectedSalary(null);
  };

  const formatMethod = (method: SalaryPaymentMethod) => {
    return method.toLowerCase().replace(/_/g, " ");
  };

  const renderStatusBadge = (status: PaymentStatus) => {
    const baseClass = "rounded px-3 py-1 text-xs font-medium";

    if (status === "PAID") {
      return (
        <span className={`${baseClass} bg-green-600/20 text-green-400`}>
          PAID
        </span>
      );
    }

    if (status === "FAILED") {
      return (
        <span className={`${baseClass} bg-red-600/20 text-red-400`}>
          FAILED
        </span>
      );
    }

    return (
      <span className={`${baseClass} bg-yellow-600/20 text-yellow-400`}>
        PENDING
      </span>
    );
  };

  if (isSalaryLoading || isBillingConfigLoading) {
    return (
      <GymAdminTablePageSkeleton
        title="Salary Management"
        description="Manage and pay trainer salaries"
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <TopBar
        title="Salary Management"
        subtitle="Add billing config, generate salary, then pay"
        showUserMenu={true}
      >
        <div className="space-y-6">
          {!isBillingConfigAdded && (
            <AddBillingConfigCard onAddBillingConfig={handleOpenBillingModal} />
          )}

          <div className="rounded-lg border border-orange-500/20 bg-black/40 p-4 lg:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Trainer Salaries
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Monthly trainer salary records
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {!isBillingConfigAdded ? (
                  <div className="flex items-center gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-3 py-2 text-xs text-yellow-300">
                    <AlertTriangle className="h-4 w-4" />
                    Add billing config first
                  </div>
                ) : (
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerated || isGenerating}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isGenerating && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {isGenerated
                      ? "Salary Already Generated"
                      : "Generate Monthly Salary"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {isSalaryError ? (
            <div className="flex items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 py-16">
              <p className="text-sm text-red-400">Failed to load salaries.</p>
            </div>
          ) : salaries.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-800 bg-black/40 py-20 text-zinc-500">
              <DollarSign className="mb-3 h-12 w-12 opacity-30" />
              <p className="text-sm">No salary records found.</p>

              {!isBillingConfigAdded ? (
                <p className="mt-1 text-xs text-yellow-400">
                  Please add billing config first.
                </p>
              ) : !isGenerated ? (
                <p className="mt-1 text-xs text-zinc-600">
                  Click "Generate Monthly Salary" to create records.
                </p>
              ) : null}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-orange-500/20 bg-black/40 p-4 lg:p-6">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-zinc-400">
                    <th className="px-2 py-3">Trainer</th>
                    <th className="px-2 py-3">Month</th>
                    <th className="px-2 py-3 text-right">Gross</th>
                    <th className="px-2 py-3 text-right">Deductions</th>
                    <th className="px-2 py-3 text-right">Net Salary</th>
                    <th className="px-2 py-3">Method</th>
                    <th className="px-2 py-3 text-center">Status</th>
                    <th className="px-2 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {salaries.map((salary) => (
                    <tr
                      key={salary.id}
                      className="border-b border-zinc-900 transition hover:bg-zinc-900/40"
                    >
                      <td className="px-2 py-3">
                        <span className="font-medium text-white">
                          {salary.trainerName}
                        </span>
                      </td>

                      <td className="px-2 py-3 text-zinc-300">
                        {salary.salaryMonthLabel}
                      </td>

                      <td className="px-2 py-3 text-right font-medium tabular-nums text-zinc-300">
                        ₹{salary.grossSalary.toLocaleString("en-IN")}
                      </td>

                      <td className="px-2 py-3 text-right font-medium tabular-nums text-red-400">
                        -₹{salary.totalDeduction.toLocaleString("en-IN")}
                      </td>

                      <td className="px-2 py-3 text-right font-semibold tabular-nums text-emerald-400">
                        ₹{salary.netSalary.toLocaleString("en-IN")}
                      </td>

                      <td className="px-2 py-3 capitalize text-zinc-300">
                        {formatMethod(salary.paymentMethod)}
                      </td>

                      <td className="px-2 py-3">
                        <div className="flex justify-center">
                          {renderStatusBadge(salary.paymentStatus)}
                        </div>
                      </td>

                      <td className="px-2 py-3">
                        <div className="flex justify-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleView(salary)}
                            className="text-blue-400 hover:bg-blue-500/10"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          {salary.paymentStatus === "PENDING" ? (
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleEdit(salary)}
                              className="text-zinc-400 hover:bg-zinc-800 hover:text-white"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          ) : (
                            <span className="flex items-center text-xs text-zinc-600">
                              —
                            </span>
                          )}

                          {salary.paymentStatus === "PENDING" ? (
                            <Button
                              size="sm"
                              disabled={!isBillingConfigAdded}
                              onClick={() => {
                                if (!isBillingConfigAdded) {
                                  toast.error(
                                    "Please add billing config before paying salary",
                                  );
                                  setIsBillingModalOpen(true);
                                  return;
                                }

                                setSelectedSalary(salary);
                                setIsPayDialogOpen(true);
                              }}
                              className="bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Pay
                            </Button>
                          ) : (
                            <span className="flex items-center text-xs text-zinc-600">
                              —
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {totalPages > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Prev
                  </Button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const pageNumber = index + 1;

                    return (
                      <Button
                        key={pageNumber}
                        size="sm"
                        onClick={() => setPage(pageNumber)}
                        className={
                          page === pageNumber
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : "bg-[#1a1a1a] text-white hover:bg-zinc-800"
                        }
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </TopBar>

      <BillingConfigModal
        open={isBillingModalOpen}
        onOpenChange={setIsBillingModalOpen}
        billingEmail={billingEmail}
        isDefaultPaymentMethodAdded={isDefaultPaymentMethodAdded}
        paymentMethodBrand={paymentMethodBrand}
        paymentMethodLast4={paymentMethodLast4}
        isSaving={isSavingEmail}
        onSaveBillingEmail={handleSaveBillingEmail}
      />

      <AlertDialog open={isPayDialogOpen} onOpenChange={setIsPayDialogOpen}>
        <AlertDialogContent className="border border-zinc-800 bg-[#0a0a0a]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Confirm Payment
            </AlertDialogTitle>

            <AlertDialogDescription className="text-zinc-400">
              Are you sure you want to pay{" "}
              <span className="font-medium text-white">
                {selectedSalary?.trainerName}
              </span>{" "}
              ₹{selectedSalary?.netSalary?.toLocaleString("en-IN")} ?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={confirmPay}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Confirm Pay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
