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
import { useNavigate } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";

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

  const navigate = useNavigate();
  const selectedBranchId = watch("branchId");

  const { data: trainersData, isLoading: loadingTrainers } =
    useGetAllActiveTrainers(selectedBranchId);

  const trainers = trainersData?.data ?? [];
  const branches = branchesData?.data?.branches ?? [];

  const hasBranches = branches.length > 0;

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
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-[#2a2a2a] bg-[#0f0f0f] text-white">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-2xl font-bold text-transparent">
              Add New Member
            </DialogTitle>
          </DialogHeader>

          <AddMemberFormSkeleton />
        </DialogContent>
      </Dialog>
    );
  }

  if (!hasBranches) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-[#2a2a2a] bg-[#0f0f0f] text-white">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-orange-600 to-orange-600 bg-clip-text text-2xl font-bold text-transparent">
              Add New Member
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6 flex flex-col items-center justify-center gap-4 text-center">
            {!hasBranches && (
              <div className="w-full rounded-lg border border-orange-500/20 bg-orange-500/10 p-4">
                <p className="text-sm text-orange-400">
                  After creating a branch, you can add a member.
                </p>
                <Button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    navigate(`${FRONTEND_ROUTES.GYM_ADMIN.BASE}/${ FRONTEND_ROUTES.GYM_ADMIN.LIST_BRANCH}`);
                  }}
                  className="mt-3 bg-orange-500 text-black hover:bg-orange-600"
                >
                  Create Branch
                </Button>
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="mt-2 border-[#2a2a2a] bg-transparent text-white hover:bg-[#1a1a1a]"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-[#2a2a2a] bg-[#0f0f0f] text-white">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-r from-orange-400 to-orange-400 bg-clip-text text-2xl font-bold text-transparent">
            Add New Member
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-6">
          {/* PERSONAL DETAILS */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-orange-400">
              <span className="h-1 w-1 rounded-full bg-orange-400" />
              Personal Details
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col space-y-1">
                <Label>Name</Label>
                <Input
                  {...register("name")}
                  placeholder="Enter name"
                  className="border-[#2a2a2a] bg-[#1a1a1a]"
                />
                {errors.name && (
                  <span className="text-sm text-red-500">
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
                  className="border-[#2a2a2a] bg-[#1a1a1a]"
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
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
                  className="border-[#2a2a2a] bg-[#1a1a1a]"
                />
                {errors.phone && (
                  <span className="text-sm text-red-500">
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-1">
                <Label>Date of Birth</Label>
                <Input
                  {...register("dateOfBirth")}
                  type="date"
                  className="border-[#2a2a2a] bg-[#1a1a1a]"
                />
                {errors.dateOfBirth && (
                  <span className="text-sm text-red-500">
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
                  <SelectTrigger className="border-[#2a2a2a] bg-[#1a1a1a] text-white">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent className="border-[#2a2a2a] bg-[#1a1a1a] text-white">
                    <SelectItem value="MALE">Male</SelectItem>
                    <SelectItem value="FEMALE">Female</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <span className="text-sm text-red-500">
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
                  className="border-[#2a2a2a] bg-[#1a1a1a]"
                />
                {errors.emergencyContact && (
                  <span className="text-sm text-red-500">
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
                className="min-h-[80px] border-[#2a2a2a] bg-[#1a1a1a]"
              />
              {errors.address && (
                <span className="text-sm text-red-500">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>

          {/* HEALTH DETAILS */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-orange-400">
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
                  className="border-[#2a2a2a] bg-[#1a1a1a]"
                />
                {errors.height && (
                  <span className="text-sm text-red-500">
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
                  className="border-[#2a2a2a] bg-[#1a1a1a]"
                />
                {errors.weight && (
                  <span className="text-sm text-red-500">
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
                  className="border-[#2a2a2a] bg-[#1a1a1a]"
                />
                {errors.targetWeight && (
                  <span className="text-sm text-red-500">
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
                  <SelectTrigger className="border-[#2a2a2a] bg-[#1a1a1a]">
                    <SelectValue placeholder="Select fitness goal" />
                  </SelectTrigger>
                  <SelectContent className="border-[#2a2a2a] bg-[#1a1a1a] text-white">
                    {Object.values(FitnessGoal).map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal.charAt(0).toUpperCase() + goal.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.fitnessGoal && (
                  <span className="text-sm text-red-500">
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
                <SelectTrigger className="border-[#2a2a2a] bg-[#1a1a1a]">
                  <SelectValue
                    placeholder={
                      selectedBranchId
                        ? "Select trainer"
                        : "Select branch first"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="border-[#2a2a2a] bg-[#1a1a1a]">
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
                <span className="text-sm text-red-500">
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
                <SelectTrigger className="border-[#2a2a2a] bg-[#1a1a1a]">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent className="border-[#2a2a2a] bg-[#1a1a1a]">
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
                <span className="text-sm text-red-500">
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