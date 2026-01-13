import { BaseModal } from "@/components/shared/baseModal";
import { IListPackageItemType } from "@/types/gymAdmin/packageTypes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePackageSchema } from "@/validation/updatePackageShema";
import { z } from "zod";

type UpdatePackageForm = z.infer<typeof updatePackageSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  packageData: IListPackageItemType | null;
  onSubmit: (data: IListPackageItemType) => void;
  branches: { id: string; branchName: string; address: string }[];
  isBranchLoading: boolean;
}

export function UpdatePackageModal({
  open,
  onClose,
  packageData,
  onSubmit,
  branches,
  isBranchLoading,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdatePackageForm>({
    resolver: zodResolver(updatePackageSchema),
  });

  const [featuresInput, setFeaturesInput] = useState<string>("");

  useEffect(() => {
    if (!packageData) return;

    reset({
      branchId: packageData.branchId,
      name: packageData.name,
      price: packageData.price,
      durationInDays: packageData.durationInDays,
      features: packageData.features,
      isDailySession: packageData.isDailySession,
    });

    setFeaturesInput(packageData.features.join(", "));
  }, [packageData, reset]);

  const handleFormSubmit = (data: UpdatePackageForm) => {
    if (!packageData) return;

    const featuresArray = featuresInput
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    onSubmit({
      ...packageData,
      ...data,
      features: featuresArray,
    });
  };

  const handleCancel = () => {
    reset();
    if (packageData) setFeaturesInput(packageData.features.join(", "));
    onClose();
  };

  return (
    <BaseModal
      isOpen={open}
      title="Update Package"
      onClose={() => {}}
      closeOnBackdrop={false}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <p className="mb-1 text-sm text-zinc-400">Branch</p>
          <select
            {...register("branchId")}
            disabled={isBranchLoading}
            className="w-full rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-white focus:border-orange-500 focus:outline-none disabled:opacity-60"
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
            <p className="text-xs text-red-500 mt-1">{errors.durationInDays.message}</p>
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
            placeholder="Eg: Cardio, Trainer Support"
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

        <div className="flex gap-2 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 rounded bg-zinc-700 py-2 text-white hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 rounded bg-orange-500 py-2 font-medium text-black hover:bg-orange-600"
          >
            Update Package
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
