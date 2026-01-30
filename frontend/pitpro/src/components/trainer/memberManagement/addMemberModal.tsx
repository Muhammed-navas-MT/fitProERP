import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAddMember } from "@/hook/trainer/memberManagementHook"
import { useGetAllActiveTrainers } from "@/hook/trainer/memberManagementHook"
import { MemberAddPayload } from "@/types/authPayload"
import { toast } from "sonner"

interface AddMemberModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  search:string
  page:number
}

interface FormData {
  name: string
  branchId:string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  gender: string
  emergencyContact: string
  height: string
  weight: string
  targetWeight: string
  medicalConditions: string
  fitnessGoal: string
  allergies: string
  trainerId: string
}

export function AddMemberModal({ open, onOpenChange,search,page }: AddMemberModalProps) {
  const { mutate: addMember, isPending } = useAddMember(page,search)
  const { data, isLoading } = useGetAllActiveTrainers()
  const trainers = data?.data ??[]

  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      branchId:"",
      address: "",
      dateOfBirth: "",
      gender: "",
      emergencyContact: "",
      height: "",
      weight: "",
      targetWeight: "",
      medicalConditions: "",
      fitnessGoal: "",
      allergies: "",
      trainerId: "",
    },
  })

  const onSubmit = (data: FormData) => {
    const payload: MemberAddPayload = {
      trainerId: data.trainerId,
      name: data.name,
      email: data.email,
      branchId:data.branchId,
      phone: data.phone,
      address: data.address,
      emergencyNumber: data.emergencyContact,
      healthDetails: {
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        height: Number(data.height),
        weight: Number(data.weight),
        targetWeight: Number(data.targetWeight),
        fitnessGoal: data.fitnessGoal,
        allergies: data.allergies,
        medicalConditions: data.medicalConditions,
      },
    }

    addMember(payload, {
      onSuccess: (res) => {
        toast.success(res.message || "Member created successfully....")
        reset()
        onOpenChange(false)
      },
      onError: (err) => {
        toast.error(err.message)
      },
    })
  }

  if (isLoading) return <p>Loading...</p>
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f0f0f] border-[#2a2a2a] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Add New Member
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* Personal Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-purple-400" />
              Personal Details
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-gray-300">Name</Label>
                <Input
                  {...register("name", { required: true })}
                  placeholder="Enter full name"
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Email</Label>
                <Input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email@example.com"
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Phone</Label>
                <Input
                  type="tel"
                  {...register("phone", { required: true })}
                  placeholder="Enter phone number"
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Date of Birth</Label>
                <Input
                  type="date"
                  {...register("dateOfBirth", { required: true })}
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Gender</Label>
                <Select
                  value={watch("gender")}
                  onValueChange={(value) => setValue("gender", value)}
                >
                  <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Emergency Contact</Label>
                <Input
                  type="tel"
                  {...register("emergencyContact", { required: true })}
                  placeholder="Emergency contact number"
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Address</Label>
              <Textarea
                {...register("address", { required: true })}
                placeholder="Enter full address"
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500 min-h-[80px]"
              />
            </div>
          </div>

          {/* Health Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-blue-400" />
              Health Details
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <Input {...register("height", { required: true })} type="number" placeholder="Height (cm)" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              <Input {...register("weight", { required: true })} type="number" placeholder="Weight (kg)" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />

              <Select
                value={watch("fitnessGoal")}
                onValueChange={(value) => setValue("fitnessGoal", value)}
              >
                <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Select fitness goal" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                  <SelectItem value="general-fitness">General Fitness</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                </SelectContent>
              </Select>

              <Input {...register("targetWeight", { required: true })} type="number" placeholder="Target Weight" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
            </div>
          </div>

          {/* Assigned Trainer */}
          <div className="space-y-2">
            <Label className="text-gray-300">Assigned Trainer</Label>
            <Select
              value={watch("trainerId")}
              onValueChange={(value) => setValue("trainerId", value)}
            >
              <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                <SelectValue placeholder="Select a trainer" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                {isLoading ? (
                  <SelectItem value="loading" disabled>
                    Loading trainers...
                  </SelectItem>
                ) : trainers.length === 0 ? (
                  <SelectItem value="no-trainer" disabled>
                    No active trainers found
                  </SelectItem>
                ) : (
                  trainers.map((trainer: { id: string; name: string }) => (
                    <SelectItem key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-transparent border-[#2a2a2a] text-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
              disabled={!watch("trainerId")}
            >
              {isPending ? "Creating..." : "Add Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
