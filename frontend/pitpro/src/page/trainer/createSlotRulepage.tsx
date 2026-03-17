import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sidebar } from "@/components/trainer/trainerSidebar";
import { Header } from "@/components/trainer/trainerHeader";
import { toast } from "sonner";
import { z } from "zod";
import { createSlotRuleSchema } from "@/validation/slotRuleValidation";
import { useCreateSlotRule } from "@/hook/trainer/slotRuleHooks";



type FormData = z.infer<typeof createSlotRuleSchema>;

export default function CreateSlotRulePage() {
  const { mutate, isPending } = useCreateSlotRule();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
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
        slots: data.slots,
      },
      {
        onSuccess: () => {
          toast.success("Slot rule created!");
        },
        onError: (err) => {
          toast.error(err.message || "Error creating slot");
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Sidebar />

      <div className="lg:pl-[220px]">
        <Header title="Create Slot Rule" subtitle="Set your availability" avatar="MN" />

        <main className="p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl mx-auto bg-[#1a1a1a] p-6 rounded-lg border border-[#2a2a2a]"
          >
            {/* Start Date */}
            <div className="mb-4">
              <label className="text-gray-400">Start Date</label>
              <input
                type="date"
                {...register("startDate")}
                className="w-full mt-1 p-2 bg-black border border-gray-700 text-white rounded"
              />
              {errors.startDate && (
                <p className="text-red-400 text-sm">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label className="text-gray-400">End Date</label>
              <input
                type="date"
                {...register("endDate")}
                className="w-full mt-1 p-2 bg-black border border-gray-700 text-white rounded"
              />
            </div>

            {/* Slots */}
            <div className="mb-4">
              <h3 className="text-white mb-2">Time Slots</h3>

              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <div className="flex-1">
                    <input
                      type="time"
                      {...register(`slots.${index}.startTime`)}
                      className="w-full p-2 bg-black border border-gray-700 text-white rounded"
                    />
                    {errors.slots?.[index]?.startTime && (
                      <p className="text-red-400 text-sm">
                        {errors.slots[index]?.startTime?.message}
                      </p>
                    )}
                  </div>

                  <div className="flex-1">
                    <input
                      type="time"
                      {...register(`slots.${index}.endTime`)}
                      className="w-full p-2 bg-black border border-gray-700 text-white rounded"
                    />
                    {errors.slots?.[index]?.endTime && (
                      <p className="text-red-400 text-sm">
                        {errors.slots[index]?.endTime?.message}
                      </p>
                    )}
                  </div>

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-400"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={() => append({ startTime: "", endTime: "" })}
                className="text-purple-400 mt-2"
              >
                + Add Slot
              </button>

              {errors.slots && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.slots.message as string}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded text-white"
            >
              {isPending ? "Creating..." : "Create Slot Rule"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
