import { Sidebar } from "@/components/gymAdmin/sidebar"
import { EmployeesSearch } from "@/components/gymAdmin/employeeManagement/employeesSearch"
import { EmployeesList } from "@/components/gymAdmin/employeeManagement/employeesList"
import { Bell } from "lucide-react"

export default function EmployeesPage() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-52">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-4 lg:p-6">
          <div className="lg:hidden">
            <button className="text-orange-500">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-5 w-5 text-orange-500" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-black">
              DJ
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-orange-500 lg:text-3xl">Employees</h1>
            <p className="text-sm text-zinc-400">Manage your gym staff and trainers</p>
          </div>

          {/* <StatsGrid /> */}
          <EmployeesSearch />
          <EmployeesList />
        </div>
      </div>
    </div>
  )
}
