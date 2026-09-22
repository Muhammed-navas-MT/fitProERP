import { useState } from "react"
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
import { cn } from "@/lib/utils"
import { AdminTable, type AdminTableColumn } from "@/components/gymAdmin/ui/AdminTable"
import { Pagination } from "@/components/gymAdmin/ui/Pagination"
import { StatusBadge } from "@/components/gymAdmin/ui/StatusBadge"
import { adminIconBtn } from "@/components/gymAdmin/ui/adminUi"
import { EditEmployeeDialog } from "@/components/gymAdmin/employeeManagement/updateTrainerModal"
import { TableSkeleton } from "../memberManagement/TableSkeleton"
import { TrainerItem } from "@/types/updateTrainerType"

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

  if (isPending) return <TableSkeleton/>

  const trainers = data?.data?.data ?? []
  const totalPages = data?.data?.totalPages ?? 1

  const handleView = (trainerId: string) => {
    navigate(
      `${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${FRONTEND_ROUTES.GYM_ADMIN.DETAIL_EMPLOYEES}/${trainerId}`
    )
  }

  const handleEdit = (trainerId:string) => {
    setSelectedTrainerId(trainerId)
    setIsEditOpen(true)
  }

  const handleBlock = (trainerId: string) => {
    blockTrainer(trainerId, { onSuccess: () => refetch() })
  }

  const handleUnblock = (trainerId: string) => {
    unblockTrainer(trainerId, { onSuccess: () => refetch() })
  }

  const columns: AdminTableColumn<TrainerItem>[] = [
    {
      header: "Name",
      render: (trainer) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
            {trainer.name.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium text-white">{trainer.name}</span>
        </div>
      ),
    },
    { header: "Email", render: (trainer) => trainer.email },
    { header: "Phone", render: (trainer) => trainer.phone },
    {
      header: "Branch",
      render: (trainer) => (
        <span className="text-orange-500">{trainer.branchName ?? "-"}</span>
      ),
    },
    {
      header: "Status",
      render: (trainer) => <StatusBadge status={trainer.status} />,
    },
    {
      header: "Joined",
      render: (trainer) => (
        <span className="text-zinc-400">
          {new Date(trainer.joinDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-center",
      render: (trainer) => (
        <div className="flex justify-center gap-1">
          <button
            type="button"
            onClick={() => handleView(trainer.id)}
            className={cn(adminIconBtn, "hover:text-blue-400")}
            aria-label="View trainer"
          >
            <Eye className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => handleEdit(trainer.id)}
            className={adminIconBtn}
            aria-label="Edit trainer"
          >
            <Edit className="h-4 w-4" />
          </button>

          {trainer.status === "ACTIVE" ? (
            <button
              type="button"
              disabled={isBlocking}
              onClick={() => handleBlock(trainer.id)}
              className={cn(adminIconBtn, "hover:bg-red-500/10 hover:text-red-400")}
              aria-label="Block trainer"
            >
              <Ban className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isUnblocking}
              onClick={() => handleUnblock(trainer.id)}
              className={cn(adminIconBtn, "hover:bg-green-500/10 hover:text-green-400")}
              aria-label="Unblock trainer"
            >
              <CheckCircle className="h-4 w-4" />
            </button>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-5">
      <EmployeesSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <AdminTable
        data={trainers}
        columns={columns}
        rowKey={(trainer) => trainer.id}
        emptyText="No employees found"
        footer={
          totalPages > 1 ? (
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          ) : undefined
        }
      />

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
