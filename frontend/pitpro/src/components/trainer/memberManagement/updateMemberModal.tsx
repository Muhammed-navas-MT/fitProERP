import { useEffect } from "react"
import { useForm } from "react-hook-form"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { toast } from "sonner"

import {
  useFindMember,
  useUpdateMember,
  useGetAllActiveBranches,
  useGetAllActiveTrainersByBranch,
} from "@/hook/trainer/memberManagementHook"

interface UpdateMemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  search: string
  page: number
  memberId: string
}

interface FormData {
  branchId: string
  trainerId: string
}

export function UpdateMemberModal({
  open,
  onOpenChange,
  search,
  page,
  memberId,
}: UpdateMemberModalProps) {
  const { mutate: updateMember, isPending } =
    useUpdateMember(memberId, page, search)

  const { data: memberData, isLoading: memberLoading } =
    useFindMember(memberId)

  const { data: branchData, isLoading: branchLoading } =
    useGetAllActiveBranches()

  const { handleSubmit, reset, watch, setValue } = useForm<FormData>({
    defaultValues: {
      branchId: "",
      trainerId: "",
    },
  })

  const selectedBranchId = watch("branchId")

  const { data: trainerData, isLoading: trainersLoading } =
    useGetAllActiveTrainersByBranch(selectedBranchId)

  const member = memberData?.data
  const branches = branchData?.data?.branches ?? []
  const trainers = trainerData?.data ?? []

  useEffect(() => {
    if (member && open) {
      reset({
        branchId: member.branchId || "",
        trainerId: member.trainerId || "",
      })
    }
  }, [member, open, reset])

  useEffect(() => {
    if (selectedBranchId) {
      setValue("trainerId", "")
    }
  }, [selectedBranchId, setValue])

  const onSubmit = (data: FormData) => {
    if (!member) return

    updateMember(
      { trainerId: data.trainerId,branchId:selectedBranchId },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Member updated successfully")
          onOpenChange(false)
        },
        onError: (err) =>
          toast.error(err.message || "Update failed"),
      }
    )
  }

  const FieldSkeleton = () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-32 bg-[#2a2a2a]" />
      <Skeleton className="h-10 w-full bg-[#1a1a1a]" />
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f0f0f] border-[#2a2a2a] text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Update Member
          </DialogTitle>
        </DialogHeader>

        {memberLoading && branchLoading && trainersLoading ? (
          <div className="space-y-6 mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FieldSkeleton />
              <FieldSkeleton />
            </div>

            <div className="flex gap-3 pt-4">
              <Skeleton className="h-10 flex-1 bg-[#1a1a1a]" />
              <Skeleton className="h-10 flex-1 bg-[#1a1a1a]" />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Branch */}
              <div className="space-y-2">
                <Label className="text-gray-300">Assigned Branch</Label>
                <Select
                  value={watch("branchId")}
                  onValueChange={(v) => setValue("branchId", v)}
                  disabled={branchLoading}
                >
                  <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    {branchLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading branches...
                      </SelectItem>
                    ) : (
                      branches.map(
                        (b: { id: string; branchName: string }) => (
                          <SelectItem key={b.id} value={b.id}>
                            {b.branchName}
                          </SelectItem>
                        )
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Trainer */}
              <div className="space-y-2">
                <Label className="text-gray-300">Assigned Trainer</Label>
                <Select
                  value={watch("trainerId")}
                  required
                  onValueChange={(v) => setValue("trainerId", v)}
                  disabled={!selectedBranchId || trainersLoading}
                >
                  <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Select trainer" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    {trainersLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading trainers...
                      </SelectItem>
                    ) : trainers.length === 0 ? (
                      <SelectItem value="none" disabled>
                        No trainers for this branch
                      </SelectItem>
                    ) : (
                      trainers.map(
                        (t: { id: string; name: string }) => (
                          <SelectItem key={t.id} value={t.id}>
                            {t.name}
                          </SelectItem>
                        )
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
              >
                {isPending ? "Updating..." : "Update Member"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
