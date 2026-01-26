import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  memberSignupSchema,
  MemberSignupFormData,
} from "@/validation/addMemberValidation";
import { FitnessGoal } from "@/constants/fitnessGoal";

interface AddMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddMemberModal({ open, onOpenChange }: AddMemberModalProps) {
  const { mutate: addMember, isPending: isAdding } = useCreateMember();
  const { data: branchesData, isLoading: loadingBranches } =
    useListActiveBranch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MemberSignupFormData>({
    resolver: zodResolver(memberSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      branchId: "",
      address: "",
      dateOfBirth: "",
      gender: "MALE",
      emergencyContact: "",
      height: 0,
      weight: 0,
      targetWeight: 0,
      fitnessGoal: "",
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

  const onSubmit = (data: MemberSignupFormData) => {
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
        height: data.height,
        weight: data.weight,
        targetWeight: data.targetWeight,
        fitnessGoal: data.fitnessGoal,
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
              <div className="flex flex-col space-y-1">
                <Label>Name</Label>
                <Input
                  {...register("name")}
                  placeholder="Enter name"
                  className="bg-[#1a1a1a] border-[#2a2a2a]"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <Label>Email</Label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Enter email"
                  className="bg-[#1a1a1a] border-[#2a2a2a]"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <Label>Phone</Label>
                <Input
                  {...register("phone")}
                  type="tel"
                  placeholder="Enter phone number"
                  className="bg-[#1a1a1a] border-[#2a2a2a]"
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <Label>Date of Birth</Label>
                <Input
                  {...register("dateOfBirth")}
                  type="date"
                  className="bg-[#1a1a1a] border-[#2a2a2a]"
                />
                {errors.dateOfBirth && (
                  <span className="text-red-500 text-sm">
                    {errors.dateOfBirth.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <Label>Gender</Label>
                <Select
                  value={watch("gender")}
                  onValueChange={(val) => setValue("gender", val)}
                >
                  {" "}
                  <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    {" "}
                    <SelectValue placeholder="Gender" />{" "}
                  </SelectTrigger>{" "}
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    {" "}
                    <SelectItem value="MALE">Male</SelectItem>{" "}
                    <SelectItem value="FEMALE">Female</SelectItem>{" "}
                    <SelectItem value="OTHER">Other</SelectItem>{" "}
                  </SelectContent>{" "}
                </Select>
                {errors.gender && (
                  <span className="text-red-500 text-sm">
                    {errors.gender.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <Label>Emergency Contact</Label>
                <Input
                  {...register("emergencyContact")}
                  type="tel"
                  placeholder="Emergency phone number"
                  className="bg-[#1a1a1a] border-[#2a2a2a]"
                />
                {errors.emergencyContact && (
                  <span className="text-red-500 text-sm">
                    {errors.emergencyContact.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <Label>Address</Label>
              <Textarea
                {...register("address")}
                placeholder="Enter address"
                className="bg-[#1a1a1a] border-[#2a2a2a] min-h-[80px]"
              />
              {errors.address && (
                <span className="text-red-500 text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>

          {/* HEALTH DETAILS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-400 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-orange-400" />
              Health Details
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col space-y-1">
                <Label>Height (cm)</Label>
                <Input
                  {...register("height", { valueAsNumber: true })}
                  type="number"
                  placeholder="Height (cm)"
                  className="bg-[#1a1a1a] border-[#2a2a2a]"
                />
                {errors.height && (
                  <span className="text-red-500 text-sm">
                    {errors.height.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <Label>Weight (kg)</Label>
                <Input
                  {...register("weight", { valueAsNumber: true })}
                  type="number"
                  placeholder="Weight (kg)"
                  className="bg-[#1a1a1a] border-[#2a2a2a]"
                />
                {errors.weight && (
                  <span className="text-red-500 text-sm">
                    {errors.weight.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <Label>Target Weight</Label>
                <Input
                  {...register("targetWeight", { valueAsNumber: true })}
                  type="number"
                  placeholder="Target Weight"
                  className="bg-[#1a1a1a] border-[#2a2a2a]"
                />
                {errors.targetWeight && (
                  <span className="text-red-500 text-sm">
                    {errors.targetWeight.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <Label>Fitness Goal</Label>
                <Select
                  value={watch("fitnessGoal")}
                  onValueChange={(val) =>
                    setValue("fitnessGoal", val as FitnessGoal)
                  }
                >
                  <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectValue placeholder="Select fitness goal" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    {Object.values(FitnessGoal).map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal.charAt(0).toUpperCase() + goal.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.fitnessGoal && (
                  <span className="text-red-500 text-sm">
                    {errors.fitnessGoal.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* TRAINER & BRANCH */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label>Assigned Trainer</Label>
              <Select
                value={watch("trainerId")}
                onValueChange={(val) => setValue("trainerId", val)}
                disabled={!selectedBranchId}
              >
                <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <SelectValue
                    placeholder={
                      selectedBranchId
                        ? "Select trainer"
                        : "Select branch first"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                  {trainers.length === 0 ? (
                    <SelectItem value="none" disabled>
                      No trainers found
                    </SelectItem>
                  ) : (
                    trainers.map((t: { id: string; name: string }) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {errors.trainerId && (
                <span className="text-red-500 text-sm">
                  {errors.trainerId.message}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <Label>Branch</Label>
              <Select
                value={watch("branchId")}
                onValueChange={(val) => setValue("branchId", val)}
              >
                <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                  {branches.map(
                    (b: {
                      id: string;
                      branchName: string;
                      address: string;
                    }) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.branchName} - {b.address}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              {errors.branchId && (
                <span className="text-red-500 text-sm">
                  {errors.branchId.message}
                </span>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-[#2a2a2a] bg-gray-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-orange-600"
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
