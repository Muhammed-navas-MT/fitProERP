import { Search } from "lucide-react";
import { AddEmployeeDialog } from "@/components/gymAdmin/employeeManagement/addEmployeeModal";
import { useState } from "react";
import { adminInput, adminPrimaryBtn } from "@/components/gymAdmin/ui/adminUi";

interface EmployeesSearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export function EmployeesSearch({ searchQuery, setSearchQuery }: EmployeesSearchProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 shadow-sm sm:p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search employees by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${adminInput} pl-9`}
          />
        </div>

        <button
          type="button"
          onClick={() => setIsAddDialogOpen(true)}
          className={`${adminPrimaryBtn} w-full sm:w-auto`}
        >
          Add Employee
        </button>
      </div>

      <AddEmployeeDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
}
