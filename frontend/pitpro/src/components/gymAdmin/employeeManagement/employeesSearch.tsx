import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AddEmployeeDialog } from "@/components/gymAdmin/employeeManagement/addEmployeeModal"
import { useState } from "react"
import { useSelector } from "react-redux"
import { rootstate } from "@/store/store"

export function EmployeesSearch() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const gymAdminData = useSelector((state:rootstate)=>state.gymAdminData);
  console.log(gymAdminData," form search page ....")

  return (
    <div className="mb-6 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 lg:p-6">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          type="text"
          placeholder="Search members by name or email...."
          className="border-zinc-800 bg-black pl-10 text-white placeholder:text-zinc-500"
        />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1">
          <label className="mb-2 block text-sm text-white">Starting date</label>
          <Input type="date" className="border-zinc-800 bg-black text-white" />
        </div>
        <div className="flex-1">
          <label className="mb-2 block text-sm text-white">Ending date</label>
          <Input type="date" className="border-zinc-800 bg-black text-white" />
        </div>
        <div className="flex items-end gap-2">
          <Button className="w-full bg-orange-500 px-8 text-white hover:bg-orange-600 lg:w-auto">Filter</Button>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="w-full bg-orange-500 text-white hover:bg-orange-600 lg:w-auto lg:whitespace-nowrap"
          >
            Add Employee
          </Button>
        </div>
      </div>

      <AddEmployeeDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  )
}
