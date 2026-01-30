import { useState } from "react";
import Header from "@/components/superAdmin/Header";
import SearchBar from "@/components/superAdmin/SearchBar";
import Sidebar from "@/components/superAdmin/Sidebar";
import MobileNav from "@/components/superAdmin/MobileNav";
import { Eye, Check, X } from "lucide-react";
import {
  useGetGyms,
  useBlockGym,
  useUnBlockGym,
  useApproveGym,
  useRejectGym,
} from "@/hook/superAdmin/gymMangementHook";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { useForm } from "react-hook-form";

interface GymListItemDTO {
  id: string;
  gymName: string;
  ownerName: string;
  email: string;
  phone: string;
  plan: string;
  branchesCount: number;
  trainersCount: number;
  status: string;
  createdAt: string;
}

export default function GymsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("gyms");
  const [page, setPage] = useState(1);

  const [approveGymId, setApproveGymId] = useState<string | null>(null);
  const [rejectGymId, setRejectGymId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useGetGyms(page, searchQuery);
  const gyms = data?.data?.gyms ?? [];
  const totalPages = data?.data?.totalPages ?? 1;
  const totalGyms = data?.data?.totalGyms ?? 0;

  const { mutate: blockGymMutate, isPending: isBlocking } = useBlockGym();
  const { mutate: unBlockGymMutate, isPending: isUnBlocking } = useUnBlockGym();
  const { mutate: approveGymMutate, isPending: isApproving } = useApproveGym();
  const { mutate: rejectGymMutate, isPending: isRejecting } = useRejectGym();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ reason: string }>();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleViewDetail = (gymId: string) => {
    navigate(
      `${FRONTEND_ROUTES.SUPER_ADMIN.BASE}/gym-detail/${gymId}`
    );
  };

  const handleBlockGym = (gymId: string) => {
    blockGymMutate(gymId, {
      onSuccess: (res) => {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["gyms"] });
      },
      onError: () => toast.error("Gym block failed"),
    });
  };

  const handleUnblockGym = (gymId: string) => {
    unBlockGymMutate(gymId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["gyms"] });
      },
    });
  };

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
          title="Gyms"
          description="Manage all registered gyms in the system"
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          showMenuButton
        />

        <div className="p-4 sm:p-6">
          <div className="bg-[#111418] border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-800">
              <h2 className="text-lg sm:text-xl font-bold mb-4">All Gyms</h2>

              <SearchBar
                placeholder="Search gyms by name, owner, or email"
                onSearch={handleSearch}
                showClearButton
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-800">
                  <tr>
                    {[
                      "Gym Name",
                      "Owner",
                      "Plan",
                      "Branches",
                      "Trainers",
                      "Status",
                      "Actions",
                    ].map((head) => (
                      <th
                        key={head}
                        className="px-6 py-4 text-gray-400 text-sm font-semibold"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {isLoading && (
                    <tr>
                      <td colSpan={7} className="text-center py-6">
                        Loading...
                      </td>
                    </tr>
                  )}

                  {!isLoading && gyms.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-6 text-gray-500"
                      >
                        No gyms found
                      </td>
                    </tr>
                  )}

                  {!isLoading &&
                    gyms.map((gym: GymListItemDTO) => (
                      <tr
                        key={gym.id}
                        className="border-b border-gray-800 hover:bg-gray-900/50"
                      >
                        <td className="px-6 py-4 font-semibold">
                          {gym.gymName}
                        </td>

                        <td className="px-6 py-4">
                          <div>
                            <div>{gym.ownerName}</div>
                            <div className="text-gray-500 text-sm">
                              {gym.email}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">{gym.plan}</td>
                        <td className="px-6 py-4 text-center">
                          {gym.branchesCount}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {gym.trainersCount}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              gym.status === "PENDING"
                                ? "bg-yellow-600"
                                : gym.status === "ACTIVE"
                                ? "bg-green-600"
                                : "bg-red-600"
                            }`}
                          >
                            {gym.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleViewDetail(gym.id)}
                              className="border border-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-800"
                            >
                              <Eye size={14} />
                            </button>

                            {gym.status === "PENDING" ? (
                              <>
                                <button
                                  onClick={() => setApproveGymId(gym.id)}
                                  className="bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg flex items-center gap-1"
                                >
                                  <Check size={14} />
                                  Approve
                                </button>

                                <button
                                  onClick={() => setRejectGymId(gym.id)}
                                  className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg flex items-center gap-1"
                                >
                                  <X size={14} />
                                  Reject
                                </button>
                              </>
                            ) : gym.status === "IN_ACTIVE" ||gym.status ==="ACTIVE" ? (
                              <button
                                onClick={() => handleBlockGym(gym.id)}
                                disabled={isBlocking}
                                className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg disabled:opacity-50"
                              >
                                Block
                              </button>
                            ) : gym.status === "BLOCKED" ?(
                              <button
                                onClick={() => handleUnblockGym(gym.id)}
                                disabled={isUnBlocking}
                                className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg disabled:opacity-50"
                              >
                                Unblock
                              </button>
                            ):
                            <button
                                disabled={true}
                                className=" px-3 py-1.5 rounded-lg disabled:opacity-50"
                              >
                              No Action
                              </button>
                            }
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {!isLoading && (
              <div className="p-4 sm:p-6 border-t border-gray-800 flex justify-between">
                <div className="text-sm text-gray-400">
                  Page {page} of {totalPages} ({totalGyms} gyms)
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-700 rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                    className="px-4 py-2 border border-gray-700 rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />

      {approveGymId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111418] border border-gray-800 rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Approve Gym</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to approve this gym?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setApproveGymId(null)}
                className="px-4 py-2 border border-gray-700 rounded-lg"
              >
                Cancel
              </button>

              <button
                disabled={isApproving}
                onClick={() =>
                  approveGymMutate(approveGymId, {
                    onSuccess: () => {
                      toast.success("Gym approved");
                      queryClient.invalidateQueries({ queryKey: ["gyms"] });
                      setApproveGymId(null);
                    },
                  })
                }
                className="px-4 py-2 bg-green-600 rounded-lg disabled:opacity-50"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {rejectGymId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111418] border border-gray-800 rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Reject Gym</h3>

            <form
              onSubmit={handleSubmit((data) => {
                rejectGymMutate(
                  { gymId: rejectGymId, reason: data.reason },
                  {
                    onSuccess: () => {
                      toast.success("Gym rejected");
                      queryClient.invalidateQueries({ queryKey: ["gyms"] });
                      reset();
                      setRejectGymId(null);
                    },
                  }
                );
              })}
            >
              <textarea
                {...register("reason", { required: true })}
                className="w-full bg-[#0a0b0d] border border-gray-700 rounded-lg p-3 mb-3"
                rows={4}
                placeholder="Enter rejection reason"
              />

              {errors.reason && (
                <p className="text-red-500 text-xs mb-3">
                  Reason is required
                </p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setRejectGymId(null);
                  }}
                  className="px-4 py-2 border border-gray-700 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isRejecting}
                  className="px-4 py-2 bg-red-600 rounded-lg disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
