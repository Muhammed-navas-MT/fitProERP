import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  subscriptionSchema,
  SubscriptionFormType,
  FinalSubmissionType,
} from "@/validation/subscriptionShema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { toast } from "sonner";

import {
  useGetSingleSubscription,
  useUpdateSubscription,
} from "@/hook/superAdmin/getSubscriptionHook";

import { SubscriptionPlanName } from "@/constants/SubscriptionPlanName";
import { GymOwnerFeature } from "@/constants/gymOwnerFeature";

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
      planName: SubscriptionPlanName.BASIC,
      price: 0,
      duration: "ONE_MONTH",
      features: [],
      limits: {
        maxMembers: 0,
        maxTrainers: 0,
        maxBranches: 0,
      },
      isActive: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    if (!data?.data) return;

    reset({
      planName: data.data.planName,
      price: data.data.price,
      duration: data.data.duration,
      isActive: data.data.isActive,
      limits: data.data.limits,
      features: data.data.features.map((f: GymOwnerFeature) => ({
        description: f,
      })),
    });
  }, [data, reset]);

  const handleAddFeature = () => {
    const trimmed = featureInput.trim();
    if (!trimmed) return;

    if (fields.some((f) => f.description === trimmed)) {
      toast("Feature already added");
      return;
    }

    append({ description: trimmed as GymOwnerFeature });
    setFeatureInput("");
  };

  const onSubmit = (data: SubscriptionFormType) => {
    const finalData: FinalSubmissionType = {
      ...data,
      features: data.features.map((f) => f.description),
    };

    mutate(
      { id: id!, updateData: finalData },
      {
        onSuccess: (res) => {
          toast(res?.message || "Subscription updated successfully");
          navigate(
            `${FRONTEND_ROUTES.SUPER_ADMIN.BASE}/${FRONTEND_ROUTES.SUPER_ADMIN.LIST_SUBSCRIPTION}`
          );
        },
        onError: (err) => {
          toast(err.message);
        },
      }
    );
  };

  if (isLoading) return <p className="text-white">Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6">
      <div className="bg-[#111418] border border-gray-800 rounded-xl p-6 max-w-4xl mx-auto space-y-6">
        <h2 className="text-xl font-bold text-white">Edit Subscription</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400">Plan Name</label>
            <div className="relative">
              <select
                {...register("planName")}
                className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2 text-white"
              >
                {Object.values(SubscriptionPlanName).map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {errors.planName && (
              <p className="text-red-500 text-sm">{errors.planName.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-400">Price</label>
            <Input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="bg-gray-800 border-gray-700 text-white"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400">Duration</label>
          <select
            {...register("duration")}
            className="w-full bg-gray-800 border-gray-700 rounded-lg px-4 py-2 text-white"
          >
            <option>ONE_MONTH</option>
            <option>THREE_MONTHS</option>
            <option>ONE_YEAR</option>
          </select>
          {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration.message}</p>
          )}
        </div>

        {/* FEATURES */}
        <div>
          <h3 className="text-white text-sm font-bold mb-2">Features</h3>

          <div className="flex gap-2 mb-2">
            <select
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              className="flex-1 bg-gray-800 border-gray-700 rounded-lg px-3 py-2 text-white"
            >
              <option value="">Select feature</option>
              {Object.values(GymOwnerFeature).map((feature) => (
                <option key={feature} value={feature}>
                  {feature.replace("_", " ")}
                </option>
              ))}
            </select>

            <Button type="button" onClick={handleAddFeature}>
              Add
            </Button>
          </div>

          {errors.features?.message && (
            <p className="text-red-500 text-sm">{errors.features.message}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-2">
            {fields.map((field, index) => (
              <span
                key={field.id}
                className="bg-gray-700 px-3 py-1 rounded-full text-white flex items-center gap-2"
              >
                {field.description.replace("_", " ")}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* LIMITS */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">Max Members</label>
            <Input
              {...register("limits.maxMembers", { valueAsNumber: true })}
            />
            {errors.limits?.maxMembers && (
              <p className="text-red-500 text-sm mt-1">
                {errors.limits.maxMembers.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">Max Trainers</label>
            <Input
              {...register("limits.maxTrainers", { valueAsNumber: true })}
            />
            {errors.limits?.maxTrainers && (
              <p className="text-red-500 text-sm mt-1">
                {errors.limits.maxTrainers.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">Max Branches</label>
            <Input
              {...register("limits.maxBranches", { valueAsNumber: true })}
            />
            {errors.limits?.maxBranches && (
              <p className="text-red-500 text-sm mt-1">
                {errors.limits.maxBranches.message}
              </p>
            )}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit">
            {isPending ? "Updating..." : "Update Plan"}
          </Button>
        </div>
      </div>
    </form>
  );
}
