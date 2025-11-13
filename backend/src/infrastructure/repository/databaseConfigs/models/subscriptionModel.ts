import { subscriptionSchema } from "../schemas/subscriptionSchema";
import { Durations } from "../../../../domain/enums/duration";
import { Document,model } from "mongoose";

export interface ISubscriptionModel extends Document {
    _id:string;
    planName:string,
    price:number;
    duration:Durations;
    features:string[];
    isActive:boolean;
    createdAt:Date;
};

export const subscriptionModel = model<ISubscriptionModel>("Subscription",subscriptionSchema);