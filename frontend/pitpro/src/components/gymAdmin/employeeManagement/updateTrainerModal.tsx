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

  const inputClass =
    "bg-black text-white border border-orange-500 focus:border-orange-400 focus:ring-orange-500"

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
    <Dialog open={open} onOpenChange={(e) => {
  console.log(e)
  onOpenChange(e)
}}>
      <DialogContent className="bg-black text-white border-zinc-800 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-orange-500 text-xl">
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
            className="space-y-5 max-h-[70vh] overflow-y-auto pr-2"
          >
            {/* READ ONLY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input disabled value={trainer.email} className={inputClass} />
              </div>

              <div>
                <Label>Gym ID</Label>
                <Input disabled value={trainer.gymId} className={inputClass} />
              </div>
            </div>

            {/* BASIC INFO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input {...register("name")} className={inputClass} />
                {errors.name && (
                  <p className="text-red-500 text-xs">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label>Phone</Label>
                <Input {...register("phone")} className={inputClass} />
              </div>
            </div>

            <div>
              <Label>Address</Label>
              <Textarea {...register("address")} className={inputClass} />
            </div>

            {/* SPECIALIZATION */}
            <div>
              <Label>Specializations</Label>
              <div className="flex gap-2">
                <Input
                  value={newSpec}
                  onChange={(e) => setNewSpec(e.target.value)}
                  className={inputClass}
                />
                <Button type="button" onClick={addSpecialization}>
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {specializations.map((spec) => (
                  <span
                    key={spec}
                    className="bg-zinc-900 px-3 py-1 rounded flex items-center gap-2"
                  >
                    {spec}
                    <X
                      className="h-3 w-3 cursor-pointer"
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
              <Input
                type="number"
                placeholder="Experience"
                {...register("experience", { valueAsNumber: true })}
                className={inputClass}
              />
              <Input
                type="number"
                placeholder="Base Salary"
                {...register("baseSalary", { valueAsNumber: true })}
                className={inputClass}
              />
              <Input
                type="number"
                placeholder="Commission %"
                {...register("commisionRate", { valueAsNumber: true })}
                className={inputClass}
              />
            </div>

            {/* DUTY */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="time"
                {...register("dutyTime.startTime")}
                className={inputClass}
              />
              <Input
                type="time"
                {...register("dutyTime.endTime")}
                className={inputClass}
              />
            </div>

            {/* STATUS & BRANCH */}
            <div className="grid grid-cols-2 gap-4">
              <select {...register("status")} className={`${inputClass} p-2 rounded`}>
                <option value="ACTIVE">Active</option>
                <option value="IN_ACTIVE">Inactive</option>
              </select>

              <select {...register("branchId")} className={`${inputClass} p-2 rounded`}>
                <option value="">Select Branch</option>
                {branchData.map((b:{id:string,branchName:string,address:string}) => (
                  <option key={b.id} value={b.id}>
                    {b.branchName} - {b.address}
                  </option>
                ))}
              </select>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update Trainer"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
