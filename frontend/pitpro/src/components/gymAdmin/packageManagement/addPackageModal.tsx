import { BaseModal } from "@/components/shared/baseModal";
import { ICreatePackageType } from "@/types/gymAdmin/packageTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPackageSchema } from "@/validation/createPackageSchema";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ICreatePackageType) => void;
  branches: { id: string; branchName: string; address: string }[];
  isBranchLoading: boolean;
  isPending: boolean;
}

export function AddPackageModal({
  open,
  onClose,
  onSubmit,
  branches,
  isBranchLoading,
  isPending,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ICreatePackageType>({
    resolver: zodResolver(createPackageSchema),
    defaultValues: {
      branchId: "",
      name: "",
      price: 0,
      durationInDays: 0,
      features: [],
      isDailySession: false,
    },
  });
  const [featuresInput, setFeaturesInput] = React.useState(
    watch("features").join(", ")
  );

  React.useEffect(() => {
    setFeaturesInput(watch("features").join(", "));
  }, [watch("features")]);

  const handleFormSubmit = (data: ICreatePackageType) => {
    const featuresArray = featuresInput
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    onSubmit({ ...data, features: featuresArray });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  React.useEffect(() => {
  if (!isPending && open) {
    reset();
    setFeaturesInput("");
  }
}, [isPending, open, reset]);

  return (
    <BaseModal
      isOpen={open}
      title="Add Package"
      onClose={() => {}}
      closeOnBackdrop={false}
    >
      <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <p className="mb-1 text-sm text-zinc-400">Branch</p>
          <select
            {...register("branchId")}
            disabled={isBranchLoading}
            className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
          >
            <option value="">
              {isBranchLoading ? "Loading branches..." : "Select branch"}
            </option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.branchName} - {branch.address}
              </option>
            ))}
          </select>
          {errors.branchId && (
            <p className="text-xs text-red-500 mt-1">{errors.branchId.message}</p>
          )}
        </div>

        <div>
          <p className="mb-1 text-sm text-zinc-400">Package Name</p>
          <input
            type="text"
            {...register("name")}
            className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <p className="mb-1 text-sm text-zinc-400">Price</p>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
          />
          {errors.price && (
            <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <p className="mb-1 text-sm text-zinc-400">Duration (days)</p>
          <input
            type="number"
            {...register("durationInDays", { valueAsNumber: true })}
            className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
          />
          {errors.durationInDays && (
            <p className="text-xs text-red-500 mt-1">
              {errors.durationInDays.message}
            </p>
          )}
        </div>

        <div>
          <p className="mb-1 text-sm text-zinc-400">Features (comma separated)</p>
          <input
            type="text"
            value={featuresInput}
            onChange={(e) => setFeaturesInput(e.target.value)}
            onBlur={() =>
              setValue(
                "features",
                featuresInput
                  .split(",")
                  .map((f) => f.trim())
                  .filter(Boolean),
                { shouldValidate: true }
              )
            }
            className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
          />
          {errors.features && (
            <p className="text-xs text-red-500 mt-1">
              {Array.isArray(errors.features)
                ? errors.features.map((f) => f?.message).filter(Boolean).join(", ")
                : errors.features.message}
            </p>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" {...register("isDailySession")} />
          Daily Session
        </label>

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 rounded bg-zinc-700 py-2 text-white hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded bg-orange-500 py-2 font-medium text-black hover:bg-orange-600"
          >
            {isPending ? "Creating..." : "Create Package"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
