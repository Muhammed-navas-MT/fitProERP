import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
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
    watch,
    setValue,
    formState: { errors },
  } = useForm<BranchFormData>({
    resolver: zodResolver(branchSchema),
    defaultValues: EMPTY_FORM,
  })

  const pincode = watch("pincode")

  useEffect(() => {
  if (pincode.length === 6) {
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then((res) => res.json())
      .then((data) => {
        if (data[0].Status === "Success" && data[0].PostOffice?.length > 0) {
          const postOffice = data[0].PostOffice[0];
          
          setValue("city", postOffice.District || "");
          setValue("state", postOffice.State || "");
          setValue("country", postOffice.Country || "");
        }
      })
      .catch((err) => console.log("Pincode lookup error:", err))
  }
}, [pincode, setValue]);

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
          <div>
            <Label>Branch Name</Label>
            <Input placeholder="Branch Name" {...register("branchName")} />
            {errors.branchName && (
              <p className="text-sm text-red-500">
                {errors.branchName.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Phone</Label>
              <Input placeholder="Phone" {...register("phone")} />
              {errors.phone && (
              <p className="text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
            </div>

            <div>
              <Label>Pincode</Label>
              <Input placeholder="Pincode" {...register("pincode")} />
              {errors.pincode && (
              <p className="text-sm text-red-500">
                {errors.pincode.message}
              </p>
            )}
            </div>
          </div>

          <div>
            <Label>Street Address</Label>
            <Input placeholder="Street Address" {...register("street")} />
            {errors.street && (
              <p className="text-sm text-red-500">
                {errors.street.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>City</Label>
              <Input placeholder="City" {...register("city")} />
              {errors.city && (
              <p className="text-sm text-red-500">
                {errors.city.message}
              </p>
            )}
            </div>

            <div>
              <Label>State</Label>
              <Input placeholder="State" {...register("state")} />
              {errors.state && (
              <p className="text-sm text-red-500">
                {errors.state.message}
              </p>
            )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Country</Label>
              <Input placeholder="Country" {...register("country")} />
              {errors.country && (
              <p className="text-sm text-red-500">
                {errors.country.message}
              </p>
            )}
            </div>

            <div>
              <Label>Working Hours</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" {...register("openTime")} />
                {errors.openTime && (
              <p className="text-sm text-red-500">
                {errors.openTime.message}
              </p>
            )}
                <Input type="time" {...register("closeTime")} />
                {errors.closeTime && (
              <p className="text-sm text-red-500">
                {errors.closeTime.message}
              </p>
            )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-black hover:bg-orange-500 font-semibold"
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
