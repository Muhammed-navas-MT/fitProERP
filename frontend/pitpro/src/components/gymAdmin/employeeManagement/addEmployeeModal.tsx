import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trainerSignupSchema } from "@/validation/trainerAddSchema";
import type { TrainerFormData } from "@/validation/trainerAddSchema";
import { useAddTrainer } from "@/hook/gymAdmin/trainerManagementHook";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { rootstate } from "@/store/store";
import { TrainerAddPayload } from "@/types/authPayload";

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddEmployeeDialog({
  open,
  onOpenChange,
}: AddEmployeeDialogProps) {
  const { mutate: addTrainer, isPending } = useAddTrainer();
  const [newSpec, setNewSpec] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TrainerFormData>({
    resolver: zodResolver(trainerSignupSchema),
    defaultValues: {
      specialization: [],
      dutyTime: {
        startTime: "",
        endTime: "",
      },
      status: "ACTIVE",
    },
  });

  const gymAdminData = useSelector((state: rootstate) => state.gymAdminData);
  const gymId = gymAdminData?._id;

  const specializations = watch("specialization", []);
  const startTime = watch("dutyTime.startTime");
  const endTime = watch("dutyTime.endTime");

  const formatTime = (time?: string) => {
    if (!time) return "";
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "PM" : "AM";
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, "0")} ${period}`;
  };

  const addSpecialization = () => {
    if (!newSpec.trim()) return;
    if (specializations.includes(newSpec.trim())) return;

    setValue("specialization", [...specializations, newSpec.trim()], {
      shouldValidate: true,
    });
    setNewSpec("");
  };

  const removeSpecialization = (spec: string) => {
    setValue(
      "specialization",
      specializations.filter((s) => s !== spec),
      { shouldValidate: true }
    );
  };

  const onSubmit = (data: TrainerFormData) => {
    if (!gymId) {
      toast.error("Gym not loaded yet");
      return;
    }

    const payload: TrainerAddPayload = {
      ...data,
      gymId,
      role: "TRAINER",
    };

    addTrainer(payload, {
      onSuccess: (res) => {
        toast.success(res.message);
        reset();
        onOpenChange(false);
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-zinc-800 bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-orange-500">
            Add New Employee
          </DialogTitle>
          <DialogDescription className="sr-only">
            Add new trainer details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(
          onSubmit,
          (err)=>console.log(err)
        )} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Name *</Label>
              <Input
                {...register("name")}
                className="mt-1 border-zinc-800 bg-black text-white"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label className="text-white">Email *</Label>
              <Input
                type="email"
                {...register("email")}
                className="mt-1 border-zinc-800 bg-black text-white"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label className="text-white">Phone *</Label>
            <Input
              {...register("phone")}
              className="mt-1 border-zinc-800 bg-black text-white"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label className="text-white">Address</Label>
            <Textarea
              {...register("address")}
              className="mt-1 min-h-[80px] border-zinc-800 bg-black text-white"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div>
            <Label className="text-white">Specializations</Label>
            <div className="mt-1 flex gap-2">
              <Input
                value={newSpec}
                onChange={(e) => setNewSpec(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSpecialization();
                  }
                }}
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
              <p className="text-red-500 text-sm">
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
                  <button
                    type="button"
                    onClick={() => removeSpecialization(spec)}
                    className="text-zinc-400 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                type="number"
                placeholder="Experience"
                {...register("experience", { valueAsNumber: true })}
                className="border-zinc-800 bg-black text-white"
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="number"
                placeholder="Base Salary"
                {...register("baseSalary", { valueAsNumber: true })}
                className="border-zinc-800 bg-black text-white"
              />
              {errors.baseSalary && (
                <p className="text-red-500 text-sm">
                  {errors.baseSalary.message}
                </p>
              )}
            </div>

            <div>
              <Input
                type="number"
                placeholder="Commission %"
                {...register("commisionRate", { valueAsNumber: true })}
                className="border-zinc-800 bg-black text-white"
              />
              {errors.commisionRate && (
                <p className="text-red-500 text-sm">
                  {errors.commisionRate.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                type="time"
                {...register("dutyTime.startTime")}
                className="border-zinc-800 bg-black text-white"
              />
              {startTime && (
                <p className="text-xs text-zinc-400">{formatTime(startTime)}</p>
              )}
            </div>

            <div>
              <Input
                type="time"
                {...register("dutyTime.endTime")}
                className="border-zinc-800 bg-black text-white"
              />
              {endTime && (
                <p className="text-xs text-zinc-400">{formatTime(endTime)}</p>
              )}
              {errors.dutyTime?.endTime && (
                <p className="text-red-500 text-sm">
                  {errors.dutyTime.endTime.message}
                </p>
              )}
            </div>
          </div>

          <select
            {...register("status")}
            className="mt-1 w-full rounded-md border border-zinc-800 bg-black px-3 py-2 text-white"
          >
            <option value="ACTIVE">Active</option>
            <option value="IN_ACTIVE">Inactive</option>
          </select>

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
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              {isPending ? "Creating..." : "Add Employee"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
