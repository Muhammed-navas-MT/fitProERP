import { useState } from "react";
import Header from "@/components/superAdmin/Header";
import SearchBar from "@/components/superAdmin/SearchBar";
import Sidebar from "@/components/superAdmin/Sidebar";
import MobileNav from "@/components/superAdmin/MobileNav";
import { Eye, Ban } from "lucide-react";
import { useGetGyms } from "@/hook/superAdmin/gymMangementHook";

interface GymListItemDTO {
    id: string;
    gymName: string;
    ownerName: string;
    email: string;
    phone: string;
    plan: string;
    branchesCount: number;
    employeesCount: number;
    status: string;
    createdAt: string;
  }

export default function GymsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("gyms");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetGyms(page, searchQuery);

  const gyms = data?.gyms ?? [];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleViewDetail = (gymId: string) => {
    console.log("View gym:", gymId);
  };

  const handleBlockGym = (gymId: string) => {
    console.log("Block gym:", gymId);
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
                      "Employees",
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
                          {gym.employeesCount}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span className="bg-blue-600 px-3 py-1 rounded-full text-xs">
                            {gym.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleViewDetail(gym.id)}
                              className="border border-gray-700 px-3 py-1.5 rounded-lg text-sm"
                            >
                              <Eye size={14} />
                            </button>

                            <button
                              onClick={() => handleBlockGym(gym.id)}
                              className="bg-red-600 px-3 py-1.5 rounded-lg text-sm"
                            >
                              <Ban size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <MobileNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}
