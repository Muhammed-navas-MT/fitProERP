import {z} from "zod";
import { Durations } from "../../../domain/enums/duration";
import { SubscriptionError } from "../constants/errorMessage/subscriptionError";
import { features } from "process";


export const subscriptionSchema = z.object({
    planName:z
    .string({error: SubscriptionError.PLAN_NAME_INVALID_TYPE
    })
    .max(50,SubscriptionError.PLAN_NAME_TOO_LONG)
    .min(3,SubscriptionError.PLAN_NAME_TOO_SHORT)
    .regex(/^[a-zA-Z0-9\s\-]+$/,SubscriptionError.PLAN_NAME_INVALID_CHARACTERS)
    .transform((val)=>val.trim()),

    price:z.number({error:SubscriptionError.PRICE_INVALID_TYPE})
    .nonnegative(SubscriptionError.PRICE_NEGATIVE)
    .max(9999,SubscriptionError.PRICE_TOO_SHORT),

    duration:z
    .enum([Durations.ONE_MONTH,Durations.ONE_YEAR,Durations.TREE_MONTHS],{
        error:SubscriptionError.DURATION_INVALID
    }),

    features:z
    .array(z.string({error:SubscriptionError.FEATURE_INVALID_TYPE}))
    .nonempty({error:SubscriptionError.FEATURE_EMPTY})
    .refine(
        (features)=>new Set(features.map((f)=>f.trim().toLowerCase())).size === features.length,
        {error:SubscriptionError.FEATURE_DUPLICATE}
    ),

    isActive:z
    .boolean({error:SubscriptionError.IS_ACTIVE_INVALID_TYPE}),
})