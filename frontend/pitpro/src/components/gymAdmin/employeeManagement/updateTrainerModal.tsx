import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  trainerSignupSchema,
  type TrainerFormData,
} from "@/validation/trainerAddSchema"
import { useUpdateTrainer } from "@/hook/gymAdmin/trainerManagementHook"
import { useListActiveBranch } from "@/hook/gymAdmin/branchHooks"
import { toast } from "sonner"
import { UpdateTrainerType } from "@/types/updateTrainerType"

interface EditEmployeeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trainer: UpdateTrainerType
  trainerId:string
  loading: boolean
}

export function EditEmployeeDialog({
  open,
  onOpenChange,
  trainer,
  trainerId,
  loading = false,
}: EditEmployeeDialogProps) {
  const { mutate: updateTrainer, isPending } = useUpdateTrainer()
  const { data } = useListActiveBranch()
  const branchData = data?.data?.branches ?? []

  const [newSpec, setNewSpec] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TrainerFormData>({
    resolver: zodResolver(trainerSignupSchema),
  })

  useEffect(() => {
    if (!trainer) return

    reset({
      name: trainer.name,
      email: trainer.email,
      phone: trainer.phone,
      address: trainer.address,
      specialization: trainer.specialization,
      experience: trainer.experience,
      baseSalary: trainer.baseSalary,
      commisionRate: trainer.commisionRate,
      branchId: trainer.branchId,
      status: trainer.status,
      dutyTime: {
        startTime: trainer.dutyTime.startTime,
        endTime: trainer.dutyTime.endTime,
      },
    })
  }, [trainer, reset])

  const specializations = watch("specialization", [])

  const addSpecialization = () => {
    if (!newSpec.trim() || specializations.includes(newSpec)) return
    setValue("specialization", [...specializations, newSpec])
    setNewSpec("")
  }

  const onSubmit = (data: TrainerFormData) => {
    if (!trainerId) return

    updateTrainer(
      {
        trainerId,
        data: {
          ...data,
          gymId: trainer.gymId,
          email: trainer.email,
          role: trainer.role,
        },
      },
      {
        onSuccess: () => {
          toast.success("Trainer updated")
          onOpenChange(false)
        },
        onError: () => {
          toast.error("Update failed")
        },
      }
    )
  }

  return (
  <Dialog
    open={open}
    onOpenChange={(e) => {
      console.log(e);
      onOpenChange(e);
    }}
  >
    <DialogContent className="max-h-[90vh] max-w-3xl border-zinc-800 bg-zinc-900 text-white">
      <DialogHeader>
        <DialogTitle className="text-2xl text-orange-500">
          Edit Trainer
        </DialogTitle>
      </DialogHeader>

      {loading ? (
        <p className="text-center text-zinc-400 py-10">
          Loading trainer details...
        </p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 space-y-4 overflow-y-auto max-h-[70vh] pr-2"
        >
          {/* READ ONLY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input
                disabled
                value={trainer.email}
                placeholder="Trainer email"
                className="mt-1 border-zinc-800 bg-black text-white"
              />
            </div>

            <div>
              <Label>Gym ID</Label>
              <Input
                disabled
                value={trainer.gymId}
                placeholder="Gym ID"
                className="mt-1 border-zinc-800 bg-black text-white"
              />
              {errors.gymId && (
                <p className="text-red-500 text-xs">
                  {errors.gymId.message}
                </p>
              )}
            </div>
          </div>

          {/* BASIC INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name *</Label>
              <Input
                placeholder="Enter full name"
                {...register("name")}
                className="mt-1 border-zinc-800 bg-black text-white"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label>Phone *</Label>
              <Input
                placeholder="Enter phone number"
                {...register("phone")}
                className="mt-1 border-zinc-800 bg-black text-white"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label>Address</Label>
            <Textarea
              placeholder="Enter address"
              {...register("address")}
              className="mt-1 border-zinc-800 bg-black text-white"
            />
            {errors.address && (
              <p className="text-red-500 text-xs">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* SPECIALIZATION */}
          <div>
            <Label>Specializations</Label>
            <div className="mt-1 flex gap-2">
              <Input
                placeholder="Enter specialization"
                value={newSpec}
                onChange={(e) => setNewSpec(e.target.value)}
                className="border-zinc-800 bg-black text-white"
              />
              <Button
                type="button"
                onClick={addSpecialization}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Add
              </Button>
            </div>

            {errors.specialization && (
              <p className="text-red-500 text-xs mt-1">
                {errors.specialization.message}
              </p>
            )}

            <div className="mt-2 flex flex-wrap gap-2">
              {specializations.map((spec) => (
                <span
                  key={spec}
                  className="flex items-center gap-2 rounded-md border border-zinc-800 bg-black px-3 py-1 text-sm text-white"
                >
                  {spec}
                  <X
                    className="h-3 w-3 cursor-pointer text-zinc-400 hover:text-red-500"
                    onClick={() =>
                      setValue(
                        "specialization",
                        specializations.filter((s) => s !== spec)
                      )
                    }
                  />
                </span>
              ))}
            </div>
          </div>

          {/* FINANCE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Experience (Years)</Label>
              <Input
                type="number"
                placeholder="Enter experience"
                {...register("experience", { valueAsNumber: true })}
                className="border-zinc-800 bg-black text-white"
              />
              {errors.experience && (
                <p className="text-red-500 text-xs">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div>
              <Label>Base Salary</Label>
              <Input
                type="number"
                placeholder="Enter base salary"
                {...register("baseSalary", { valueAsNumber: true })}
                className="border-zinc-800 bg-black text-white"
              />
              {errors.baseSalary && (
                <p className="text-red-500 text-xs">
                  {errors.baseSalary.message}
                </p>
              )}
            </div>

            <div>
              <Label>Commission (%)</Label>
              <Input
                type="number"
                placeholder="Enter commission percentage"
                {...register("commisionRate", { valueAsNumber: true })}
                className="border-zinc-800 bg-black text-white"
              />
              {errors.commisionRate && (
                <p className="text-red-500 text-xs">
                  {errors.commisionRate.message}
                </p>
              )}
            </div>
          </div>

          {/* DUTY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Duty Start Time</Label>
              <Input
                type="time"
                {...register("dutyTime.startTime")}
                className="border-zinc-800 bg-black text-white"
              />
            </div>

            <div>
              <Label>Duty End Time</Label>
              <Input
                type="time"
                {...register("dutyTime.endTime")}
                className="border-zinc-800 bg-black text-white"
              />
              {errors.dutyTime?.endTime && (
                <p className="text-red-500 text-xs">
                  {errors.dutyTime.endTime.message}
                </p>
              )}
            </div>
          </div>

          {/* STATUS & BRANCH */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Status *</Label>
              <select
                {...register("status")}
                className="mt-1 w-full rounded-md border border-zinc-800 bg-black px-3 py-2 text-white"
              >
                <option value="ACTIVE">Active</option>
                <option value="IN_ACTIVE">Inactive</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-xs">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div>
              <Label>Branch *</Label>
              <select
                {...register("branchId")}
                className="mt-1 w-full rounded-md border border-zinc-800 bg-black px-3 py-2 text-white"
              >
                <option value="">Select branch</option>
                {branchData.map(
                  (b: { id: string; branchName: string; address: string }) => (
                    <option key={b.id} value={b.id}>
                      {b.branchName} - {b.address}
                    </option>
                  )
                )}
              </select>
              {errors.branchId && (
                <p className="text-red-500 text-xs">
                  {errors.branchId.message}
                </p>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-zinc-800 text-white hover:bg-zinc-600 bg-black"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              {isPending ? "Updating..." : "Update Trainer"}
            </Button>
          </div>
        </form>
      )}
    </DialogContent>
  </Dialog>
);
}
