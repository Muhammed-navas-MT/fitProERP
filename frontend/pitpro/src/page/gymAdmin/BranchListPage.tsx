import { useState, useEffect } from "react"
import { Sidebar } from "@/components/gymAdmin/sidebar"
import { TopBar } from "@/components/gymAdmin/topbar"
import { BranchCard } from "@/components/gymAdmin/branch/branchCard"
import { BranchFormModal } from "@/components/gymAdmin/branch/branchFormModal"
import { BranchesSearch } from "@/components/gymAdmin/branch/branchesSearch"
import { Button } from "@/components/ui/button"
import {
  useListBranch,
  useCreateBranch,
  useBlockBranch,
  useUnBlockBranch,
  useFindBranch,
  useUpdateBranch,
} from "@/hook/gymAdmin/branchHooks"
import {
  ICreateBranchType,
  IUpdateBranchType,
} from "@/types/gymAdmin/createBranchType"
import { toast } from "sonner"
import { useDebounce } from "@/hook/useDebounce"
import BranchCardSkeleton from "@/components/gymAdmin/branch/BranchCardSkeleton"
import EmptyBranchesState from "@/components/gymAdmin/branch/EmptyBranchesState"
interface BranchType {
  id: string
  branchName: string
  address: string
  phone: string
  membersCount: number
  staffCount: number
  status: "ACTIVE" | "IN_ACTIVE"
}

export default function BranchesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null)

  const debouncedSearch = useDebounce(searchQuery, 500)

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const { data, isLoading, isError, refetch } = useListBranch(
    page,
    debouncedSearch
  )

  const branches: BranchType[] = data?.data?.branches || []

  const { mutate: createBranch, isPending: isCreateLoading } = useCreateBranch()
  const { data: branchDetails, isLoading: isEditLoading } = useFindBranch( selectedBranchId || "" )
  const { mutate: updateBranch, isPending: isUpdateLoading } = useUpdateBranch()
  const { mutate: blockBranch } = useBlockBranch()
  const { mutate: unBlockBranch } = useUnBlockBranch()

  const handleAddBranch = (formData: ICreateBranchType) => {
    createBranch(formData, {
      onSuccess: (res) => {
        toast.success(res?.data?.message || "Branch created successfully")
        setModalOpen(false)
        refetch()
      },
      onError: (err) => {
        console.log(err,"in list page add handle..")
        toast.error(err.message || "Failed to create branch")
      },
    })
  }

  const handleEditBranch = (branchId: string) => {
    setSelectedBranchId(branchId)
    setModalMode("edit")
    setModalOpen(true)
  }

  const handleUpdateBranch = (formData: ICreateBranchType) => {
    if (!selectedBranchId) return

    const updateData: IUpdateBranchType = {
      branchName: formData.branchName,
      phone: formData.phone,
      address: formData.address,
      openTime: formData.openTime,
      closeTime: formData.closeTime,
    }

    updateBranch(
      { branchId: selectedBranchId, updateData },
      {
        onSuccess: () => {
          toast.success("Branch updated successfully")
          setModalOpen(false)
          setSelectedBranchId(null)
          refetch()
        },
        onError: (err) => {
          console.log(err,"error in updated....")
          toast.error(err.message || "Failed to update branch")
        },
      }
    )
  }

  const handleBlockBranch = (branchId: string) => {
    blockBranch(branchId, {
      onSuccess: () => {
        toast.success("Branch blocked")
        refetch()
      },
    })
  }

  const handleUnBlockBranch = (branchId: string) => {
    unBlockBranch(branchId, {
      onSuccess: () => {
        toast.success("Branch unblocked")
        refetch()
      },
    })
  };

  const editInitialData = branchDetails?.data
    ? {
        branchName: branchDetails.data.branchName,
        phone: branchDetails.data.phone,
        street: branchDetails.data.address.street,
        city: branchDetails.data.address.city,
        state: branchDetails.data.address.state,
        country: branchDetails.data.address.country,
        pincode: branchDetails.data.address.pincode,
        openTime: branchDetails.data.openTime,
        closeTime: branchDetails.data.closeTime,
      }
    : undefined;

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <TopBar title="Branches" subtitle="Manage your gym locations">
        <div className="p-4 lg:p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1">
              <BranchesSearch onSearch={setSearchQuery} />
            </div>

            <Button
              onClick={() => {
                setModalMode("add")
                setSelectedBranchId(null)
                setModalOpen(true)
              }}
              className="bg-orange-500 text-black whitespace-nowrap"
            >
              + Add Branch
            </Button>
          </div>

          {isLoading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <BranchCardSkeleton key={i} />
              ))}
            </div>
          )}

          {isError && (
            <div className="rounded-xl border border-red-900 bg-red-950 p-6 text-red-400">
              Failed to load branches. Please try again.
            </div>
          )}

          {!isLoading && !isError && branches.length === 0 && (
            <EmptyBranchesState
              isSearching={!!debouncedSearch}
              onAddBranch={() => {
                setModalMode("add")
                setModalOpen(true)
              }}
            />
          )}

          {!isLoading && !isError && branches.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {branches.map((branch) => (
                <BranchCard
                  key={branch.id}
                  id={branch.id}
                  name={branch.branchName}
                  address={branch.address}
                  phone={branch.phone}
                  members={branch.membersCount}
                  staff={branch.staffCount}
                  revenue={0}
                  isActive={branch.status}
                  onEdit={handleEditBranch}
                  onToggleBlock={handleBlockBranch}
                  onToggleUnBlock={handleUnBlockBranch}
                />
              ))}
            </div>
          )}
        </div>
      </TopBar>

      <BranchFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        initialData={modalMode === "edit" ? editInitialData : undefined}
        onSubmit={modalMode === "add" ? handleAddBranch : handleUpdateBranch}
        loading={isCreateLoading || isUpdateLoading || isEditLoading}
      />
    </div>
  )
}
