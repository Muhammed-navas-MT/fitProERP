import { useState } from "react";
import { Sidebar } from "@/components/member/memberSidebar";
import { Topbar } from "@/components/member/topbar";
import { useDebounce } from "@/hook/useDebounce";
import { useGetAllPayments } from "@/hook/member/paymentHooks";
import { PaymentSummary } from "@/components/member/paymentComponents/paymentSammary";
import { TableSearch } from "@/components/member/memberSearchComponent";
import { PaymentTable } from "@/components/member/paymentComponents/paymentTableComponent";
import { TablePagination } from "@/components/member/tablePagination";
import { PaymentDetailsModal } from "@/components/member/paymentComponents/paymentDetailsModal";
import { PaymentsPageSkeleton } from "@/components/member/paymentComponents/paymentsPageSkeleton";
import { PaymentMethod } from "@/types/paymentMethod";

export interface PaymentItem {
  id: string;
  source: string;
  sourceType: string;
  sourceDetails: {
    planName?: string;
    duration?: string;
    trainerName?: string;
    sessionDate?: Date;
  };
  amount: number;
  paymentMethod: PaymentMethod;
  status: string;
  createdAt: Date;
}

export default function PaymentsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [selectedPayment, setSelectedPayment] = useState<PaymentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useGetAllPayments(page, debouncedSearch);

  const payments: PaymentItem[] = data?.data?.revenues ?? [];
  const summary = data?.data?.summary ?? [];
  const grandTotal = data?.data?.grandTotalAmount ?? 0;
  const total = data?.data?.total ?? 0;
  const totalPages = data?.data?.totalPages ?? 1;

  const handleView = (payment: PaymentItem) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Sidebar />

      <div className="md:ml-56">
        <Topbar
          avatar="MP"
          title="Payments"
          subtitle="Track all your membership payments"
        />

        <main className="p-4 lg:p-8">
          {isLoading ? (
            <PaymentsPageSkeleton />
          ) : (
            <div className="space-y-6">
              <PaymentSummary
                summary={summary}
                grandTotal={grandTotal}
                total={total}
              />

              <div className="flex justify-between items-center">
                <TableSearch
                  value={search}
                  onChange={(value) => {
                    setSearch(value);
                    setPage(1);
                  }}
                  className="w-full"
                />
              </div>

              <PaymentTable payments={payments} onView={handleView} />

              <TablePagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </main>
      </div>

      <PaymentDetailsModal
        payment={selectedPayment}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPayment(null);
        }}
      />
    </div>
  );
}