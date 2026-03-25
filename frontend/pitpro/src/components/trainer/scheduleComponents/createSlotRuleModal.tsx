import { useEffect } from "react";
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
import { Switch } from "@/components/ui/switch";

import { createSlotRuleSchema } from "@/validation/slotRuleValidation";
import {
  useCreateSlotRule,
  useFindSlotRule,
  useUpdateSlotRule,
} from "@/hook/trainer/slotRuleHooks";

interface CreateSlotRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = z.infer<typeof createSlotRuleSchema> & {
  isActive: boolean;
};

function formatDateForInput(date?: Date | string) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

export function CreateSlotRuleModal({
  isOpen,
  onClose,
}: CreateSlotRuleModalProps) {
  const { data, isLoading: isFindingRule } = useFindSlotRule();
  const { mutate: createSlotRule, isPending: isCreating } = useCreateSlotRule();
  const { mutate: updateSlotRule, isPending: isUpdating } = useUpdateSlotRule();
  const existingRule = data?.data;

  const isPending = isCreating || isUpdating;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(createSlotRuleSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      isActive: true,
      slots: [{ startTime: "", endTime: "", amount: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "slots",
  });

  const isActive = watch("isActive");

  useEffect(() => {
    if (!isOpen) return;

    if (existingRule) {
      reset({
        startDate: formatDateForInput(existingRule.startDate),
        endDate: existingRule.endDate
          ? formatDateForInput(existingRule.endDate)
          : "",
        isActive: existingRule.isActive,
        slots:
          existingRule.slots.length > 0
            ? existingRule.slots.map(
                (slot: {
                  startTime: string;
                  endTime: string;
                  amount: number;
                }) => ({
                  startTime: slot.startTime,
                  endTime: slot.endTime,
                  amount: slot.amount,
                }),
              )
            : [{ startTime: "", endTime: "", amount: 0 }],
      });
    } else {
      reset({
        startDate: "",
        endDate: "",
        isActive: true,
        slots: [{ startTime: "", endTime: "", amount: 0 }],
      });
    }
  }, [existingRule, isOpen, reset]);

  const onSubmit = (data: FormData) => {
    const payload = {
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      isActive: data.isActive,
      slots: data.slots.map((slot) => ({
        startTime: slot.startTime,
        endTime: slot.endTime,
        amount: slot.amount,
      })),
    };

    if (existingRule?._id) {
      updateSlotRule(
        {
          id: existingRule._id,
          slotRule: payload,
        },
        {
          onSuccess: () => {
            toast.success("Slot rule updated successfully");
            onClose();
          },
          onError: (err: Error) => {
            toast.error(err.message || "Error updating slot rule");
          },
        },
      );
    } else {
      createSlotRule(payload, {
        onSuccess: () => {
          toast.success("Slot rule created successfully");
          reset({
            startDate: "",
            endDate: "",
            isActive: true,
            slots: [{ startTime: "", endTime: "", amount: 0 }],
          });
          onClose();
        },
        onError: (err: Error) => {
          toast.error(err.message || "Error creating slot rule");
        },
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="bg-[#1a1a1a] border border-[#2a2a2a] text-white max-w-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white">
            {existingRule
              ? "Update Availability Rule"
              : "Create Availability Rule"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-400">
            Define recurring time slots for your training sessions.
          </DialogDescription>
        </DialogHeader>

        {isFindingRule ? (
          <div className="py-10 text-center text-sm text-gray-400">
            Loading slot rule...
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Start Date
                </label>
                <Input
                  type="date"
                  {...register("startDate")}
                  className="bg-[#0f0f0f] border-[#2a2a2a] text-white [color-scheme:dark]"
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
                  className="bg-[#0f0f0f] border-[#2a2a2a] text-white [color-scheme:dark]"
                />
                {errors.endDate && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-md border border-[#2a2a2a] bg-[#111] px-3 py-3">
              <div>
                <p className="text-sm text-white">Rule Active</p>
                <p className="text-xs text-gray-400">
                  Enable or disable this availability rule
                </p>
              </div>

              <Switch
                checked={isActive}
                onCheckedChange={(checked) => setValue("isActive", checked)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-400">Time Slots</label>
                <button
                  type="button"
                  onClick={() =>
                    append({ startTime: "", endTime: "", amount: 0 })
                  }
                  className="text-xs flex items-center gap-1 text-purple-400 hover:opacity-80"
                >
                  <Plus className="w-3 h-3" /> Add
                </button>
              </div>

              <div className="space-y-3 max-h-[260px] overflow-y-auto">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-2 border border-[#2a2a2a] rounded-md p-3"
                  >
                    <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-400">
                      <span>Start Time</span>
                      <span>End Time</span>
                      <span>Amount</span>
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

                      <Input
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Amount"
                        {...register(`slots.${index}.amount`, {
                          valueAsNumber: true,
                        })}
                        className="bg-[#0f0f0f] border-[#2a2a2a] text-white"
                      />

                      {fields.length > 1 && (
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => remove(index)}
                          className="text-gray-400 hover:text-red-400 shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        {errors.slots?.[index]?.startTime && (
                          <p className="text-[10px] text-red-400">
                            {errors.slots[index]?.startTime?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        {errors.slots?.[index]?.endTime && (
                          <p className="text-[10px] text-red-400">
                            {errors.slots[index]?.endTime?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        {errors.slots?.[index]?.amount && (
                          <p className="text-[10px] text-red-400">
                            {errors.slots[index]?.amount?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
                {isPending
                  ? existingRule
                    ? "Updating..."
                    : "Saving..."
                  : existingRule
                    ? "Update Rule"
                    : "Save Rule"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
