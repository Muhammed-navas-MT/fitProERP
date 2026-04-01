import { useEffect, useState } from "react";
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
import { Scale, Activity, FileText, Dumbbell } from "lucide-react";
import { ICreateProgressType } from "@/types/member/progressTypes";
import {
  createProgressSchema,
  CreateProgressSchemaType,
} from "@/validation/progressZodSchema";
import { useCreateProgress } from "@/hook/member/progressHook";
import { toast } from "sonner";

interface CreateProgressModalProps {
  page:number,
  isOpen:boolean
  onClose:()=>void
}

const defaultValues: CreateProgressSchemaType = {
  weight: {
    value: 0,
    unit: "kg",
  },
  bodyFatPercentage: undefined,
  muscleMass: undefined,
  note: "",
};

export function CreateProgressModal({
  page,
  onClose,
  isOpen
}: CreateProgressModalProps) {
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");

  const { mutate: createProgress, isPending } = useCreateProgress(page);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProgressSchemaType>({
    resolver: zodResolver(createProgressSchema),
    defaultValues,
  });

  const muscleMassValue = watch("muscleMass.value");

  useEffect(() => {
    setValue("weight.unit", unit);

    if (muscleMassValue !== undefined) {
      setValue("muscleMass.unit", unit);
    }
  }, [unit, setValue, muscleMassValue]);

  const handleFormSubmit = (data: CreateProgressSchemaType) => {
    const payload: ICreateProgressType = {
      weight: {
        value: data.weight.value,
        unit: data.weight.unit,
      },
      bodyFatPercentage: data.bodyFatPercentage,
      muscleMass:
        data.muscleMass?.value !== undefined
          ? {
              value: data.muscleMass.value,
              unit: data.muscleMass.unit,
            }
          : undefined,
      note: data.note?.trim() || undefined,
    };

    createProgress(payload, {
      onSuccess: () => {
        toast.success("Progress created successfully")
        onClose()
        reset(defaultValues);
        setUnit("kg");
      },
      onError:(err)=>{
        toast.error(err.message|| " progress create faild")
      }
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
        onClose()
        if (!value) {
          reset(defaultValues);
          setUnit("kg");
        }
      }}
    >

      <DialogContent className="border border-zinc-800 bg-zinc-950 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Add Progress Record
          </DialogTitle>
          <p className="text-sm text-zinc-400">
            Save your latest body metrics and notes.
          </p>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="mt-3 space-y-5"
        >
          <div className="flex gap-2">
            {(["kg"] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  unit === u
                    ? "bg-orange-500 text-white"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {u.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-zinc-300">
              <Scale size={14} />
              Weight ({unit})
            </Label>
            <Input
              type="number"
              step="0.1"
              min="0"
              placeholder={`Enter weight in ${unit}`}
              className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
              {...register("weight.value", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
            />
            {errors.weight?.value && (
              <p className="text-sm text-red-400">
                {errors.weight.value.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-zinc-300">
                <Activity size={14} />
                Body Fat %
              </Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                placeholder="Optional"
                className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
                {...register("bodyFatPercentage", {
                  setValueAs: (value) =>
                    value === "" ? undefined : Number(value),
                })}
              />
              {errors.bodyFatPercentage && (
                <p className="text-sm text-red-400">
                  {errors.bodyFatPercentage.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-zinc-300">
                <Dumbbell size={14} />
                Muscle Mass ({unit})
              </Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                placeholder="Optional"
                className="border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
                {...register("muscleMass.value", {
                  setValueAs: (value) =>
                    value === "" ? undefined : Number(value),
                })}
              />
              {errors.muscleMass?.value && (
                <p className="text-sm text-red-400">
                  {errors.muscleMass.value.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-zinc-300">
              <FileText size={14} />
              Note
            </Label>
            <Textarea
              placeholder="Add any note about your progress..."
              rows={4}
              className="resize-none border-zinc-800 bg-zinc-900 text-white placeholder:text-zinc-500"
              {...register("note")}
            />
            {errors.note && (
              <p className="text-sm text-red-400">{errors.note.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="h-11 w-full rounded-xl bg-orange-500 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save Progress"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
