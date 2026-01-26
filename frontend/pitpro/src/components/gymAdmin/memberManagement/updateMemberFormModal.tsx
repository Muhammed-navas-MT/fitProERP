import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateMember, useFindMember } from "@/hook/gymAdmin/memberHooks";
import { useListActiveBranch } from "@/hook/gymAdmin/branchHooks";
import { toast } from "sonner";
import { useGetAllActiveTrainers } from "@/hook/gymAdmin/trainerManagementHook";
import { useEffect } from "react";
import { AddMemberFormSkeleton } from "./addMemberFormSkeleton";
import { FitnessGoal } from "@/constants/fitnessGoal";

interface UpdateMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberId: string;
}

interface FormData {
  name: string;
  branchId: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  emergencyContact: string;
  height: string;
  weight: string;
  targetWeight: string;
  fitnessGoal: FitnessGoal | "";
  allergies: string;
  medicalConditions: string;
  trainerId: string;
}

export function UpdateMemberModal({ open, onOpenChange, memberId }: UpdateMemberModalProps) {
  const { data: memberData, isLoading: loadingMember } = useFindMember(memberId);
  const { mutate: updateMember, isPending: isUpdating } = useUpdateMember(memberId);
  const { data: branchesData, isLoading: loadingBranches } = useListActiveBranch();

  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      branchId: "",
      trainerId: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      emergencyContact: "",
      height: "",
      weight: "",
      targetWeight: "",
      fitnessGoal: "",
      allergies: "",
      medicalConditions: "",
    },
  });

  const selectedBranchId = watch("branchId");
  const { data: trainersData, isLoading: loadingTrainers } = useGetAllActiveTrainers(selectedBranchId);
  const trainers = trainersData?.data ?? [];
  const branches = branchesData?.data?.branches ?? [];

  // Reset form with member data
  useEffect(() => {
    if (memberData?.data) {
      const m = memberData.data;
      reset({
        name: m.name,
        email: m.email,
        phone: m.phone,
        branchId: m.branchId,
        trainerId: m.trainerId,
        address: m.address,
        dateOfBirth: new Date(m.healthDetails.dateOfBirth).toISOString().split("T")[0],
        gender: m.healthDetails.gender,
        emergencyContact: m.emergencyNumber,
        height: String(m.healthDetails.height.value),
        weight: String(m.healthDetails.weight.value),
        targetWeight: String(m.healthDetails.targetWeight.value),
        fitnessGoal: (Object.values(FitnessGoal).includes(m.healthDetails.fitnessGoal) ? m.healthDetails.fitnessGoal : "") as FitnessGoal,
        allergies: m.healthDetails.allergies,
        medicalConditions: m.healthDetails.medicalConditions,
      });
    }
  }, [memberData, reset]);

  // Reset trainer if branch changes (only for new selection)
  useEffect(() => {
    if (!memberData) {
      setValue("trainerId", "");
    }
  }, [selectedBranchId, setValue, memberData]);

  const onSubmit = (data: FormData) => {
    const payload = {
      trainerId: data.trainerId,
      name: data.name,
      email: data.email,
      branchId: data.branchId,
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
    };

    updateMember(payload, {
      onSuccess: () => {
        toast.success("Member updated successfully");
        onOpenChange(false);
      },
      onError: (err) => toast.error(err.message),
    });
  };

  if (loadingMember || loadingTrainers || loadingBranches) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-[#0f0f0f] border-[#2a2a2a] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-orange-400">Update Member</DialogTitle>
          </DialogHeader>
          <AddMemberFormSkeleton />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f0f0f] border-[#2a2a2a] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-orange-400">Update Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* PERSONAL DETAILS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-orange-400" /> Personal Details
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Label>Name</Label>
                <Input {...register("name", { required: true })} placeholder="Name" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              </div>

              <div className="space-y-1">
                <Label>Email</Label>
                <Input {...register("email", { required: true })} type="email" placeholder="Email" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              </div>

              <div className="space-y-1">
                <Label>Phone</Label>
                <Input {...register("phone", { required: true })} type="tel" placeholder="Phone" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              </div>

              <div className="space-y-1">
                <Label>Date of Birth</Label>
                <Input {...register("dateOfBirth", { required: true })} type="date" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              </div>

              <div className="space-y-1">
                <Label>Gender</Label>
                <Select value={watch("gender")} onValueChange={(val) => setValue("gender", val)}>
                  <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Emergency Contact</Label>
                <Input {...register("emergencyContact", { required: true })} type="tel" placeholder="Emergency Contact" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              </div>

              <div className="space-y-1 md:col-span-2">
                <Label>Address</Label>
                <Textarea {...register("address", { required: true })} placeholder="Address" className="bg-[#1a1a1a] border-[#2a2a2a] text-white min-h-[80px]" />
              </div>
            </div>
          </div>

          {/* HEALTH DETAILS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-orange-400" /> Health Details
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Label>Height (cm)</Label>
                <Input {...register("height", { required: true })} type="number" placeholder="Height (cm)" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              </div>

              <div className="space-y-1">
                <Label>Weight (kg)</Label>
                <Input {...register("weight", { required: true })} type="number" placeholder="Weight (kg)" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              </div>

              <div className="space-y-1">
                <Label>Target Weight</Label>
                <Input {...register("targetWeight", { required: true })} type="number" placeholder="Target Weight" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              </div>

              <div className="space-y-1">
                <Label>Fitness Goal</Label>
                <Select value={watch("fitnessGoal")} onValueChange={(val) => setValue("fitnessGoal", val as FitnessGoal)}>
                  <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Fitness Goal" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    {Object.values(FitnessGoal).map((goal) => (
                      <SelectItem key={goal} value={goal}>{goal}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* TRAINER & BRANCH */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Assigned Trainer</Label>
              <Select
                value={watch("trainerId")}
                onValueChange={(val) => setValue("trainerId", val)}
                disabled={!selectedBranchId}
              >
                <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectValue placeholder={selectedBranchId ? "Select Trainer" : "Select branch first"} />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  {trainers.length === 0 ? (
                    <SelectItem value="no-trainer" disabled>No trainers found</SelectItem>
                  ) : (
                    trainers.map((t: { id: string; name: string }) => (
                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Branch</Label>
              <Select value={watch("branchId")} onValueChange={(val) => setValue("branchId", val)}>
                <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  {branches.map((b: { id: string; branchName: string; address: string }) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.branchName} - {b.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1 bg-transparent border-[#2a2a2a] text-gray-300">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-600 to-orange-600 text-white"
              disabled={!watch("trainerId") || !watch("branchId")}
            >
              {isUpdating ? "Updating..." : "Update Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
