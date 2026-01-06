import { Durations } from "../../../../domain/enums/duration";
import mongoose from "mongoose";

export const subscriptionSchema = new mongoose.Schema({
    planName:{type:String,required:true},
    price:{type:Number,required:true},
    duration:{type:String,enum:Object.values(Durations)},
    features:[{type:String}],
    limits: {
      maxBranches: { type: Number, required: true },
      maxTrainers: { type: Number, required: true },
      maxMembers: { type: Number, required: true },
    },
    isActive:{type:Boolean}
},
 { timestamps: true }
)