import SearchBar from "@/components/superAdmin/SearchBar";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import {
  useBlockSubscription,
  useGetSubscription,
  useUnBlockSubscription,
} from "@/hook/superAdmin/getSubscriptionHook";
import { Edit2, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner";

interface Plan {
  id: string;
  planName: string;
  price: number;
  duration: string;
  features: string[];
  isActive: boolean;
}

export default function SubscriptionTable() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data, error, isPending,refetch } = useGetSubscription(page, searchQuery);
  const { mutate: blockPlan } = useBlockSubscription();
  const {mutate:unBlockPlan} = useUnBlockSubscription();

  const plans: Plan[] = data?.data?.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleEdit = (id: string) => {
    console.log("Edit clicked for Plan ID:", id);
    navigate(`${FRONTEND_ROUTES.SUPER_ADMIN.BASE}/${FRONTEND_ROUTES.SUPER_ADMIN.EDIT_SUBSCRIPTION.replace(":id",id)}`);
  };

  const handleBlock = (id: string) => {
    blockPlan(id, {
      onSuccess: () => {
        toast("Blocked successfully")
        refetch();
      },
      onError:(err)=>{
        toast(err.message)
      }
    });
  };

  const handleUnblock = (id: string) => {
    unBlockPlan(id, {
      onSuccess: () => {
        toast("UnBlocked successfully")
        refetch();
      },
      onError:(err)=>{
        toast(err.message)
      }
    });
  };

  if (error)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center rounded-full">
          !
        </div>
        <p className="text-red-500 mt-4 font-semibold">Failed to load plans</p>
        <p className="text-gray-400 text-sm">Please try again later.</p>
      </div>
    );

  return (
    <div className="bg-[#111418] border border-gray-800 rounded-xl p-4 md:p-6 w-full">
      {isPending && (
        <div className="flex justify-center py-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 w-full">
        <h2 className="text-lg md:text-xl font-bold text-white">
          All Subscription
        </h2>

        <div className="w-full md:w-1/3">
          <SearchBar placeholder="Search plans..." onSearch={handleSearch} />
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto w-full">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b border-gray-800 text-sm">
              <th className="text-left py-4 px-4 text-gray-500 font-medium">
                Plan Name
              </th>
              <th className="text-left py-4 px-4 text-gray-500 font-medium">
                Price
              </th>
              <th className="text-left py-4 px-4 text-gray-500 font-medium">
                Duration
              </th>
              <th className="text-left py-4 px-4 text-gray-500 font-medium">
                Status
              </th>
              <th className="text-left py-4 px-4 text-gray-500 font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {plans.map((plan) => (
              <tr
                key={plan.id}
                className="border-b border-gray-800 hover:bg-gray-800/40 transition"
              >
                <td className="py-4 px-4 text-white font-semibold">
                  {plan.planName}
                </td>
                <td className="py-4 px-4 text-white">{plan.price}</td>
                <td className="py-4 px-4 text-white">{plan.duration}</td>
                <td className="py-4 px-4 text-white">
                  {plan.isActive ? (
                    <span className="text-green-500 font-medium">Active</span>
                  ) : (
                    <span className="text-red-500 font-medium">Inactive</span>
                  )}
                </td>

                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(plan.id)}
                      className="border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white p-2 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>

                    {plan.isActive ? (
                      <button
                        onClick={() => handleBlock(plan.id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition"
                        title="Block"
                      >
                        <X size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnblock(plan.id)}
                        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition"
                        title="Unblock"
                      >
                        <X size={16} />
                      </button>
                    )}

                    {/* <button
                      onClick={() =>(){}}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
                      title="View"
                    >
                      <Eye size={16} />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {plans.length === 0 && (
          <p className="text-center text-gray-500 py-4">No plans found.</p>
        )}
      </div>

      <div className="md:hidden space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-gray-800/30 border border-gray-700 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-white font-semibold text-lg">
                  {plan.planName}
                </h3>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full inline-block mt-1 ${
                    plan.isActive
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {plan.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                {plan.features.length} features
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Price:</span>
                <span className="text-white text-sm">{plan.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Duration:</span>
                <span className="text-white text-sm">{plan.duration}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(plan.id)}
                className="flex-1 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Edit2 size={16} /> Edit
              </button>

              {plan.isActive ? (
                <button
                  onClick={() => handleBlock(plan.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <X size={16} /> Block
                </button>
              ) : (
                <button
                  onClick={() => handleUnblock(plan.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <X size={16} /> Unblock
                </button>
              )}

              {/* <button
                onClick={() => handleView(plan.id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Eye size={16} /> View
              </button> */}
            </div>
          </div>
        ))}

        {plans.length === 0 && (
          <p className="text-center text-gray-500 py-4">No plans found.</p>
        )}
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 disabled:bg-gray-900 rounded-lg text-white"
        >
          Previous
        </button>

        <span className="text-white">
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-700 disabled:bg-gray-900 rounded-lg text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
