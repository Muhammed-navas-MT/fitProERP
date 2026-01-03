import { Mail, Phone, Calendar, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Trainer } from "./employeesList"

interface EmployeeCardProps {
  employee: Trainer
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4 transition-colors hover:border-zinc-700">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 font-semibold text-white">
            {employee.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-medium text-white">
              {employee.name}
            </h3>
            <p className="text-sm text-orange-500">{employee.role}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm sm:flex-row lg:gap-6">
          <div className="flex items-center gap-2 text-zinc-400">
            <Mail className="h-4 w-4" />
            <span className="truncate">{employee.email}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Phone className="h-4 w-4" />
            <span>{employee.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Calendar className="h-4 w-4" />
            <span>Joined {employee.joinDate}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:gap-4">
          {/* <div className="flex flex-wrap gap-2">
            {employee.specializations?.slice(0,2).map((spec:string, index:number) => (
              <span
                key={index}
                className="rounded border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-300"
              >
                {spec}
              </span>
            ))}
          </div> */}

          

          {
            <div className="flex items-center gap-2">
              <span
                className={`rounded px-3 py-1 text-xs font-medium ${
                  employee.status === "ACTIVE"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {employee.status === "ACTIVE" ? "Active" : "Inactive"}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
