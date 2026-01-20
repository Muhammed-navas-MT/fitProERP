import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-center">
        
        <XCircle className="mx-auto text-red-500 w-16 h-16" />

        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          Payment Cancelled
        </h1>

        <p className="mt-2 text-gray-600 text-sm">
          Your payment was not completed. You can try again anytime.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => navigate("/gym-admin/pricing")}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition"
          >
            Try Again
          </button>

          <button
            onClick={() => navigate("/gym-admin/dashboard")}
            className="w-full border border-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
