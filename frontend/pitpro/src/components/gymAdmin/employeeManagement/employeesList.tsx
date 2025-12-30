import { EmployeeCard } from "@/components/gymAdmin/employeeManagement/employeeCard";
import { Button } from "@/components/ui/button";
import { useGetAllTrainers } from "@/hook/gymAdmin/trainerManagementHook";
import { rootstate } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export type EmployeeStatus = "ACTIVE" | "INACTIVE" | "PENDING";
export interface Trainer {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  joinDate: string;
  specializations: string[];
  status: string;
  avatar: string;
}

export function EmployeesList() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const {_id} = useSelector((state:rootstate)=>state.gymAdminData);

  const {data,isPending} = useGetAllTrainers(page, searchQuery,_id);
  if (isPending) return null;

  const trainers: Trainer[] = data?.data?.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  return (
    <div className="rounded-lg border border-gray-800 bg-[#1a1a1a] p-4 lg:p-6">
      <div className="mb-6">
        <h2 className="mb-1 text-xl font-bold text-white lg:text-2xl">
          All Employees
        </h2>
        <p className="text-sm text-gray-400">
          Manage employees information, role and status
        </p>
      </div>

      <div className="space-y-3">
        {trainers.length === 0 ? (
          <p className="text-center text-gray-400">No employees found</p>
        ) : (
          trainers.map((trainer) => (
            <EmployeeCard
              key={trainer.id}
              employee={trainer}
            />
          ))
        )}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="border-gray-700 bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
        >
          Prev
        </Button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <Button
              key={pageNumber}
              variant="outline"
              size="sm"
              onClick={() => setPage(pageNumber)}
              className={
                page === pageNumber
                  ? "border-gray-700 bg-[#2a2a2a] text-white"
                  : "border-gray-800 bg-[#0a0a0a] text-white hover:bg-[#1a1a1a]"
              }
            >
              {pageNumber}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="border-gray-700 bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
