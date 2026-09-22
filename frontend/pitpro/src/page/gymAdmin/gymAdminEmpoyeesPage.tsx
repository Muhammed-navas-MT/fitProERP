import { Sidebar } from "@/components/gymAdmin/sidebar";
import { TopBar } from "@/components/gymAdmin/topbar";
import { EmployeesList } from "@/components/gymAdmin/employeeManagement/employeesList";

export default function EmployeesPage() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <TopBar title="Employees" subtitle="Manage your gym staff and trainers">
        <EmployeesList />
      </TopBar>
    </div>
  );
}
