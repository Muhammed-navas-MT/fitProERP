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
import { useCreateMember } from "@/hook/gymAdmin/memberHooks";
import { useListActiveBranch } from "@/hook/gymAdmin/branchHooks";
import { MemberAddPayload } from "@/types/authPayload";
import { toast } from "sonner";
import { useGetAllActiveTrainers } from "@/hook/gymAdmin/trainerManagementHook";
import { useEffect } from "react";
import { AddMemberFormSkeleton } from "./addMemberFormSkeleton";

interface AddMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
  medicalConditions: string;
  fitnessGoal: string;
  allergies: string;
  trainerId: string;
}

export function AddMemberModal({ open, onOpenChange }: AddMemberModalProps) {
  const { mutate: addMember, isPending: isAdding } = useCreateMember();
  const { data: branchesData, isLoading: loadingBranches } = useListActiveBranch();

  const { register, handleSubmit, setValue, watch, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      branchId: "",
      address: "",
      dateOfBirth: "",
      gender: "",
      emergencyContact: "",
      height: "",
      weight: "",
      targetWeight: "",
      fitnessGoal: "",
      medicalConditions: "",
      allergies: "",
      trainerId: "",
    },
  });

  const selectedBranchId = watch("branchId");

  const { data: trainersData, isLoading: loadingTrainers } =
    useGetAllActiveTrainers(selectedBranchId);

  const trainers = trainersData?.data ?? [];
  const branches = branchesData?.data?.branches ?? [];

  useEffect(() => {
    setValue("trainerId", "");
  }, [selectedBranchId, setValue]);

  const onSubmit = (data: FormData) => {
    const payload: MemberAddPayload = {
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

    addMember(payload, {
      onSuccess: () => {
        toast.success("Member created successfully");
        reset();
        onOpenChange(false);
      },
      onError: (err) => toast.error(err.message),
    });
  };

  if (loadingTrainers || loadingBranches) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f0f0f] border-[#2a2a2a] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-400">
            Add New Member
          </DialogTitle>
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
          <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-400">
            Add New Member
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* PERSONAL DETAILS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-orange-400" />
              Personal Details
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <Input {...register("name", { required: true })} placeholder="Name" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              <Input {...register("email", { required: true })} type="email" placeholder="Email" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              <Input {...register("phone", { required: true })} type="tel" placeholder="Phone" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              <Input {...register("dateOfBirth", { required: true })} type="date" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />

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

              <Input {...register("emergencyContact", { required: true })} type="tel" placeholder="Emergency Contact" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
            </div>

            <Textarea {...register("address", { required: true })} placeholder="Address" className="bg-[#1a1a1a] border-[#2a2a2a] text-white min-h-[80px]" />
          </div>

          {/* HEALTH DETAILS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-orange-400" />
              Health Details
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <Input {...register("height", { required: true })} type="number" placeholder="Height (cm)" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              <Input {...register("weight", { required: true })} type="number" placeholder="Weight (kg)" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              <Input {...register("targetWeight", { required: true })} type="number" placeholder="Target Weight" className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />

              <Select value={watch("fitnessGoal")} onValueChange={(val) => setValue("fitnessGoal", val)}>
                <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Fitness Goal" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                  <SelectItem value="general-fitness">General Fitness</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                </SelectContent>
              </Select>
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
              {isAdding ? "Creating..." : "Add Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
