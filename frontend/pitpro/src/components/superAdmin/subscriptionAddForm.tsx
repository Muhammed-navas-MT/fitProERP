import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscriptionSchema, SubscriptionFormType, FinalSubmissionType } from "@/validation/subscriptionShema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FRONTEND_ROUTES } from "@/constants/frontendRoutes";
import { useAddSubscription } from "@/hook/superAdmin/getSubscriptionHook";
import {toast} from "sonner";

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
      planName: "",
      price: 0,
      duration: "ONE_MONTH",
      features:[{description:""}],
      isActive:false
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  const onSubmit = (data: SubscriptionFormType) => {
    const finalData: FinalSubmissionType = {
      ...data,
      features: data.features.map((f) => f.description.trim()),
    };
    mutate(finalData,{
        onSuccess:(res)=>{
            if(res?.data?.success){
                toast("sadfsadfsdf")
            }
            toast(res?.data?.message||"subscription created success fully...!");
            reset();
            navigate(`${FRONTEND_ROUTES.SUPER_ADMIN.BASE}/${FRONTEND_ROUTES.SUPER_ADMIN.LIST_SUBSCRIPTION}`)
        },
        onError:(err)=>{
            toast(err.message);
            console.log(err,"form form page");
            console.log(err);
        }
    });
  };

  const handleCancelButton = ()=>{
    reset()
    navigate(`${FRONTEND_ROUTES.SUPER_ADMIN.BASE}/${FRONTEND_ROUTES.SUPER_ADMIN.LIST_SUBSCRIPTION}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6">
      <div className="bg-[#111418] border border-gray-800 rounded-xl p-4 sm:p-6 w-full max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-6 text-white">Plan Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-400">Plan Name</label>
              <Input
                placeholder="Enter plan name"
                {...register("planName")}
                className="bg-gray-800/30 border-gray-700 text-white placeholder-gray-500 focus:border-blue-600 focus:ring-blue-600 w-full"
              />
              {errors.planName && (
                <p className="text-red-500 text-sm mt-1">{errors.planName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-400">Price</label>
              <Input
                placeholder="Enter price"
                {...register("price",{valueAsNumber:true})}
                type="number"
                className="bg-gray-800/30 border-gray-700 text-white placeholder-gray-500 focus:border-blue-600 focus:ring-blue-600 w-full"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-400">Duration</label>
            <div className="relative">
              <select
                {...register("duration")}
                className="w-full bg-gray-800/30 border border-gray-700 rounded-lg px-4 py-2 text-white appearance-none cursor-pointer hover:border-gray-600 focus:outline-none focus:border-blue-600 focus:ring-blue-600"
              >
                <option className="bg-gray-800">ONE_MONTH</option>
                <option className="bg-gray-800">TREE_MONTHS</option>
                <option className="bg-gray-800">ONE_YEAR</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" />
            </div>

            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <h3 className="text-sm font-bold text-white">Features</h3>
            <button
              type="button"
              onClick={() => append({ description: "" })}
              className="flex items-center justify-center gap-2 px-3 py-1.5 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:border-gray-600 hover:text-white transition-colors w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              Add Feature
            </button>
          </div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-gray-800/30 p-3 rounded-lg border border-gray-700 mb-2 flex items-center gap-3"
            >
              <Input
                placeholder="Feature description"
                {...register(`features.${index}.description`)}
                className="bg-gray-900/40 border-gray-700 text-white placeholder-gray-500 focus:border-blue-600 focus:ring-blue-600 flex-1"
              />

              <button
                type="button"
                onClick={() => remove(index)}
                className="text-xs text-red-500 hover:text-red-400 transition-colors"
              >
                Remove
              </button>
              {errors.features?.[index]?.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.features[index]?.description?.message}
                </p>
              )}
            </div>
          ))}
          {errors.features?.root?.message && (
            <p className="text-red-500 text-sm">{errors.features.root.message}</p>
          )}

          {errors.features && typeof errors.features?.message === "string" && (
            <p className="text-red-500 text-sm">{errors.features.message}</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-800">
          <Button
            type="button"
            variant="outline"
            className="border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white bg-transparent w-full sm:w-auto"
            onClick={() => handleCancelButton()}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
          >
           {isPending === true ? "Creating..." : " Create Plan"}
          </Button>
        </div>

      </div>
    </form>
  );
}
