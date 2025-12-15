import { useState } from "react"
import Header from "@/components/superAdmin/Header"
import SearchBar from "@/components/superAdmin/SearchBar"
import Sidebar from "@/components/superAdmin/Sidebar"
import MobileNav from "@/components/superAdmin/MobileNav"
import { Eye, Ban } from "lucide-react"

interface Gym {
  id: string
  name: string
  ownerName: string
  ownerEmail: string
  plan: string
  branches: number
  employees: number
  status: "active" | "blocked"
}

export default function GymsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("gyms")

  const [gyms, setGyms] = useState<Gym[]>([
    {
      id: "1",
      name: "PowerFit Gym",
      ownerName: "John Smith",
      ownerEmail: "john@powerfit.com",
      plan: "Basic",
      branches: 3,
      employees: 25,
      status: "active",
    },
    {
      id: "2",
      name: "IronCore Gym",
      ownerName: "Sarah Johnson",
      ownerEmail: "john@powerfit.com",
      plan: "Professional",
      branches: 3,
      employees: 25,
      status: "active",
    },
    {
      id: "3",
      name: "FitZone Studios",
      ownerName: "Michael Brown",
      ownerEmail: "john@powerfit.com",
      plan: "Basic",
      branches: 3,
      employees: 25,
      status: "active",
    },
    {
      id: "4",
      name: "PowerFit Gym",
      ownerName: "Emily Davis",
      ownerEmail: "john@powerfit.com",
      plan: "Professional",
      branches: 3,
      employees: 25,
      status: "active",
    },
    {
      id: "5",
      name: "PowerFit Gym",
      ownerName: "John Smith",
      ownerEmail: "john@powerfit.com",
      plan: "Basic",
      branches: 3,
      employees: 25,
      status: "active",
    },
  ])

  const handleLogout = () => {
    console.log("Logging out...")
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    console.log("[v0] Searching for:", value)
  }

  const handleViewDetail = (gymId: string) => {
    console.log("[v0] Viewing details for gym:", gymId)
  }

  const handleBlockGym = (gymId: string) => {
    console.log("[v0] Blocking gym:", gymId)
    setGyms(
      gyms.map((gym) => (gym.id === gymId ? { ...gym, status: gym.status === "active" ? "blocked" : "active" } : gym)),
    )
  }

  const filteredGyms = gyms.filter((gym) => {
    const query = searchQuery.toLowerCase()
    return (
      gym.name.toLowerCase().includes(query) ||
      gym.ownerName.toLowerCase().includes(query) ||
      gym.ownerEmail.toLowerCase().includes(query)
    )
  })

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-white">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen">
        <Sidebar onLogout={handleLogout} isOpen={true} />
      </div>

      {/* Mobile Sidebar */}
      <Sidebar onLogout={handleLogout} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isMobile={true} />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen pb-20 lg:pb-0">
        <Header
          title="Gyms"
          description="Manage all registered gyms in the system"
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          showMenuButton={true}
        />

        <div className="p-4 sm:p-6">
          {/* All Gyms Section */}
          <div className="bg-[#111418] border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-800">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4">All Gyms</h2>

              <SearchBar
                placeholder="search gyms by name,owner,or email...."
                onSearch={handleSearch}
                showClearButton={true}
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-800">
                  <tr className="text-left">
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 font-semibold text-xs sm:text-sm">
                      Gym Name
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 font-semibold text-xs sm:text-sm">Owner</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 font-semibold text-xs sm:text-sm">Plan</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 font-semibold text-xs sm:text-sm text-center">
                      Branches
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 font-semibold text-xs sm:text-sm text-center">
                      Employees
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 font-semibold text-xs sm:text-sm text-center">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-gray-400 font-semibold text-xs sm:text-sm text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGyms.map((gym) => (
                    <tr key={gym.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className="text-white font-semibold text-sm sm:text-base">{gym.name}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div>
                          <div className="text-white font-medium text-sm sm:text-base">{gym.ownerName}</div>
                          <div className="text-gray-500 text-xs sm:text-sm">{gym.ownerEmail}</div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className="text-white text-sm sm:text-base">{gym.plan}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                        <span className="text-white text-sm sm:text-base">{gym.branches}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-center">
                        <span className="text-white text-sm sm:text-base">{gym.employees}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex justify-center">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {gym.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewDetail(gym.id)}
                            className="bg-transparent border border-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs sm:text-sm transition"
                          >
                            <Eye size={14} />
                            <span className="hidden sm:inline">View Detail</span>
                          </button>
                          <button
                            onClick={() => handleBlockGym(gym.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs sm:text-sm transition"
                          >
                            <Ban size={14} />
                            <span className="hidden sm:inline">Block</span>
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

      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} onLogout={handleLogout} onTabChange={setActiveTab} />
    </div>
  )
}
