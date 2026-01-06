import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { useAddSubscription } from "@/hook/superAdmin/getSubscriptionHook";
import { toast } from "sonner";
import { SubscriptionPlanName } from "@/constants/SubscriptionPlanName";
import { GymOwnerFeature } from "@/constants/gymOwnerFeature";

export function SubscriptionForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = useAddSubscription();

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

    mutate(finalData, {
      onSuccess: (res) => {
        toast(res?.data?.message || "Subscription created successfully!");
        reset();
        setFeatureInput("");
        navigate(
          `${FRONTEND_ROUTES.SUPER_ADMIN.BASE}/${FRONTEND_ROUTES.SUPER_ADMIN.LIST_SUBSCRIPTION}`
        );
      },
      onError: (err) => {
        toast(err.message);
        console.log(err);
      },
    });
  };

  const handleCancelButton = () => {
    reset();
    setFeatureInput("");
    navigate(
      `${FRONTEND_ROUTES.SUPER_ADMIN.BASE}/${FRONTEND_ROUTES.SUPER_ADMIN.LIST_SUBSCRIPTION}`
    );
  };

  return (
    <form
      onSubmit={handleSubmit(
        (data) => {
          onSubmit(data);
        },
        (errors) => {
          console.log("Form errors:", errors);
          toast.error("Please fix the errors before submitting!");
        }
      )}
      className="p-4 sm:p-6"
    >
      <div className="bg-[#111418] border border-gray-800 rounded-xl p-4 sm:p-6 w-full max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Plan Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-400">
                Plan Name
              </label>
              <div className="relative">
                <select
                  {...register("planName")}
                  className="w-full bg-gray-800/30 border border-gray-700 rounded-lg px-4 py-2 text-white appearance-none cursor-pointer hover:border-gray-600 focus:outline-none focus:border-blue-600 focus:ring-blue-600"
                >
                  {Object.values(SubscriptionPlanName).map((plan) => (
                    <option key={plan} value={plan} className="bg-gray-800">
                      {plan}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" />
              </div>
              {errors.planName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.planName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-400">
                Price
              </label>
              <Input
                placeholder="Enter price"
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="bg-gray-800/30 border-gray-700 text-white"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-400">
              Duration
            </label>
            <div className="relative">
              <select
                {...register("duration")}
                className="w-full bg-gray-800/30 border border-gray-700 rounded-lg px-4 py-2 text-white appearance-none cursor-pointer"
              >
                <option className="bg-gray-800">ONE_MONTH</option>
                <option className="bg-gray-800">TREE_MONTHS</option>
                <option className="bg-gray-800">ONE_YEAR</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-white mb-2">Features</h3>

          <div className="flex gap-2 mb-2">
            <select
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              className="bg-gray-900/40 border border-gray-700 text-white rounded-lg px-3 py-2 flex-1"
            >
              <option value="">Select a feature</option>
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

          <div className="flex flex-wrap gap-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{field.description.replace("_", " ")}</span>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">
              Max Members
            </label>
            <Input
              type="number"
              {...register("limits.maxMembers", { valueAsNumber: true })}
              className="bg-gray-800/30 border-gray-700 text-white"
            />
            {errors.limits?.maxMembers && (
              <p className="text-red-500 text-sm mt-1">
                {errors.limits.maxMembers.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">
              Max Trainers
            </label>
            <Input
              type="number"
              {...register("limits.maxTrainers", { valueAsNumber: true })}
              className="bg-gray-800/30 border-gray-700 text-white"
            />
            {errors.limits?.maxTrainers && (
              <p className="text-red-500 text-sm mt-1">
                {errors.limits.maxTrainers.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">
              Max Branches
            </label>
            <Input
              type="number"
              {...register("limits.maxBranches", { valueAsNumber: true })}
              className="bg-gray-800/30 border-gray-700 text-white"
            />
            {errors.limits?.maxBranches && (
              <p className="text-red-500 text-sm mt-1">
                {errors.limits.maxBranches.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
          <Button type="button" variant="outline" onClick={handleCancelButton}>
            Cancel
          </Button>
          <Button type="submit">
            {isPending ? "Creating..." : "Create Plan"}
          </Button>
        </div>
      </div>
    </form>
  );
}
