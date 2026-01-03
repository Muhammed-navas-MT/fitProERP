import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  useGetAllTrainers,
  useBlockTrainer,
  useUnblockTrainer,
  useFindTrainer,
} from "@/hook/gymAdmin/trainerManagementHook"
import { rootstate } from "@/store/store"
import { useSelector } from "react-redux"
import { Edit, Eye, Ban, CheckCircle } from "lucide-react"
import { useDebounce } from "@/hook/useDebounce"
import { EmployeesSearch } from "@/components/gymAdmin/employeeManagement/employeesSearch"
import { useNavigate } from "react-router-dom"
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes"
import { EditEmployeeDialog } from "@/components/gymAdmin/employeeManagement/updateTrainerModal"

export type EmployeeStatus = "ACTIVE" | "IN_ACTIVE" | "PENDING"

export function EmployeesList() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearch = useDebounce(searchQuery, 500)

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>("")

  const navigate = useNavigate()
  const { _id } = useSelector((state: rootstate) => state.gymAdminData)

  const { data, isPending, refetch } =
    useGetAllTrainers(page, debouncedSearch, _id)

  const { mutate: blockTrainer, isPending: isBlocking } =
    useBlockTrainer()

  const { mutate: unblockTrainer, isPending: isUnblocking } =
    useUnblockTrainer()

  const { data: trainerDetails, isPending: isTrainerLoading } =
    useFindTrainer(selectedTrainerId)

  if (isPending) return null

  const trainers = data?.data?.data ?? []
  const totalPages = data?.data?.totalPages ?? 1

  const handleView = (trainerId: string) => {
    navigate(
      `${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.DETAIL_EMPLOYEES}/${trainerId}`
    )
  }

  const handleEdit = (trainer) => {
    setSelectedTrainerId(trainer.id) 
    setIsEditOpen(true)
  }

  const handleBlock = (trainerId: string) => {
    blockTrainer(trainerId, { onSuccess: () => refetch() })
  }

  const handleUnblock = (trainerId: string) => {
    unblockTrainer(trainerId, { onSuccess: () => refetch() })
  }

  return (
    <div>
      <EmployeesSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="rounded-lg border border-orange-500/20 bg-black/40 p-4 lg:p-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-zinc-400">
              <th className="py-3 px-2">Name</th>
              <th className="py-3 px-2">Email</th>
              <th className="py-3 px-2">Phone</th>
              <th className="py-3 px-2">Branch</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Joined</th>
              <th className="py-3 px-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {trainers.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-zinc-400">
                  No employees found
                </td>
              </tr>
            ) : (
              trainers.map((trainer) => (
                <tr
                  key={trainer.id}
                  className="border-b border-zinc-900 hover:bg-zinc-900/40 transition"
                >
                  <td className="py-3 px-2 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                      {trainer.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-medium">
                      {trainer.name}
                    </span>
                  </td>

                  <td className="py-3 px-2 text-zinc-300">{trainer.email}</td>
                  <td className="py-3 px-2 text-zinc-300">{trainer.phone}</td>
                  <td className="py-3 px-2 text-orange-500">
                    {trainer.branchName ?? "-"}
                  </td>

                  <td className="py-3 px-2">
                    <span
                      className={`rounded px-3 py-1 text-xs font-medium ${
                        trainer.status === "ACTIVE"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {trainer.status}
                    </span>
                  </td>

                  <td className="py-3 px-2 text-zinc-400">
                    {new Date(trainer.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-2">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleView(trainer.id)}
                        className="text-blue-400 hover:bg-blue-500/10"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(trainer)}
                        className="text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      {trainer.status === "ACTIVE" ? (
                        <Button
                          size="icon"
                          variant="ghost"
                          disabled={isBlocking}
                          onClick={() => handleBlock(trainer.id)}
                          className="text-red-500 hover:bg-red-500/10"
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          size="icon"
                          variant="ghost"
                          disabled={isUnblocking}
                          onClick={() => handleUnblock(trainer.id)}
                          className="text-green-500 hover:bg-green-500/10"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mt-6 flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1
            return (
              <Button
                key={pageNumber}
                size="sm"
                onClick={() => setPage(pageNumber)}
                className={
                  page === pageNumber
                    ? "bg-orange-500 text-white"
                    : "bg-[#1a1a1a] text-white"
                }
              >
                {pageNumber}
              </Button>
            )
          })}

          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {isEditOpen && (
        <EditEmployeeDialog
          open={isEditOpen}
          trainer={trainerDetails?.data}
          trainerId={selectedTrainerId}
          loading={isTrainerLoading}
          onOpenChange={(open) => {
            setIsEditOpen(open)
            if (!open) {
              refetch()
            }
          }}
        />
      )}
    </div>
  )
}
