import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  subscriptionSchema,
  SubscriptionFormType,
  FinalSubmissionType,
} from "@/validation/subscriptionShema";

import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { toast } from "sonner";
import {
  useGetSingleSubscription,
  useUpdateSubscription,
} from "@/hook/superAdmin/getSubscriptionHook";
import { useEffect } from "react";

export function EditSubscriptionForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleSubscription(id!);
  const { mutate, isPending } = useUpdateSubscription();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SubscriptionFormType>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      planName: "",
      price: 0,
      duration: "ONE_MONTH",
      features: [{ description: "" }],
      isActive: false,
    },
  });

  useEffect(() => {
    if (data?.data) {
      reset({
        planName: data.data.planName,
        price: data.data.price,
        duration: data.data.duration,
        features: data.data.features.map((f: string) => ({ description: f })),
        isActive: data.data.isActive,
      });
    }
  }, [data, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const onSubmit = (formData: SubscriptionFormType) => {
    const finalData: FinalSubmissionType = {
      ...formData,
      features: formData.features.map((f) => f.description.trim()),
    };

    mutate(
      { id: id!, updateData: finalData },
      {
        onSuccess: (res) => {
          toast(res?.message || "Subscription updated successfully");
          navigate(FRONTEND_ROUTES.SUPER_ADMIN.LIST_SUBSCRIPTION);
        },
        onError: (err) => {
            console.log(err,"from edit page....")
          toast.error(err.message);
        },
      }
    );
  };

  const handleCancelButton = () => {
    navigate(FRONTEND_ROUTES.SUPER_ADMIN.LIST_SUBSCRIPTION);
  };

  if (isLoading) return <p className="text-white">Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6">
      <div className="bg-[#111418] border border-gray-800 rounded-xl p-4 sm:p-6 w-full max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl font-bold mb-6 text-white">Edit Subscription</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">
              Plan Name
            </label>
            <Input
              {...register("planName")}
              className="bg-gray-800/30 border-gray-700 text-white"
            />
            {errors.planName && (
              <p className="text-red-500 text-sm">{errors.planName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">
              Price
            </label>
            <Input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="bg-gray-800/30 border-gray-700 text-white"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2 text-gray-400">
            Duration
          </label>
          <select
            {...register("duration")}
            className="w-full bg-gray-800/30 border border-gray-700 rounded-lg px-4 py-2 text-white"
          >
            <option>ONE_MONTH</option>
            <option>TREE_MONTHS</option>
            <option>ONE_YEAR</option>
          </select>
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration.message}</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-white">Features</h3>
            <button
              type="button"
              onClick={() => append({ description: "" })}
              className="px-3 py-1 border border-gray-700 rounded-lg text-gray-300"
            >
              + Add Feature
            </button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex gap-3 bg-gray-800/30 p-3 rounded-lg border border-gray-700 mb-2"
            >
              <Input
                {...register(`features.${index}.description`)}
                className="bg-gray-900/40 border-gray-700 text-white flex-1"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-800 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancelButton}
            className="border-gray-700 text-gray-300"
          >
            Cancel
          </Button>

          <Button type="submit" className="bg-blue-600 text-white">
            {isPending ? "Updating..." : "Update Plan"}
          </Button>
        </div>
      </div>
    </form>
  );
}
