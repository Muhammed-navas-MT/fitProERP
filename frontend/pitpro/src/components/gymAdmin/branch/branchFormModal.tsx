import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ICreateBranchType } from "@/types/gymAdmin/createBranchType"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BranchFormData, branchSchema } from "@/validation/branchValidation"

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: "add" | "edit"
  initialData?: BranchFormData
  onSubmit: (data: ICreateBranchType) => void
  loading: boolean
}

const EMPTY_FORM: BranchFormData = {
  branchName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  openTime: "",
  closeTime: "",
}

export function BranchFormModal({
  open,
  onOpenChange,
  mode,
  initialData,
  onSubmit,
  loading,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: EMPTY_FORM,
  })
  
  useEffect(() => {
    if (!open) {
      reset(EMPTY_FORM)
      return
    }

    if (mode === "edit" && initialData) {
      reset(initialData)
      return
    }

    if (mode === "add") {
      reset(EMPTY_FORM)
    }
  }, [open, mode, initialData, reset])

  const submitHandler = (data: BranchFormData) => {
    const payload: ICreateBranchType = {
      branchName: data.branchName,
      phone: data.phone,
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        pincode: data.pincode,
      },
      openTime: data.openTime,
      closeTime: data.closeTime,
    }

    onSubmit(payload)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black text-white border-none max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-orange-500 text-xl">
            {mode === "add" ? "Add Branch" : "Edit Branch"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <Input placeholder="Branch Name" {...register("branchName")} />
          {errors.branchName && (
            <p className="text-sm text-red-500">
              {errors.branchName.message}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Phone" {...register("phone")} />
            <Input placeholder="Pincode" {...register("pincode")} />
          </div>

          <Input placeholder="Street Address" {...register("street")} />

          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="City" {...register("city")} />
            <Input placeholder="State" {...register("state")} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Country" {...register("country")} />
            <div className="grid grid-cols-2 gap-2">
              <Input type="time" {...register("openTime")} />
              <Input type="time" {...register("closeTime")} />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-black font-semibold"
          >
            {loading
              ? "Saving..."
              : mode === "add"
              ? "Add Branch"
              : "Update Branch"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
