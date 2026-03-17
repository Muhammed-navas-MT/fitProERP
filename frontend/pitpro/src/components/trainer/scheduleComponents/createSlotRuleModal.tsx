import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSlotRuleSchema } from "@/validation/slotRuleValidation";
import { useCreateSlotRule } from "@/hook/trainer/slotRuleHooks";

interface CreateSlotRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = z.infer<typeof createSlotRuleSchema>;

export function CreateSlotRuleModal({
  isOpen,
  onClose,
}: CreateSlotRuleModalProps) {
  const { mutate, isPending } = useCreateSlotRule();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(createSlotRuleSchema),
    defaultValues: {
      slots: [{ startTime: "", endTime: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "slots",
  });

  const onSubmit = (data: FormData) => {
    mutate(
      {
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        slots: data.slots.map((s) => ({
          startTime: s.startTime!,
          endTime: s.endTime!,
        })),
      },
      {
        onSuccess: () => {
          toast.success("Slot rule created successfully");
          reset();
          onClose();
        },
        onError: (err) => {
          toast.error(err.message || "Error creating slot");
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1a1a] border border-[#2a2a2a] text-white max-w-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white">
            Create Availability Rule
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-400">
            Define recurring time slots for your training sessions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Start Date
              </label>
              <Input
                type="date"
                {...register("startDate")}
                className="bg-[#0f0f0f] border-[#2a2a2a] text-white 
             [color-scheme:dark]"
              />
              {errors.startDate && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                End Date (Optional)
              </label>
              <Input
                type="date"
                {...register("endDate")}
                className="bg-[#0f0f0f] border-[#2a2a2a] text-white 
             [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Slots */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs text-gray-400">Time Slots</label>
              <button
                type="button"
                onClick={() => append({ startTime: "", endTime: "" })}
                className="text-xs flex items-center gap-1 text-purple-400 hover:opacity-80"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>

            <div className="space-y-3 max-h-[220px] overflow-y-auto">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-1">
                  {/* Labels */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-400">
                    <span>Start Time</span>
                    <span>End Time</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Input
                      type="time"
                      step="60"
                      lang="en-GB"
                      {...register(`slots.${index}.startTime`)}
                      className="bg-[#0f0f0f] border-[#2a2a2a] text-white [color-scheme:dark]"
                    />

                    <Input
                      type="time"
                      step="60"
                      lang="en-GB"
                      {...register(`slots.${index}.endTime`)}
                      className="bg-[#0f0f0f] border-[#2a2a2a] text-white [color-scheme:dark]"
                    />

                    {fields.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => remove(index)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Errors */}
                  <div className="grid grid-cols-2 gap-2">
                    {errors.slots?.[index]?.startTime && (
                      <p className="text-[10px] text-red-400">
                        {errors.slots[index]?.startTime?.message}
                      </p>
                    )}
                    {errors.slots?.[index]?.endTime && (
                      <p className="text-[10px] text-red-400">
                        {errors.slots[index]?.endTime?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#2a2a2a] hover:bg-[#333] text-white"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
            >
              {isPending ? "Saving..." : "Save Rule"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
