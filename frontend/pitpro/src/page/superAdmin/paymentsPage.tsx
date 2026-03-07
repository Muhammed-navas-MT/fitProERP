import { useState } from "react";
import Header from "@/components/superAdmin/Header";
import SearchBar from "@/components/superAdmin/SearchBar";
import Sidebar from "@/components/superAdmin/Sidebar";
import MobileNav from "@/components/superAdmin/MobileNav";
import { Eye } from "lucide-react";
import { useGetAllPayments } from "@/hook/superAdmin/paymentManagementHook";
import { useNavigate } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { TableSkeletonCell } from "@/components/superAdmin/tableSkeletonCell";

interface SuperAdminPaymentEntity {
  id: string;
  gymName: string;
  packageName: string;
  stripeSessionId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export default function PaymentsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("payments");

  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetAllPayments(
    page,
    searchQuery
  );

  const payments: SuperAdminPaymentEntity[] = data?.data?.payments || [];
  const totalPages = data?.data?.totalPages || 1;
  const totalCount = data?.data?.totalPayments || 0;

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-white">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen">
        <Sidebar isOpen />
      </div>

      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isMobile
      />

      <div className="lg:ml-64 min-h-screen pb-20 lg:pb-0">
        <Header
          title="Payments"
          description="Manage all gym subscription payments"
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          showMenuButton
        />

        <div className="p-4 sm:p-6">
          <div className="bg-[#111418] border border-gray-800 rounded-xl overflow-hidden shadow-lg">
            
            {/* Header Section */}
            <div className="p-4 sm:p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold mb-4">All Payments</h2>

              <SearchBar
                placeholder="Search by gym name"
                onSearch={handleSearch}
                showClearButton
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-800 bg-[#0f1318]">
                  <tr>
                    {[
                      "Gym Name",
                      "Package",
                      "Amount",
                      "Method",
                      "Status",
                      "Date",
                      "Actions",
                    ].map((head, index) => (
                      <th
                        key={head}
                        className={`px-6 py-4 font-semibold text-gray-400 ${
                          index <= 1 ? "text-left" : "text-center"
                        }`}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {isLoading &&
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-800"
                      >
                        <TableSkeletonCell align="left" />
                        <TableSkeletonCell align="left" />
                        <TableSkeletonCell align="center" />
                        <TableSkeletonCell align="center" />
                        <TableSkeletonCell align="center" />
                        <TableSkeletonCell align="center" />
                        <TableSkeletonCell align="center" />
                      </tr>
                    ))}

                  {/* Error */}
                  {isError && !isLoading && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-6 text-red-500"
                      >
                        {(error as Error).message}
                      </td>
                    </tr>
                  )}

                  {/* Empty */}
                  {!isLoading && payments.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-6 text-gray-500"
                      >
                        No payments found
                      </td>
                    </tr>
                  )}

                  {/* Data */}
                  {!isLoading &&
                    payments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="border-b border-gray-800 hover:bg-gray-900/50 transition"
                      >
                        <td className="px-6 py-4 text-left font-semibold">
                          {payment.gymName}
                        </td>

                        <td className="px-6 py-4 text-left">
                          {payment.packageName}
                        </td>

                        <td className="px-6 py-4 text-center font-semibold">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: payment.currency.toUpperCase(),
                          }).format(payment.amount)}
                        </td>

                        <td className="px-6 py-4 text-center">
                          {payment.paymentMethod}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              payment.status === "PAID"
                                ? "bg-green-600/20 text-green-400"
                                : payment.status === "PENDING"
                                ? "bg-yellow-600/20 text-yellow-400"
                                : "bg-red-600/20 text-red-400"
                            }`}
                          >
                            {payment.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-center text-gray-400">
                          {new Date(
                            payment.createdAt
                          ).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() =>
                              navigate(
                                `${FRONTEND_ROUTES.SUPER_ADMIN.BASE}/${FRONTEND_ROUTES.SUPER_ADMIN.PAYMENT_DETAIL}/${payment.id}`
                              )
                            }
                            className="border border-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-800 transition"
                          >
                            <Eye size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 sm:p-6 border-t border-gray-800 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Page {page} of {totalPages} ({totalCount} payments)
              </div>

              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                  className={`px-4 py-2 border border-gray-700 rounded-lg ${
                    page === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-800 transition"
                  }`}
                >
                  Previous
                </button>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                  className={`px-4 py-2 border border-gray-700 rounded-lg ${
                    page === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-800 transition"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}