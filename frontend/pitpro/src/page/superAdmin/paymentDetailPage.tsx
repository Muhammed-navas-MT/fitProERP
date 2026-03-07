import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/superAdmin/Header";
import Sidebar from "@/components/superAdmin/Sidebar";
import MobileNav from "@/components/superAdmin/MobileNav";
import { useState } from "react";
import { usePaymentDetail } from "@/hook/superAdmin/paymentManagementHook";

export default function PaymentDetailPage() {
  const { paymentId } = useParams<{ paymentId: string }>();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("payments");

  const { data, isLoading, isError } = usePaymentDetail(paymentId!);

  const payment = data?.data;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0b0d] text-white flex items-center justify-center">
        Loading payment...
      </div>
    );
  }

  if (isError || !payment) {
    return (
      <div className="min-h-screen bg-[#0a0b0d] text-white flex items-center justify-center">
        Payment not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-white">
      <div className="hidden lg:block fixed left-0 top-0 h-screen">
        <Sidebar isOpen />
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isMobile
      />

      <div className="lg:ml-64 min-h-screen pb-20 lg:pb-0">
        <Header
          title="Payment Detail"
          description="View detailed payment information"
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          showMenuButton
        />

        <div className="p-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft size={18} />
            Back to Payments
          </button>

          <div className="bg-[#111418] border border-gray-800 rounded-xl p-6 space-y-6">
            
            <div>
              <h3 className="text-lg font-semibold mb-3 border-b border-gray-800 pb-2">
                Gym Information
              </h3>

              <div className="space-y-2 text-gray-300">
                <p><span className="text-gray-500">Gym Name:</span> {payment.gymName}</p>
                <p><span className="text-gray-500">Owner:</span> {payment.ownerName}</p>
                <p><span className="text-gray-500">Email:</span> {payment.ownerEmail}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 border-b border-gray-800 pb-2">
                Payment Information
              </h3>

              <div className="space-y-2 text-gray-300">
                <p>
                  <span className="text-gray-500">Package:</span> {payment.packageName}
                </p>

                <p>
                  <span className="text-gray-500">Amount:</span>{" "}
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: payment.currency,
                  }).format(payment.amount)}
                </p>

                <p>
                  <span className="text-gray-500">Payment Method:</span>{" "}
                  {payment.paymentMethod}
                </p>

                <p>
                  <span className="text-gray-500">Date:</span>{" "}
                  {new Date(payment.createdAt).toLocaleString()}
                </p>

                <p>
                  <span className="text-gray-500">Status:</span>{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      payment.status === "SUCCESS"
                        ? "bg-green-600"
                        : payment.status === "PENDING"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                    }`}
                  >
                    {payment.status}
                  </span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}